const util = require('util')
const TurndownService = require('turndown');

module.exports = function (eleventyConfig) {

  // Create a new instance of the TurndownService
  const turndown = new TurndownService();
  eleventyConfig.addFilter('turndown', (content) => {
    return turndown.turndown(content);
  });

  eleventyConfig.addFilter('dump', obj => {
    return util.inspect(obj)
  });

  const cloudinaryPrefix = 'https://res.cloudinary.com/flagstafffrenzy/image/fetch/f_auto/c_limit,w_1000,h_800,g_center/';

  // Define the custom filter within your 11ty config
  eleventyConfig.addFilter('prependCloudinaryURL', function(content) {
    // Use a regular expression to search and modify image src attributes
    const modifiedContent = content.replace(/<img src="([^"]+)"/g, (match, src) => {
      return `<img src="${cloudinaryPrefix}${src}" loading="lazy"`;
    });

    return modifiedContent;
  });

  eleventyConfig.addFilter('monthName', function (monthNumber) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[parseInt(monthNumber, 10) - 1] || '';
  });
  eleventyConfig.addFilter('group_by', groupBy)

  eleventyConfig.addFilter("findIndex", function (arr, value, attr) {
    return arr.findIndex((item) => item[attr] === value);
  });

  eleventyConfig.addFilter('utc', function (date) {
    const utcDate = new Date(date);
    utcDate.setMinutes(utcDate.getMinutes() + utcDate.getTimezoneOffset());
    return utcDate.toUTCString();
  });

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
