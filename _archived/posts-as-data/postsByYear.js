const posts = require('./posts.js');

// Use reduce to group posts by year
const postsByYear = posts.reduce((result, post) => {
  // Check if the year exists in the result object, and if not, initialize it
  if (!result[post.year]) {
    result[post.year] = { year: post.year, posts: [] };
  }

  // Add the post to the corresponding year's "posts" array
  result[post.year].posts.push(post);

  return result;
}, {});

// Convert the postsByYear object to an array
const postsByYearArray = Object.values(postsByYear);

module.exports = postsByYearArray;