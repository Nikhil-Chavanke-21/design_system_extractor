const cheerio = require('cheerio');
const axios = require('axios');

const getIcons = async (req, res) => {
    let iconUrls = [];
    const url = req.query.url;

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    $('svg').each((_, element) => {
        let flag = true;
        iconUrls.forEach((icon) => {
            if (icon.html === $.html(element)) flag = false;
        });
        if (flag) {
            iconUrls.push({
                html: $.html(element),
            });
        }
        return 0;
    });
    res.send(iconUrls);
};

module.exports = { getIcons };