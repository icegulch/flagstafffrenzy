module.exports = {
  layout: "collection-permalink",
  eleventyComputed: {
    permalink: (data) => {
      // remove '/content/' from permalink URIs
      // fileSlug and filePathStem both strip out dates from URIs (e.g., '2010-10-23-')
      // so resorting to inputPath manipulation, including lopping off '.md'
      const cleanURI = data.page.inputPath.split('./src/content').pop().split('.').shift().split('.')[0];
      return cleanURI + '/index.html';
    },
    section_slug: (data) => {
      // remove '/content/' from permalink URIs
      // fileSlug and filePathStem both strip out dates from URIs (e.g., '2010-10-23-')
      // so resorting to inputPath manipulation, including lopping off '.md'
      const sectionSlug = data.page.inputPath.split('./src/content').pop().split('/').filter(Boolean)[0];
      return sectionSlug;
    },
  },
};