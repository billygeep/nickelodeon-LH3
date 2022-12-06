import WebFont from "webfontloader";
import reduce from "lodash/reduce";
import isArray from "lodash/isArray";

function generateMultiSrc(files, name) {
  const validKeys = ["eot", "woff", "woff2", "ttf", "svg"];
  return `${files.eot ? `src: url('${files.eot}');` : ""}
  src: 
  ${files.eot ? `url('${files.eot}?#iefix') format('embedded-opentype'),` : ""}
  ${files.woff ? `url('${files.woff}') format('woff'),` : ""}
  ${files.ttf ? `url('${files.ttf}') format('truetype'),` : ""}
  ${files.woff2 ? `url('${files.woff2}') format('woff2');` : ""}`;
}

function generateCSSString(
  family,
  files = {},
  style = "normal",
  weight = "normal"
) {
  return `@font-face {
    font-family: '${family}';
    ${generateMultiSrc( files, family)}
    font-weight: ${weight};
    font-style: ${style};
  }`;
}

function addCss(family) {
  var css = generateCSSString(
      family.name,
      family.files,
      family.style,
      family.weight
    ),
    head = document.head || document.getElementsByTagName("head")[0],
    styleEl = document.createElement("style");
  styleEl.type = "text/css";
  if (styleEl.styleSheet) {
    styleEl.styleSheet.cssText = css;
  } else {
    styleEl.appendChild(document.createTextNode(css));
  }

  head.appendChild(styleEl);
}

function handleFontLoad(fontConfig, callback) {
  const webfontConfigObject = reduce(
    fontConfig,
    (result, value, key) => {
      result[key] = {};
      result[key].families = value.families.map(
        family => (typeof family === "string" ? family : family.name)
      );
      return result;
    },
    {}
  );
  if (fontConfig.custom && isArray(fontConfig.custom.families)) {
    fontConfig.custom.families.forEach(family => addCss(family));
  }
  webfontConfigObject.active = callback;
  webfontConfigObject.inactive = callback;
  WebFont.load(webfontConfigObject);
}

export default function(fontConfig, callback) {
  handleFontLoad(fontConfig, callback);
}
