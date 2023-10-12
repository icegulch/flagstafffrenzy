const posts = require('./posts.json');

const postsWithYearMonth = posts.map((post) => {
  let year = post.publish_date.slice(0,4);
  let month = post.publish_date.slice(5,7);
  return {
    ...post,
    year: year,
    month: month
  }
});

module.exports = postsWithYearMonth;
