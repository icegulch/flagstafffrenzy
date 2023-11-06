const getBuildInfo = () => {
  const now = new Date();
  const timeZone = 'UTC';
  const buildTime = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone,
  }).format(now);
  return {
    time: {
      raw: now.toISOString(),
      formatted: `${buildTime} ${timeZone}`,
    }
  };
};

module.exports = {
  // NOTE: `process.env.URL` is provided by Netlify, and may need
  // adjusted pending your host
  url: process.env.URL || "http://localhost:8080",
  name: "Flagstaff Frenzy",
  description: "You Must Be Really Bored!",
  author: "The Frenz", // optional,
  last_updated: getBuildInfo().time.formatted,
  sections: [
    {
      title: "Archives",
      slug: "archives"
    },
    {
      title: "Dear Dave",
      slug: "dear-dave"
    },
    {
      title: "Short Stories",
      slug: "short-stories"
    },
  ]
};