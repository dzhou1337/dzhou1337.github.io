---
layout: default
title: dookiesongs
---

# i have exquisite music taste

this is like spotify wrapped in slow motion

## latest posts:

<ul>
{% for post in site.music_posts reversed %}
  <li>
    <a href="{{ post.url }}">{{ post.description }}</a> — {{ post.date | date: "%B %-d, %Y" }}
  </li>
{% endfor %}
</ul>