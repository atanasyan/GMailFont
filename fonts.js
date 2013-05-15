var css =
  ".ii, .Ak { /* Message view */" +
  "  font: 10pt $font_name !important;" +
  "}" +
  "" +
  ".im, .gmail_quote { /* Quoted Text */" +
  "  color: #555 !important;" +
  "}" +
  "" +
  ".LW-avf { /* Compose window */" +
  "  font: normal small $font_name !important;" +
  "}";

var heads = document.getElementsByTagName("head");
if (heads.length <= 0) {
  console.error("Cannot find a head tag");
  return;
}

css = css.replace("$font_name", "Consolas");

var node = document.createElement("style");
node.type = "text/css";
node.appendChild(document.createTextNode(css));
heads[0].appendChild(node);
