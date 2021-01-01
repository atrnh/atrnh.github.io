const markdownit = require("markdown-it");
const hljs = require("highlight.js");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  const dataFiles = fs.readdirSync("./_data", {withFileTypes: true})
    .map((direntry) => direntry.isFile() && path.basename(direntry.name, ".js"))
    .map(fname => {
        const obj = require(`./_data/${fname}`);
        return obj;
    })
    .filter(obj => obj.postTypeTitle && obj)
    .map(obj => ({ ...obj, slug: slugify(obj.postTypeTitle.toLowerCase()) }));

  eleventyConfig.addCollection('allWithData', (collectionApi) => {
    return collectionApi.getAll().concat(
      dataFiles.reduce((arr, curr) => arr.concat(
        curr.posts.map(post => {
          const { posts, ...rest } = curr;
          return { ...rest, ...post, data: {...rest, ...post} };
        })
      ), [])
    );
  });

  eleventyConfig.addPassthroughCopy({
    "_sass/*.css": "static/",
    "node_modules/@fortawesome/fontawesome-free/webfonts": "webfonts",
    "node_modules/@fortawesome/fontawesome-free/css/all.css":
      "static/fontawesome.css",
    "assets": "static/assets"
  });
  eleventyConfig.addWatchTarget("_sass/styles.css");
  eleventyConfig.setTemplateFormats(["md", "njk", "html"]);
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  eleventyConfig.addFilter("displayDate", (date) => {
    return require("moment")(date.toUTCString()).format("dddd, MMM Do YYYY");
  });
  eleventyConfig.addFilter("markdownit", (val) => {
    return new markdownit().render(val);
  });

  eleventyConfig.addCollection("postTypes", (collectionApi) => {
    return Object.entries(
      collectionApi
        .getAll()
        .map((item) => {
          const { postType, postTypeTitle } = item.data;
          return {
            slug: postType,
            title: postTypeTitle,
          };
        })
        .concat(
          dataFiles.map(({ slug, postTypeTitle }) => ({slug: slug, title: postTypeTitle}))
        )
        .reduce((obj, postType) => {
          if (!obj[postType.slug]) {
            obj[postType.slug] = postType;
          }
          return obj;
        }, {})
    ).sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0))
      .map(([key, postType]) => postType)
  });

  return {
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: ".",
    },
  };
};
