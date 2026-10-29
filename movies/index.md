---
layout: default
title: dookiefilms
---

# 🎥 C I N E M A 🍿

i'll watch anything with emma stone and or ryan gosling in it

## required reading

if you want to properly engage with my thoughts on movies, you must understand my principles when it comes to evaluating and appreciating the cinematic arts. come to me with a response to my film thoughts while making it clear you don't know my principles, and i will obliterate you.

- [On Numerical Ratings](/movies/on-numerical-ratings/) - ⭐⭐⭐⭐⭐
- [Endings](/movies/endings) - it was all a dream

## movie reviews

<ul>
{% for post in site.movies_posts reversed %}
  {% unless post.featured %}
  <li>
    <a href="{{ post.url }}">{{ post.description }}</a> — {{ post.date | date: "%B %-d, %Y" }}
  </li>
  {% endunless %}
{% endfor %}
</ul>

check my [letterboxd](https://letterboxd.com/dookiemoto/) for hard hitting analysis