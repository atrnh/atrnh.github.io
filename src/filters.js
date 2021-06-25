const moment = require("moment");
const markdownit = require("markdown-it");
const path = require("path");

const DATE_FORMAT = "dddd, MMM Do YYYY";

exports.displayDate = (date) => moment(date.toUTCString()).format(DATE_FORMAT);

exports.toMarkdown = (val) =>
  typeof val === "string" ? new markdownit().render(val) : val;

exports.includes = (arr, obj) => arr.includes(obj);

exports.getParentURL = (
  page // Second-to-last element is parent URL
) =>
  `/${
    page.url
      .split(path.sep)
      .filter((s) => s)
      .slice(-2, -1)[0]
  }/`;

/*
{"date":"2021-06-03T00:00:00.000Z","inputPath":"./posts/hello-again.md","fileSlug":"hello-again","filePathStem":"/posts/hello-again","url":"/posts/hello-again/","outputPath":"_site/posts/hello-again/index.html"}*/
