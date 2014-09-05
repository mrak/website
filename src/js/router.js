'use strict';

var request = require('superagent');
function go(resource) {
  request
    .get(resource)
    .end(function (err, res) {
      if (err) {
        goErr();
        return;
      }
      if (res.notFound) {
        go('/html/404.html');
        return;
      }

      document.querySelector('main article').innerHTML = res.text;
    });
}

if (/^\/?$/.test(window.location.pathname)) {
  go('/html/landing.html');
} else {
  go('/html' + window.location.pathname + ".html");
}

