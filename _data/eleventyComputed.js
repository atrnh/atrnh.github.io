const path = require("path");

const extractSlugFromPath = (inputPath) => inputPath.split(path.sep)[1];

module.exports = {
  category: ({ page }) => extractSlugFromPath(page.inputPath),
  contentType: ({ page }) =>
    page.data?.contentType ??
    Array.from(extractSlugFromPath(page.inputPath).replace("-", " "))
      .slice(0, -1)
      .join(""),
  tags: ({ page }) =>
    (page.data?.tags ?? []).concat([extractSlugFromPath(page.inputPath)]),
};
