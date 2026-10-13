---
layout: default
title: dookieball
---

# baseball news and thoughts

<ul>
{% for post in site.baseball_posts reversed %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a> — {{ post.date | date: "%B %-d, %Y" }}
  </li>
{% endfor %}
</ul>