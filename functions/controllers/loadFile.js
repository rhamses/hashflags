const functions = require("firebase-functions");
const bent = require("bent");
const getJSON = bent("json");
const {getTime} = require("date-fns");
const {CloudTasksClient} = require("@google-cloud/tasks");
/**
* Function that get the current hashflags file.
* @return {object}
*/
async function getCurrentFlags() {
  const year = new Date().getFullYear();
  const month = String(new Date().getUTCMonth() + 1).padStart(2, "0");
  const day = String(new Date().getUTCDate()).padStart(2, "0");
  const hour = String(new Date().getUTCHours() + 1).padStart(2, "0");
  const toFilter = {
    begin: getTime(new Date(new Date().getFullYear(),
        new Date().getUTCMonth(),
        Number(day), 0, 0, 0)),
    end: getTime(new Date(
        new Date().getFullYear(),
        new Date().getUTCMonth(),
        Number(day), 23, 59, 59)),
  };
  // console.log(`https://pbs.twimg.com/hashflag/config-${year}-${month}-${day}-${hour}.json`);
  let hashflags = await getJSON(`https://pbs.twimg.com/hashflag/config-${year}-${month}-${day}-${hour}.json`);
  hashflags = hashflags.filter((item) => {
    if (item.startingTimestampMs >= toFilter.begin &&
      item.startingTimestampMs <= toFilter.end) {
      return item;
    }
  });
  const result = {};
  for (const flag of hashflags) {
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
  const delaySeconds = 30 * index;
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
      seconds: Math.floor(delaySeconds + Date.now() / 1000),
    },
  };
  return await tasksClient.createTask({
    parent: queuePath,
    task,
  });
}

module.exports = functions
    .https.onRequest(async (request, response) => {
      try {
        const hashflags = await getCurrentFlags();
        let countHashflag = 0;
        if (Object.keys(hashflags).length > 0) {
          for (const campaignName of Object.keys(hashflags)) {
            for (const hashflag of hashflags[campaignName].entries()) {
              if (hashflag[1]) {
                await queueItem(countHashflag, hashflag[1]);
                countHashflag++;
              }
            }
          }
        }
        response.send(hashflags);
      } catch (error) {
        console.log("error", error);
        response.send("deu pau");
      }
    });
