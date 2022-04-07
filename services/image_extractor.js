const xray = require("x-ray-scraper");
const getsiteurls = require('get-site-urls');

const getImages = async (req, res) => {
    const url = req.query.url;

    // let allImageUrls = [];

    // let pageUrls = await getsiteurls(url, 1)
    //     .then(links => links);

    // for (const pageUrl of pageUrls.pages) {
    //     let pageImageUrls = await xray(pageUrl, ['img@src'])
    //         .then((image) => image);
    //     allImageUrls.push(...pageImageUrls);
    // }
    // allImageUrls = [...new Set(allImageUrls)];
    // res.send(allImageUrls);

    let imageUrls = await xray(url, ['img@src'])
        .then((image) => image);
    res.send(imageUrls);
};

// getImages();

module.exports = { getImages };