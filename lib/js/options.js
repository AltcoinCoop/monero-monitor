function save_options() {
  // Read settings from Options pop-up box:
  var enableMining = document.getElementById('enable-mining').checked;
  var miningAddress = document.getElementById('mining-address').value;
  var miningPool = document.getElementById('mining-pool').selectedIndex;
  var enableReddit = document.getElementById('enable-reddit').checked;
  var redditNumPosts = document.getElementById('reddit-num-posts').value;
  var redditOrdering = document.getElementById('reddit-ordering').value;
  var enableSE = document.getElementById('enable-se').checked;
  var seNumPosts = document.getElementById('se-num-posts').value;
  var seOrdering = document.getElementById('se-ordering').value;
  var enableMarkets = document.getElementById('enable-markets').checked;

  if (miningPool == 0) {
    enableMining = false;
    document.getElementById('enable-mining').checked = false;
  }

  // Save options in Chrome storage:
  chrome.storage.sync.set({
    enableMining: enableMining,
    miningAddress: miningAddress,
    miningPool: miningPool,
    enableReddit: enableReddit,
    redditNumPosts: redditNumPosts,
    redditOrdering: redditOrdering,
    seNumPosts: seNumPosts,
    seOrdering: seOrdering,
    enableMarkets: enableMarkets
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

function restore_options() {
  // Get saved options from Chrome storage:
  chrome.storage.sync.get({
    enableMining: false,
    miningAddress: '',
    miningPool: 0,
    enableReddit: true,
    redditNumPosts: 10,
    redditOrdering: '/',
    enableSE: true,
    seNumPosts: 10,
    seOrdering: 'active',
    enableMarkets: true
  }, function(items) {
    document.getElementById('enable-mining').checked = items.enableMining;
    document.getElementById('mining-address').value = items.miningAddress;
    document.getElementById('mining-pool').selectedIndex = items.miningPool;
    document.getElementById('enable-reddit').checked = items.enableReddit;
    document.getElementById('reddit-num-posts').value = items.redditNumPosts;
    document.getElementById('reddit-ordering').value = items.redditOrdering;
    document.getElementById('enable-se').checked = items.enableSE;
    document.getElementById('se-num-posts').value = items.seNumPosts;
    document.getElementById('se-ordering').value = items.seOrdering;
    document.getElementById('enable-markets').checked = items.enableMarkets;
  });
}

function clear_storage() {
  // Clear all saved options in Chrome storage:
  chrome.storage.sync.clear( function() {
    var status = document.getElementById('status')
    document.getElementById('enable-mining').checked = false;
    document.getElementById('mining-address').value = '';
    status.textContent = 'Options cleared';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clear').addEventListener('click', clear_storage);
