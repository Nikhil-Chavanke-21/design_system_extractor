const imageExtractor = require("./services/image_extractor");
const iconExtractor = require("./services/icon_extractor");
const styleExtractor = require("./services/style_extractor");
const colorExtractor = require("./services/color_extractor");
const buttonExtractor = require("./services/button_extractor");
const typographyExtractor = require("./services/typography_extractor");

const express = require('express')
const app = express()
const port = 3001

app.get('/images', imageExtractor.getImages);
app.get('/icons', iconExtractor.getIcons);
app.get('/style', styleExtractor.getStyle);
app.get('/typography', typographyExtractor.getTypography);
app.get('/colors', colorExtractor.getColors);
app.get('/buttons', buttonExtractor.getButtons);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});