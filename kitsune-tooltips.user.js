// ==UserScript==
// @name         Kitsune — Yokai Rank Tooltips
// @namespace    https://github.com/AzureBelmont/aither-css
// @version      1.0
// @description  Replaces Greek rank names in hover tooltips with Yokai names on Aither
// @author       AzureBelmont
// @match        https://aither.cc/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';
  
  /* Rank map: title attribute value → Yokai name
     Keep in sync with kitsune.css rank map         */
  const RANK_MAP = {
    // Main track
    'Leech':             'Norowareshi',
    'Phobos':            'Hitodama',
    'Harmonia':          'Tanuki',
    'Zeus':              'Tengu',
    'Helios':            'Inugami',
    'Prometheus':        'Inari',
    'Oceanus':           'Ryujin',
    'Gigantes':          'Oni',
    'Titan':             'Okami',
    // Uploader track — current
    'Junior Uploader':   'Yoko',
    'Uploader':          'Nibi',
    // Uploader track — incoming
    'Selene':            'Tsukimi',
    'Eos':               'Yoake',
    'Epimetheus':        'Omokage',
    'Iapetus':           'Shirogane',
    'Hesperides':        'Tasogare',
    'Uranus':            'Takama',
    // Static / staff
    'Typhon':            'Sanbi',
    'Contributor':       'Sakura',
    'Trustee':           'Kitsune-gumi',
    'Internal':          'Tsukai',
    'FLS':               'Kannagi',
    'Editor':            'Fudeshi',
    'Torrent Moderator': 'Shogun',
    'Moderator':         'Daimyo',
    'Administrator':     'Daimyo-no-Koe',
    'Coder':             'Tanuki-shi',
    'Owner':             'Oyakata',
    'Bot':               'Kappa',
  };

  function rewriteTitles(root) {
    root.querySelectorAll('a.user-tag__link[title]').forEach(el => {
      const original = el.getAttribute('title');
      if (RANK_MAP[original]) {
        el.setAttribute('title', RANK_MAP[original]);
      }
    });
  }

  rewriteTitles(document);

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches && node.matches('a.user-tag__link[title]')) {
          const original = node.getAttribute('title');
          if (RANK_MAP[original]) node.setAttribute('title', RANK_MAP[original]);
        }
        if (node.querySelectorAll) rewriteTitles(node);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
