const fetchCss = require('fetch-css');

const getStyle = async (req, res) => {
    const url = req.query.url;

    const [{ css }] = await fetchCss([{ url: url }]);
    res.send(css);
};

module.exports = { getStyle };