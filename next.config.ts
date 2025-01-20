module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/setup",
        permanent: true,
      },
    ];
  },
};
