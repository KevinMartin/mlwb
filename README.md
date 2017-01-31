# ML Web Blog

## Basic Requirements
- [x] Include a registration page to create a new user account.
- [x] Registered users should have the ability to log in.
- [x] The landing screen should show a summarized and paginated list of blog posts.
- [x] Include a blog post detail screen which displays the full post along with a comment thread.
- [x] Provide the ability to create a new blog post and comment on existing posts. (Note: Only logged on users can create posts.)
- [x] Ability to edit and delete posts.  (Note: Only the user that created the post can edit or delete.)
- [x] Provide the ability to comment on a post. Any logged on user can comment on a post.
- [x] Include a README file with a summary of any decisions (design or technical) not listed here.
- [x] Please use git based source control for us to review the code.  (i.e. Github, GitLab, BitBucket, ...)


## PLEASE NOTE:
- [x] You are free to use any web technologies to simplify feature development. However you may not use any out of the box blog engines for this project (such as Hexo.io, NodeBB).
- [x] You may however use off the shelf solutions for user management.
- [x] You may use a bootstrap UI.
- [x] It is not necessary to publish the site, but we should be able to run it locally with
provided source code. (Please provide instructions in the readme for running the site)


## Nice to have
- [x] Use of a platform for real time data (for example Firebase)
- [x] Real time data updates, when data changes occur from another user, the site
automatically updates on any connected clients.
- [x] Use of technologies like SASS or LESS for stylesheets.
- [x] Use of a JavaScript web application framework for self hosting. (i.e. Node JS
Express, Hapi JS, etc...)
- [x] Use of JavaScript web architecture tools. (i.e. React/Redux, Angular, Sails JS,
etc..)

---

## Technology Stack
* Asset Management: Webpack
* User Management: Firebase
* Database: Firebase
* Language: JavaScript (ES6+)
* Server: Node.js
* Server Framework: Express
* Client JS Framework: React + Redux
* Client CSS Framework: Bootstrap 3 + SASS

## Extras
* SEO using Helmet package. Every page has it's own page title, description, and more.
* Blog Posts can be written in Markdown (CommonMark)
* Application is a Universal/Isomorphic React app, meaning that it renders on the server.

## Installation

```bash
$ git clone git@github.com:KevinMartin/mlwb.git
$ cd mlwb
$ yarn || npm install
```

This application was developed with Node.js v7.1.0.

It is also compatible with Node.js v6.0.0+. If you find that your Node.js version doesn't work with this, you can try installing the newest version of Node.js using `nvm` or a similar tool.

## Running

```bash
$ npm start
```

The server starts after a few seconds, since it builds the assets. Your initial page load may be incomplete until Webpack finishes building.

Open your browser pointing to: `http://localhost:3000`
