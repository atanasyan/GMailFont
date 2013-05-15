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

var defFontName = "Consolas";

function loadOptions(onOptionsLoaded) {
  chrome.storage.sync.get('font_name', function(val) {
    onOptionsLoaded(val['font_name']);
  });
}

function onOptionsLoaded(fontName) {
  if (typeof fontName === "undefined")
    fontName = defFontName;

  css = css.replace("$font_name", fontName);

  var node = document.createElement("style");
  node.type = "text/css";
  node.appendChild(document.createTextNode(css));

  var heads = document.getElementsByTagName("head");
  if (heads.length > 0)
    heads[0].appendChild(node);
  else
    console.error("Cannot find a head tag");
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes["font_name"])
    onOptionsLoaded(changes["font_name"].newValue);
});

loadOptions(onOptionsLoaded);
