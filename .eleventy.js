const path = require("path");

const markdownit = require("markdown-it");
const hljs = require("highlight.js");
const toEmoji = require("emoji-name-map");
const emojiUnicode = require("emoji-unicode");

const customFilters = require("./src/filters.js");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));
  eleventyConfig.addPlugin(require("eleventy-plugin-sass"), {
    watch: ["_sass/**/*.scss"],
    outputDir: "_css",
  });
  eleventyConfig.addPlugin(require("eleventy-plugin-emoji"));

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
    "_css/*.css": "static",
    "assets/slides": "static/slides",
  });
  eleventyConfig.addWatchTarget("assets/js/*");
  eleventyConfig.addWatchTarget("_css/*");

  // Custom filters
  eleventyConfig.addFilter("displayDate", customFilters.displayDate);
  eleventyConfig.addFilter("markdownit", customFilters.toMarkdown);
  eleventyConfig.addFilter("includes", customFilters.includes);
  eleventyConfig.addFilter("getParentURL", customFilters.getParentURL);
  eleventyConfig.addFilter("limit", customFilters.limit);

  // A category is a direct subdir of project root used to separate
  // types of content I like to make (ex.: terminal themes, posts,
  // workflow explainers...)
  eleventyConfig.addCollection("categories", (collectionApi) => {
    const categories = {};
    collectionApi.getAll().forEach((item, i) => {
      const slug = item.inputPath.split(path.sep)[1];
      const title = item.data.postTypeTitle;
      const emoji = item.data.emoji;

      // Categories should be unique
      if (categories[slug]) {
        return;
      }

      categories[slug] = { slug, title, emoji };
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
          const { postType, postTypeTitle, emoji } = item.data;

          return {
            slug: postType,
            title: `${emoji} ${postTypeTitle}`,
            emoji: emoji,
          };
        })
        .reduce((obj, postType) => {
          console.log(postType.emoji);
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
