const util = require('util')

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "src/_includes/oldposts/": "posts/" });

  eleventyConfig.addFilter('dump', obj => {
    return util.inspect(obj)
  });

  eleventyConfig.addFilter('monthName', function (monthNumber) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[parseInt(monthNumber, 10) - 1] || '';
  });

  eleventyConfig.addFilter('group_by', groupBy)

  eleventyConfig.setServerOptions({
    showAllHosts: true,
  });

  // configure markdown-it (and set it as your markdown processor for consistency)
  const md = require('markdown-it')({
    html: true,
    breaks: true,
    linkify: true,
  });
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addFilter('markdownify', str => md.render(str));

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};

function groupBy(array, key) {
  const get = entry => key.split('.').reduce((acc, key) => acc[key], entry)

  const map = array.reduce((acc, entry) => {
    const value = get(entry)

    if (typeof acc[value] === 'undefined') {
      acc[value] = []
    }

    acc[value].push(entry)
    return acc
  }, {})

  return Object.keys(map).reduce(
    (acc, key) => [...acc, { name: key, items: map[key] }],
    []
  )
}
