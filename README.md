[Sample](https://designbyatlas.com/)

# Roadmap

* [Structured Data](https://developers.google.com/search/docs/guides/intro-structured-data?visit_id=1-636232848729752989-3223931780&hl=en&rd=1)
* [] optimize [load speed](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fwww.santiagojsosa.com%2F&tab=mobile)
* [x] [https](https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion)
* [x] redirect **non-www** to **www**

# Using nodemon over gulp

## Problem
while developing with node you have to compile your source `index.js`. This mean that every time souce files like html (in this case handlebars) change node needs to restart.

`Nodemon` is a common service for getting this done but this means I would be running `nodemon` and `gulp` to compile `SCSS` and `JS` files for the Front end.

## Solution
Forget `gulp watch`. By removing gulp as a watcher we can use `nodemon` to watch any changes and compile all our assets. This is great because now we can do Continues Integration on anywhere. 

Downside is compiling unchanged assets like JS getting compiled when SCSS was changed.