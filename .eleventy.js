module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "_sass/styles.css": "static/styles.css",
  });
  eleventyConfig.setTemplateFormats(["md", "njk", "html"]);

  eleventyConfig.addFilter("displayDate", (date) => {
    return require("moment")(date.toUTCString()).format("dddd, MMM Do YYYY");
  });

  eleventyConfig.addCollection("postTypes", (collectionApi) => {
    return collectionApi
      .getAll()
      .map((item) => {
        const { postType, postTypeTitle } = item.data;
        return {
          slug: postType,
          title: postTypeTitle,
        };
      })
      .sort((a, b) => a.slug.charCodeAt(0) - b.slug.charCodeAt(0));
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
