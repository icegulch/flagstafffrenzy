const oldposts = require('./../../_archived/posts.json');

// Map "oldposts" to "posts" with year, month, and day fields
const posts = oldposts.map((post) => {
  return {
    ...post,
    year: post.publish_date.slice(0,4),
    month: post.publish_date.slice(5,7),
    day: post.publish_date.slice(8,10),
  };
});

module.exports = posts;
