function saveOptions() {
  var fontName = document.getElementById("font_name").value;
  if (!fontName) {
    message('Error: No font name specified');
    return;
  }

  chrome.storage.sync.set({'font_name': fontName}, function() {
    // Notify that we saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() { status.innerHTML = ""; }, 750);
  });
}

function loadOptions() {
  chrome.storage.sync.get('font_name', function(val) {
    document.getElementById("font_name").value = val['font_name'];
  });
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.querySelector('#save').addEventListener('click', saveOptions);
