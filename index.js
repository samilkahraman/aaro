const axios = require("axios");
const qs = require("qs");

const productService = require("./product/productService");

const token = (baseUrl, username, password) =>
  axios.post(
    `${baseUrl}/Token`,
    qs.stringify({
      grant_type: "password",
      username: username,
      password: password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

module.exports = token;
module.exports = productService;
