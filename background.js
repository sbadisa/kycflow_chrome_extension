// // check if there is a cookie with the name "sessionid"
// chrome.cookies.get(
//   { url: 'http://localhost:8000', name: 'sessionid' },
//   function (cookie) {}
// );

//on installation of chrome extension: create contextMenuItem
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'SearchPerson',
    title: 'Search person "%s" in KYCflow',
    contexts: ['selection'],
  });
  chrome.contextMenus.create({
    id: 'SearchCompany',
    title: 'Search company "%s" in KYCflow',
    contexts: ['selection'],
  });
  chrome.contextMenus.create({
    id: 'SearchDefault',
    title: 'Default search "%s" in KYCflow',
    contexts: ['selection'],
  });
});

//add listener for click on self defined menu item
chrome.contextMenus.onClicked.addListener(function (clickData, tab) {
  if (clickData.menuItemId == 'SearchPerson' && clickData.selectionText) {
    //open new tab
    chrome.tabs.create({
      url:
        'http://localhost:8000/search/?dataset=default&schema=person&q=' +
        clickData.selectionText +
        '&url=' +
        tab.url,
      index: tab.index + 1,
    });
  }
  if (clickData.menuItemId == 'SearchCompany' && clickData.selectionText) {
    chrome.tabs.create({
      url:
        'http://localhost:8000/search/?dataset=default&schema=company&q=' +
        clickData.selectionText +
        '&url=' +
        tab.url,
      index: tab.index + 1,
    });
  }
  if (clickData.menuItemId == 'SearchDefault' && clickData.selectionText) {
    chrome.tabs.create({
      url:
        'http://localhost:8000/search/?dataset=default&q=' +
        clickData.selectionText +
        '&url=' +
        tab.url,
      index: tab.index + 1,
    });
  }
});
