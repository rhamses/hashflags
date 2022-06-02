const functions = require("firebase-functions");
const bent = require("bent");
const getJSON = bent("json");
const {getTime} = require("date-fns");
const {CloudTasksClient} = require("@google-cloud/tasks");
const fs = require("fs");
const os = require("os");
// const path = require("path");
// const root = path.dirname(path.abspath());
// file_path = "/tmp/" + file_name;
// file_path = path.join(root, file_path);
const lastRunFile = os.tmpdir() + "/lastrun.txt";
/**
* Function that get the current hashflags file.
* @return {object}
*/
async function getCurrentFlags() {
  const result = {};
  const year = new Date().getFullYear();
  const month = String(new Date().getUTCMonth() + 1).padStart(2, "0");
  const day = String(new Date().getUTCDate()).padStart(2, "0");
  const hour = String(new Date().getUTCHours()).padStart(2, "0");
  // const day = "25";
  // const hour = "07";
  const toFilter = {
    // begin: 1653840000000,
    begin: getTime(
        new Date(
            new Date().getFullYear(),
            new Date().getUTCMonth(),
            Number(day),
            Number(hour), 0, 0)),
    end: getTime(
        new Date(
            new Date().getFullYear(),
            new Date().getUTCMonth(),
            Number(day),
            Number(hour), 59, 59)),
  };
  // console.log(toFilter);
  // console.log(`https://pbs.twimg.com/hashflag/config-${year}-${month}-${day}-${hour}.json`);

  // Get the hashflags based on current time.
  const hashflags = await getJSON(`https://pbs.twimg.com/hashflag/config-${year}-${month}-${day}-${hour}.json`);
  // const hashflags = await getJSON("https://pbs.twimg.com/hashflag/config-2022-05-29-23.json");
  let newHashflags = [];
  newHashflags = hashflags.filter((item) => {
    if (item.startingTimestampMs >= toFilter.begin) {
      return item;
    }
  });
  // Loop through the new array to fill the limit of
  // at least 4 tweets with random arrays from the file
  while (newHashflags.length < 4) {
    const index = Math.floor((Math.random() * (hashflags.length - 0 + 1)) + 0);
    const hasItem = newHashflags.find((item) => item.hashtag == hashflags[index].hashtag);
    if (!hasItem) {
      newHashflags.push(hashflags[index]);
    }
  }
  for (const flag of newHashflags) {
    if (result[flag.campaignName]) {
      result[flag.campaignName].push(flag);
    } else {
      result[flag.campaignName] = [flag];
    }
  }
  return result;
}
/**
* Queue function that sends to GCP Task Scheduler each different item
* @param {int} index array index of the current hashflag.
* @param {object} hashflag hashflag object containing a single item
* @return {object}
*/
async function queueItem(index, hashflag) {
  const projectId = "hashflags-1866b";
  const location = "us-central1";
  const queue = "tweet";
  const functionName = "tweet";
  const tasksClient = new CloudTasksClient();
  const queuePath = tasksClient.queuePath(projectId, location, queue);
  const url = `https://${location}-${projectId}.cloudfunctions.net/${functionName}`;
  const lastRun = Number(fs.readFileSync(lastRunFile)) ? Number(fs.readFileSync(lastRunFile)) : Date.now() / 1000;
  const delaySeconds = 900 * (index + 1);
  const data = Buffer
      .from(JSON.stringify(hashflag))
      .toString("base64");
  const task = {
    httpRequest: {
      httpMethod: "POST",
      url,
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    },
    scheduleTime: {
      seconds: Math.floor(delaySeconds + lastRun),
    },
  };
  // console.log(task);
  return await tasksClient.createTask({
    parent: queuePath,
    task,
  });
}

module.exports = functions
    .https.onRequest(async (request, response) => {
      try {
        console.log();
        if (!fs.existsSync(lastRunFile)) {
          fs.writeFileSync(lastRunFile, "");
        }
        const hashflags = await getCurrentFlags();
        const result = [];
        if (Object.keys(hashflags).length > 0) {
          let countHashflag = 0;
          for (const campaignName of Object.keys(hashflags)) {
            for (const hashflag of hashflags[campaignName].entries()) {
              if (hashflag[1]) {
                const ticket = await queueItem(countHashflag, hashflag[1]);
                result.push(ticket);
                countHashflag++;
              }
            }
          }
        } else {
          functions.logger.info("hashflags é vazio");
        }
        /* Get last confirmation from GCP Cloud Task
        And save into a file to use as base line
        for the next run */
        const lastRun = result.map((item) => item[0].scheduleTime).pop();
        functions.logger.info(lastRun);
        fs.writeFile(lastRunFile, lastRun.seconds, (error) => {
          if (error) functions.logger.error(error);
        });
        // Send the current hashflags list forward
        response.send(hashflags);
      } catch (error) {
        functions.logger.error(error);
        response.send("deu pau");
      }
    });
