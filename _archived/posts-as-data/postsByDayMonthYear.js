const posts = require('./posts.js');

// Use reduce to group posts by year and month
const postsByDayMonthYear = posts.reduce((result, post) => {
  // Create a unique key for each year-month combination
  const key = `${post.year}-${post.month}-${post.day}`;

  // Check if the key exists in the result object, and if not, initialize it
  if (!result[key]) {
    result[key] = { year: post.year, month: post.month, day: post.day, posts: [] };
  }

  // Add the post to the corresponding year-month's "posts" array
  result[key].posts.push(post);

  return result;
}, {});

// Convert the postsByDayMonthYear object to an array
const postsByDayMonthYearArray = Object.values(postsByDayMonthYear);

module.exports = postsByDayMonthYearArray;