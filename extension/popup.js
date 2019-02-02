let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    /*
    currentWindow => checks code for the tab, not necessarily active, but one which is parent
    and led to other tabs, for tabs.query. For events, topmost tab is taken
    active => checks for active tab
    */
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
    // tab id, where to run the script, defaults to activetab of current window
        // tabs[0].id,
          {file: 'script.js'});
    });
  };