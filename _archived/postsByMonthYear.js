const posts = require('./posts.js');

// Use reduce to group posts by year and month
const postsByYearMonth = posts.reduce((result, post) => {
  // Create a unique key for each year-month combination
  const key = `${post.year}-${post.month}`;

  // Check if the key exists in the result object, and if not, initialize it
  if (!result[key]) {
    result[key] = { year: post.year, month: post.month, posts: [] };
  }

  // Add the post to the corresponding year-month's "posts" array
  result[key].posts.push(post);

  return result;
}, {});

// Convert the postsByYearMonth object to an array
const postsByYearMonthArray = Object.values(postsByYearMonth);

module.exports = postsByYearMonthArray;