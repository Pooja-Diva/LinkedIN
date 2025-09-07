const { default: axios } = require("axios");

export const BASE_URL = "https://linkedinclone-zuc5.onrender.com"

export const clientServer = axios.create({
    baseURL: BASE_URL,
})