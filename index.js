const axios = require("axios");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const schedule = require("node-schedule");

const config = yaml.safeLoad(
  fs.readFileSync(`./config/${process.env.platform}.yml`, "utf8")
);
console.log(config);

let sucFlag = false;
let reqCount = 0;
const date = new Date(2020, 11, 9, 16, 21, 0);
const buy = () => {
  reqCount++;
  console.log(reqCount);
  return;
  axios({
    method: "post",
    url: config.url,
    data: config.data,
  })
    .then((response) => {
      sucFlag = true;
    })
    .catch((e) => {});
};

schedule.scheduleJob(date, function () {
  while (reqCount < 3 && !sucFlag) {
    buy();
  }
});
