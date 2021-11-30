// const { withContentlayer } = require("next-contentlayer");

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  swcMinify: false,
  images: {
    domains: [
      "i.scdn.co", // Spotify Album Art
      "pbs.twimg.com", // Twitter Profile Picture
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "toddchristensen.net",
      "openweathermap.org",
    ],
  },
};
