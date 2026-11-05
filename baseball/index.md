---
layout: default
title: dookieball
---
<div id="bouncers"></div>
<script src="/bouncers.js"></script>
# baseball news and thoughts

baseball is an engine of agony, heartbreak, serenity, and bliss

## latest posts:

<ul>
{% for post in site.baseball_posts reversed %}
  <li>
    <a href="{{ post.url }}">{{ post.description }}</a> — {{ post.date | date: "%B %-d, %Y" }}
  </li>
{% endfor %}
</ul>