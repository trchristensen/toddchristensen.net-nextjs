const { withContentlayer } = require("next-contentlayer");
const withTM = require('@vercel/edge-functions-ui/transpile')()

/**
 * @type {import('next').NextConfig}
 */
module.exports = withContentlayer()({
  swcMinify: false,
  images: {
    domains: [
      "i.scdn.co", // Spotify Album Art
      "pbs.twimg.com", // Twitter Profile Picture
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "toddchristensen.net",
      "openweathermap.org",
      "i.scdn.co",
      "covers.openlibrary.org",
      "avatars.githubusercontent.com",
    ],
  },
});