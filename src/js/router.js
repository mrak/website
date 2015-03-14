'use strict';

var request = require('superagent');

function type(el, text, callback) {
  var arr = text.split('');
  var interval = setInterval(function() {
    var next = arr.shift();

    if (next == null) {
      clearInterval(interval);
      callback();
      return;
    }

    el.innerHTML = el.innerHTML + next;
  }, 150);
}

function typewriter(content, callback) {
  var article, text, writeNode;
  var typewriterNode = content.querySelector('#typewriter');

  if (typewriterNode == null) {
    callback();
    return;
  } else {
    text = typewriterNode.innerHTML;
  }

  article = document.querySelector('main article');
  writeNode = document.createElement('h1');
  writeNode.innerHTML = "> ";
  article.appendChild(writeNode);

  type(writeNode, text, callback);
}

function go(resource) {
  var article = document.querySelector('main article');
  article.innerHTML = "";

  request
    .get(resource)
    .end(function (err, res) {
      if (err) {
        console.error(err);
        return;
      }
      if (res.notFound || /^<!doctype html>/.test(res.text)) {
        go('/html/404.html');
        return;
      }

      var wrapper = document.createElement('div');
      wrapper.className =
      wrapper.innerHTML = res.text;

      typewriter(wrapper, function () {
        document.querySelector('main article').appendChild(wrapper);
      });
    });
}

if (/^\/?$/.test(window.location.pathname)) {
  go('/html/landing.html');
} else {
  go('/html' + window.location.pathname + '.html');
}
