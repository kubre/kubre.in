---
layout: ../../layouts/BlogLayout.astro
title: "TaxGlobe Website (Design Document)"
description: "Design Document for taxglobe.in project"
image: "taxglobe-1.jpg"
hideHeaderImage: true
slug: "taxglobe"
publishedAt: 2023-05-17
tags: ["vaibhav kubre's work", "design document"]
---

**GitHub:** https://github.com/kubre/TaxGlobe <br/>
**Live Deployment:** https://taxglobe.in

<aside class="note">
💡 This is not full blown Technical Document, but rather in my own words a small overview of what went behind of making [TaxGlobe.in](https://taxglobe.in) website. If you have question or want to know something more reach out to me on v@kubre.in as always.
</aside>

## 🗨️ Overview

TaxGlobe is a website designed for Chartered Accountants (CAs) and CA students. This website allows users to share their thoughts, follow each other, and purchase software or books. This document details how the entire website was built from scratch using Laravel.

| **Software Stack**    |                                 |
| --------------------- | ------------------------------- |
| Frontend              | Livewire, TailwindCSS, AlpineJS |
| Serverside            | Laravel                         |
| Database              | MariaDB                         |
| Versioning/Management | Git and GitHub                  |
| Package Management    | Composer                        |

| Hardware Stack |                |
| -------------- | -------------- |
| CPU            | 1 vCPU         |
| RAM            | 1 GB DDR4      |
| Storage        | 40 GB NVME SSD |
| OS             | Ubuntu 20.04   |

<aside class="note">
💡 Since it is a monolithic application, the entire website can be hosted on a single VPS, which works well for hundreds of users.

</aside>

## 🛡️ Why this stack?

Before I start describing the application and process, Here is the reason why all the above choices in stack were made.

-   **Laravel**: Laravel is one of the most mature, and detailed web framework out there, This includes all programming languages and not just PHP. It has one of the best documentation, strong conventions and patterns, and ease of PHP built into it. Hosting it is also a trivial process I’ve hosted several smaller laravel application on Shared Hosting platforms and it works great. Also at this point I’ve been using Laravel for 2+ years at least.
-   **Livewire**: Though a new package but it was something that helped reducing boilerplate javascript I had to write to do simple AJAX actions. Which usually involves updating part of the page.
-   **TailwindCSS**: Tailwind helps in quickly scaffolding custom styles without having to break sweat. Somwthing like bootstrap always felt too constructing to me, where with Tailwind I was able to write CSS with speed. Tailwind is something I still use till this date. [https://kubre.in](https://kubre.in) actually uses tailwind to do the styling.
-   **MariaDB/MySQL**: Considering entire application needs whole application can be entirely modeled using Relational Model. MySQL is just simply widely available and mature choice. Even in 2023 goto choice for DB is always MySQL unless I need to do something that is extremely niche like storing vector embeddings, etc.
-   **Git**: I would not explain why I used git, Its something every programmer should know and actively use.
-   **Hardware**: As for server hardware, I’m simply being pragmatic. Taxglobe is not netflix it does not need complex build systems and Lambda deployments. A simple VPS server alongside nginx is what keeps cost low until they need to scale up. This should be enough for thousands of users.

## 📝 Goals and Guidelines

Before even any part of the code started I flushed out all the requirements over long calls during which I not only gave examples of how features could be implemented but actively helped Taxglobe to convey their full requirements to me. During this, I noted down all the details, and I made a proper draft of all the requirements You can take a look at the bottom of `Readme.md` on GitHub.

1. **Social Media**: tax globe wanted a Social media experience similar to LinkedIn where you can create, share posts, and write microblogs too. You should also be able to connect to different people.
2. **Shop**: TaxGLobe sells many books and software. The shop section would host these physical and virtual products. Users can purchase them and pay for them online, download/print invoices, etc.
3. **Admin Panel**: This will help Taxglobe to manage and monitor the entire website activity. This includes users registering to the website, moderating posts, adding products to the shop, updating shop orders, analytics, and more.

## 🛠️ Architectural Strategy

Most of the application follows above architecture.

1. When a person visit the website, index.php loads laravel application which in turn loads the Application Router (This is handled by laravel itself so I wont go in details here)
2. For every routes there is a Component Controller Class which handles it. Router’s job is to hand over the Request to this Component Controller.
    1. You can also specify middleware that intercepts these flow, common middleware in this application was `auth` middleware as the name suggests it checks whether or not user is authenticated if not then redirects them back to login screen
    2. Any number of middleware could be chained and for taxglobe I used few of these throughout application to intercept between some routes
3. Controller Receives `Request` object alongside anything URL path might consist like id, slug etc. as parameter.

    1. Dependency Injection provided by laravel is heavily used in this as in the controller if you specify Type of data you want to receive Laravel would construct that object and pass it to the Controller. In following example you can see I only specified route would have path param named `post` and Laravel’s Dependency Injection automatically fetches the correct post by id from database and passes it to Component because of type hint provided.

        ```php
        # Router
        Route::get('posts/{post}', SocialMedia\PostComponent::class)

        # Controller
        public function (Request $request, Post $post) { }
        ```

4. Component holds the actual logic. Most of the time I needed to get some extra data from database and transform it or just needed render a view.
    1. Getting data or Updating data was easily handled using Models, Models are representation of data in the database as an Object form.
    2. Rather than writing fisky SQL queries Eloquent ORM was used in defining these models, alongside any relations they have to easily work with database.
    3. To have authorization on data [Laravel Guards](https://laravel.com/docs/8.x/authorization#gates) are used.
    4. For more complex authorization needs Models can have [Policies](https://laravel.com/docs/8.x/authorization#creating-policies) attached to them. Where middleware helped in authenticating the user, Model Policies helps authorizing users for action on model, Ex User might be logged in but (which is authentication) but they cannot edit someone else’s post (This is authorization).
5. At last Application renders the view, which where mostly written using [Laravel’s Component](https://laravel.com/docs/8.x/blade#components), or livewire components.
    1. Laravel is server rendered framework which means entire page refresh is needed to perform an action, this might not be desirable in situation as liking the post in social media section. Here comes livewire which bridges gap and can directly call PHP code from the frontend.
    2. Obivoulsy this is using javascript inside of it, but that is the javascript I do not have to write and maintain.
    3. This provides not only the benefit of having extremely fast server rendered pages using blade but all of them rich UI actions using Livewire to do action usually achieved using AJAX and javascript.

You can clearly see how I architected the entire application using tried and tested MVC pattern. This helped to organize the code way better than what doing it from scratch.

## 🚚 Deployment & Maintenance

-   The project was deployed to a VPS server as stated above in the hardware stack.
-   The VPS was a scratch Ubuntu server on top of which I added PHP 7, MariaDB, Nginx, Composer, and Git.
-   A simple post-receive hook was used to copy application code to the proper directory and install its dependencies using [Composer](https://getcomposer.org/).
-   With the above setup, I could easily push features or fixes to the production server using `git push`.
    -   Here is the post-receive script, which copies code, installs dependencies, and clears the previous cache of the application, all done using a simple bash script 😄
        ```bash
        #!/bin/bash
        unset GIT_INDEX_FILE
        git --work-tree=/usr/share/nginx/html/taxglobe --git-dir=/home/kubre/taxglobe.in checkout -f
        cp ~/taxglobe.env /usr/share/nginx/html/taxglobe/.env
        cd /usr/share/nginx/html/taxglobe
        composer install --no-dev
        composer dumpautoload -o
        php artisan migrate
        php artisan view:cache
        php artisan route:cache
        php artisan config:clear
        ```
-   Not only this but using a simple cron job and simple bash I made weekly backups which were downloaded back to my local system in I ever need to restore it, in case of losing it attack or something.

> During the entire process, I maintained constant contact with the TaxGlobe team to receive feedback on the progress. The project was completed down to the smallest details and received 100% positive feedback.
