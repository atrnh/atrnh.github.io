---
layout: default
title: Miscellaneous
permalink: /misc
categories: ['page']
order: 4
---

# Miscellaneous stuff

<h3>Keymaps</h3>
<ul>
  {% for km in site.keymap %}
    <li><a href="{{ km.permalink }}">{{ km.title }}</a></li>
  {% endfor %}
</ul>

<h3>Learning Resources</h3>
<ul>
  <li><a href="https://codepen.io/collection/nMozpv">React Demos</a> &mdash; a collection
    of all the React demos I've ever written for a student, ever.
  </li>
</ul>
