const fetchCss = require('fetch-css');
const _ = require('lodash');

const getColors = async (req, res) => {
    const url = req.query.url;

    const [{ css }] = await fetchCss([{ url: url }]);

    finalColors = {}
    colors = css.match(/[;{][-a-z]*color:#[a-zA-Z0-9]{6}[;}]/g);
    colors3 = css.match(/[;{][-a-z]*color:#[a-zA-Z0-9]{3}[;}]/g);
    if (colors3) colors = [...colors, ...colors3];
    colors.forEach((color) => {
        color = color.substring(1, color.length - 1);
        [tag, hexCode] = color.split(':');
        if (tag in finalColors) finalColors[tag].push(hexCode);
        else finalColors[tag] = [hexCode];
    });
    backgrounds = css.match(/background:#[a-zA-Z0-9]{6}[;}]/g)
    backgrounds3 = css.match(/background:#[a-zA-Z0-9]{3}[;}]/g);
    if (backgrounds3) backgrounds = [...backgrounds, ...backgrounds3];
    backgrounds.forEach(color => {
        color = color.substring(0, color.length - 1);
        [tag, hexCode] = color.split(':');
        if ('background-color' in finalColors) finalColors['background-color'].push(hexCode);
        else finalColors['background-color'] = [hexCode];
    });
    for (tag in finalColors) {
        dict = _.countBy(finalColors[tag]);
        frequency = [];
        for (color in dict) {
            frequency.push({
                hexcode: color,
                count: dict[color]
            });
        }
        finalColors[tag] = _.sortBy(frequency, [(o) => { return -o.count; }]);
    }
    res.send(finalColors);
};

module.exports = { getColors };