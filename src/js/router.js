'use strict';

import request from 'superagent';

function type(el, text, callback) {
  const arr = text.split('');
  const interval = setInterval(() => {
    const next = arr.shift();

    if (next == null) {
      clearInterval(interval);
      callback();
      return;
    }

    el.innerHTML += next;
  }, 150);
}

function typewriter(content, callback) {
  const typewriterNode = content.querySelector('#typewriter');

  if (typewriterNode == null) {
    callback();
    return;
  }

  const text = typewriterNode.innerHTML;
  const article = document.querySelector('main article');
  const writeNode = document.createElement('h1');
  writeNode.innerHTML = '> ';
  article.appendChild(writeNode);

  type(writeNode, text, callback);
}

function go(resource) {
  const article = document.querySelector('main article');
  article.innerHTML = '';

  request
    .get(resource)
    .end((err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      if (res.notFound || /^<!doctype html>/.test(res.text)) {
        go('/html/404.html');
        return;
      }

      const wrapper = document.createElement('div');
      wrapper.className =
      wrapper.innerHTML = res.text;

      typewriter(wrapper, () => {
        document.querySelector('main article').appendChild(wrapper);
      });
    });
}

export default function() {
  if (/^\/?$/.test(window.location.pathname)) {
    go('/html/landing.html');
  } else {
    go('/html' + window.location.pathname + '.html');
  }
}
