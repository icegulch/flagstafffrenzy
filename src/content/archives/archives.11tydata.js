module.exports = {
  eleventyComputed: {
    year: data => data.publish_date.slice(0,4),
    month: data => data.publish_date.slice(5,7),
    day: data => data.publish_date.slice(8,10),
  },
};