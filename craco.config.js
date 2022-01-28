module.exports = {
  style: {
    postOptions: {
      plugins: [
        require("@tailwindcss/postcss7-compat"),
        require("autoprefixer"),
      ],
    },
  },
};
