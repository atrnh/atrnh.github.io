const moment = require("moment");
const markdownit = require("markdown-it");

const DATE_FORMAT = "dddd, MMM Do YYYY";

exports.displayDate = (date) => moment(date.toUTCString()).format(DATE_FORMAT);

exports.toMarkdown = (val) =>
  typeof val === "string" ? new markdownit().render(val) : val;

exports.includes = (arr, obj) => arr.includes(obj);
