const path = require("path");

const markdownit = require("markdown-it");
const hljs = require("highlight.js");

const customFilters = require("./src/filters.js");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));
  eleventyConfig.addPlugin(require("eleventy-plugin-sass"), {
    watch: ["_sass/**/*.scss"],
    outputDir: "_site/static",
  });

  // Enable YAML
  eleventyConfig.addDataExtension("yaml", (contents) =>
    require("js-yaml").load(contents)
  );

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_alias: "summary",
  });

  // Build/watch server settings
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fortawesome/fontawesome-free/webfonts": "webfonts",
    "node_modules/@fortawesome/fontawesome-free/css/all.css":
      "static/fontawesome.css",
    "assets/js/*": "static/js",
    "assets/favicon.*": "static",
  });
  eleventyConfig.addWatchTarget("assets/js/*");

  // Custom filters
  eleventyConfig.addFilter("displayDate", customFilters.displayDate);
  eleventyConfig.addFilter("markdownit", customFilters.toMarkdown);
  eleventyConfig.addFilter("includes", customFilters.includes);
  eleventyConfig.addFilter("getParentURL", customFilters.getParentURL);

  // A category is a direct subdir of project root used to separate
  // types of content I like to make (ex.: terminal themes, posts,
  // workflow explainers...)
  eleventyConfig.addCollection("categories", (collectionApi) => {
    const categories = {};
    collectionApi.getAll().forEach((item, i) => {
      const slug = item.inputPath.split(path.sep)[1];
      const title = item.data.postTypeTitle;

      // Categories should be unique
      if (categories[slug]) {
        return;
      }

      categories[slug] = { slug, title };
    });

    // Only used object to make sure categories are unique --- we only
    // *really* want the object's values
    return Object.values(categories).sort(
      (a, b) => a.slug[0].charCodeAt(0) - b.slug[0].charCodeAt(0)
    );
  });

  eleventyConfig.addCollection("postTypes", (collectionApi) => {
    collectionApi.getAll();
    return Object.entries(
      collectionApi
        .getAll()
        .map((item) => {
          const { postType, postTypeTitle } = item.data;
          console.log(item.inputPath);
          return {
            slug: postType,
            title: postTypeTitle,
          };
        })
        .reduce((obj, postType) => {
          if (!obj[postType.slug]) {
            obj[postType.slug] = postType;
          }
          return obj;
        }, {})
    )
      .sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0))
      .map(([key, postType]) => postType);
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
