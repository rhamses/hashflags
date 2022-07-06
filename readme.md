# Hashflags
![Hashflags Project Banner](https://pbs.twimg.com/profile_banners/1201013896053690368/1653994887/1500x500)
A project that seeks to archive and frame forever the beautiful artwork that Twitter's team consistenly put out in form of advertised #hashtags. Because they are time sensitive all hashflags have a expire date but, since 2019, I've been collecting and storing this information and looking for different ways to put to the entire world to see all the cool little badges created for a certain ad campaign that crossed Twitter's ecosystem. Here's a few outlets that I managed to created until now.  

## 🤖 Twitter Bot
Originally thought as a Twitter bot, it was just recent that it come to life. you can see it in **[@hashflagsbot](https://twitter.com/hashflagsbot)** where every 30 minutes it tweets a new hashflag image.

## 💻 Website
The whole catalog is here to be searched. The idea is to transform it in a central place to look for ad campaigns and their contents throught all the social networks.
**[You can visit the live version here](https://hashflags.netlify.app/)**

## 🦺 APIs
Soon it will be a real documentation around. For now if you go to the XHR tab on the console panel of your brower you can see a few endpoints that I hope it might be useful for you too. 

## 🥞 Stack
Over the years I've been tweaking and using this side project as a vesel of new knowledge and experimentation. Right now I'm using:
- AWS S3 to store all the hashflaghs images. 
- AWS Lambda to hold my Node.js api that crawls Twitter's hashflags file and servers the website information.
- AWI API Gateway
- GCP Functions to hold the Twitter Bot apis
- GCP Cron Scheduler to create a process that tweets a random hashflag
- GCP Task Queue to schedule the tweet every 30 min
- Vue.js with Vite for the website. 
- Node.js for the apis
