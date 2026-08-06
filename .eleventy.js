module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("date", (value, format) => {
    const d = value === "now" ? new Date() : new Date(value);
    if (format === "yyyy") return String(d.getFullYear());
    if (format === "yyyy年M月d日") {
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    }
    return d.toISOString();
  });

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  eleventyConfig.addCollection("blogPosts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/blog/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
