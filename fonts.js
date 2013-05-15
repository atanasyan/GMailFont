var css =
  ".ii, .Ak { /* Message view */" +
  "  font: 10pt Consolas !important;" +
  "}" +
  "" +
  ".im, .gmail_quote { /* Quoted Text */" +
  "  color: #555 !important;" +
  "}" +
  "" +
  ".LW-avf { /* Compose window */" +
  "  font: normal small Consolas !important;" +
  "}";

var heads = document.getElementsByTagName("head");
if (heads.length <= 0) {
  console.error("Cannot find a head tag");
  return;
}

var node = document.createElement("style");
node.type = "text/css";
node.appendChild(document.createTextNode(css));
heads[0].appendChild(node);
