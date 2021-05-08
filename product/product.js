const axios = require("axios");

/**
 * @description It retrieves all the products with given limitation
 * @param {String} flexSearchQuery flex search query. It retrieves all the products that contains the given query
 * @param {number} page page number
 * @param {number} pageSize products per page limitation
 * @returns {promise}
 */
const getProductsFlex = async (
  token,
  baseUrl,
  flexSearchQuery,
  page,
  pageSize
) => {
  return axios.get(
    `${baseUrl}/Stok?Sayfa=${page}&SayfaSatirSayisi=${pageSize}&EsnekAramaKisiti=${flexSearchQuery}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

/**
 * @description It retrieves single product by stokID
 * @param {number} stokID product's id
 * @returns {promise}
 */
const getProductByStokID = async (token, baseUrl, stokID) => {
  return axios.get(`${baseUrl}/Stok?StokID=${stokID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

exports.getProductsFlex = getProductsFlex;
exports.getProductByStokID = getProductByStokID;
