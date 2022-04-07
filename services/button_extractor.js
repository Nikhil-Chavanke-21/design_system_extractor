const cheerio = require('cheerio');
const axios = require('axios');

const getButtons = async (req, res) => {
    let buttonUrls = [];
    const url = req.query.url;

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    $('a').each((_, element) => {
        let noDiv = true;
        element.children.forEach((child) => {
            if (child.name == 'div' || !child.name) noDiv = false;
        });
        if (noDiv) {
            let flag = true;
            buttonUrls.forEach((button) => {
                if (button.html === $.html(element)) flag = false;
            });
            if (flag) {
                buttonUrls.push({
                    html: $.html(element),
                });
            }
        }
        return 0;
    });
    $('button').each((_, element) => {
        let flag = true;
        buttonUrls.forEach((button) => {
            if (button.html === $.html(element)) flag = false;
        });
        if (flag) {
            buttonUrls.push({
                html: $.html(element),
            });
        }
        return 0;
    });
    res.send(buttonUrls);
};

module.exports = { getButtons };