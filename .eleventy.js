const yaml = require("js-yaml");
const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');
module.exports = (config) => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');
  config.addDataExtension("yaml", contents => yaml.load(contents));

  // Returns work items, sorted by display order
  config.addCollection('work', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md'))
  });

  // Returns work items, sorted by display order then filtered by featured
  config.addCollection('featuredWork', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md')).filter(x => x.data.featured)
  });

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
