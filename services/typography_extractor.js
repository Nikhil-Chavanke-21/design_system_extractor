const cheerio = require('cheerio');
const axios = require('axios');

const getTypography = async (req, res) => {
    const url = req.query.url;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    let typography = {};
    tags.forEach((tag) => {
        let element = $(tag + ':first');
        let attr = $(element).attr();
        if (attr) typography[tag] = $(element).attr().class;
        else typography[tag] = null;
    });
    res.send(typography);
};

module.exports = { getTypography };