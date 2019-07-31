module.exports = {
  anilist: `query ($search: String, $type: MediaType) {
    Media (search: $search, type: $type) {
      id
    }
  }`
};
