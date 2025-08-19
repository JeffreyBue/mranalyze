# Cloud Run Renderer(Light Switch)
> A lightweight HTML/Mustache renderer


### Requirements:
- Docker
- note: `docker compose exec app npm install`

### Quick Start:
1. Clone the renderer repository.
2. Ensure Docker is running.
3. Run the following command:
   ```bash
   docker-compose up
   ```
4. Navigate to [http://localhost:8787](http://localhost:8787).

### Table Of Contents:

- [The Routes Journey](#the-routes-journey)
- [Dynamic Routing](#dynamic-routing)
- [Data APIs](#data-apis)
- [Create Content](#create-content)
- [Mustache and Markdown](#mustache-and-markdown)

## Preface

This document serves as a comprehensive guide to deploying and working with the Cloud Run Renderer (Light Switch), a lightweight HTML and Mustache renderer. It walks through the essential steps for setting up the renderer with Docker, creating dynamic routes, and handling data in various formats like Mustache and Markdown. The renderer is designed for flexibility, allowing developers to customize the templates, routes, and data APIs to fit their project needs. Whether you're new to this tool or looking to enhance its capabilities, this guide provides clear instructions for both setup and expansion.

## The Routes Journey

When someone accesses a route on the renderer framework, it traverses through a series of middlewares, controllers, and functions to:

1. Find out which template to render.
2. Attain data for the template.
3. Render the template while providing the exact data and features the route needs, handling any errors if necessary.

These middlewares are located in ./server/middleware/ and are registered in ./server/app.js. They can be edited or added to, depending on project needs.

### Dynamic Routing

In the `config.js` file, there are three main properties: regex for the host, regex for the route, and the template to use for that route.

``` javascript
{
    "host": "",
    "path": "/",
    "template": "home"
}
```

**Hosts** are defined using regular expressions (regex). If the host field is an empty string "", it is considered the default and allows this route to be used for any host specified in the config.js file. If you provide a specific host, the route will only apply to that particular host. You can also define multiple hosts using regex. For example:

``` javascript
{
    "host": "www2.site.com|pre-production.site.com"
    ...
}
```

This route will work for both `www2.site.com` and `pre-production.site.com`.

**Routes** are written using regex. If they contain groups (e.g., `(?<key>)`), the group name becomes the key in the data object under `urlprops.params`. Content related to the URL is available under `_content.markdown` or `_content.tables` in the data object.

Example: 
``` javascript
Route: localhost:8787/california
        {
          "host": "",
          "path": "/(?<state>(\\w+)(-\\w+)?)/?",
          "template": "state",
        }
```

### Data Object Example:
``` javascript
        ...
        "urlprops": {
            "pathname": "/california/",
            "params": [
                {
                    "state": "california"
                }
            ],
        ...
```

### Data APIs

Data APIs are integrated with the renderer, so the data needed for the page can be fetched before rendering. The renderer uses APIs defined in `config/api.js`.

The Data Handler(`/server/middleware/dataHandler.js`) has the code of bringing in data sets and setting the data points.

In the sites `config.js`, you can add endpoints that should be mapped to the routes that use them

``` javascript
...
        "api_base_url": {
            "url": "https://seo-people-directory-hlwo534jbq-uk.a.run.app",
            "headers": {
                "domain": "reversephonelookup"
            },
        },
...
        {
          "host": "",
          "path": "/number/(?<number>\\d{10})/?",
          "template": "phone_result",
          "endpoint": "api_base_url",
        }
...
```


**Path of the URL should be One to One to the API EndPoint.**

- example: Brower URL Path: https://www.site.com/example/path/
    - API ROUTE: https://api.com/example/path/

### `apiDataTrx.js` and `mustacheFunctions.js` Hooks

The `apiDataTrx` hook is where the main data object is passed through. This is the place where any additional data processing or augmentations to the data object should occur.

The `attachMustacheFunctions` hook is a utility that allows you to create custom Mustache functions to be used in the templates for further data processing.

### Viewing the Data

Adding a `GET` parameter of `api` at the end of the route will allow you to see the *data object* available for that route.


- example /articles/slug_of_md_article/?api you'll see the data object that can be used in the markdown syntaxed template, *excluding any mustache functions*.

To enable this feature, you must have the following environment variable set:

``` bash
#*/.env
API_VIEW_FLAG=true
```
*This feature is intended to work only in local environments, Codespaces, and staging environments.*

## Create Content

### All content editable files are located in the `./src/` folder

- Create the content, then instantiate it within the codebase.

```
/src
    > /assets (less and jsrc)
    > /markdown (.md files)
    > /partials (repeatable html like head.html)
    > /tables (.csv files)
    > /templates (.html files for page_types)
```

Other than the `assets` folder, each of these directories contains an `index.js` file. This file registers newly created content so the codebase recognizes it.


``` javascript
// ./src/partials/index.js

const HEAD = await readFromFile('/src/partials/head.html');

export default {
    HEAD
}
```

### `/src/assets/` less(.less) and jsrc(.js) files are compliled and compressed with the gulp compiler.

To start the Gulp compiler, open a terminal and run `gulp` or `npm run gulp`.

- This watches all files within the `/src/assets/jsrc` and `/src/assets/less` directories, excluding `seo.less` and `normalize.less`
- If the process fails, don't hesitate to `ctrl+c` and rerun `npm run gulp`.

## YAML - Content Split

Templates (`templates/*.html`) and Markdown files (`markdown/*.md`) have a feature that allows you to implement data using YAML syntax at the top of the file. This is commonly known as "front matter."

This data can be used in the context of its file and will bubble up from Markdown files to Templates and Partials.

Markdown and Templates are seperated by `--yaml--`

example:
``` yaml
# /src/markdown/articles/slug_of_md_article.md

title: Article Example
--yaml--
Markdown content
```

``` html
# /src/templates/articles.html

h1: This is the H1 for the article
--yaml--
<!DOCTYPE html>
<html lang="en">
    <head>
    <title>{{title}}</title> <!-- Article Example -->
    </head>
    <body>
        <h1>{{h1}}</h1> <!-- This is the H1 for the article -->
        {{_content.articles.html}} <!-- this is '<p>Markdown content</p>" from the slug_of_md_article.md -->
    </body>
```

## Mustache and Markdown

### Mustache
[JavaScript Mustache](https://mustache.github.io/) syntax is a simple templating language that allows developers to *dynamically* generate HTML content. It is named after the curly braces (`{{ }}`)  that resemble a mustache, which are used to denote variables that are to be replaced with actual values at runtime. Mustache syntax can be used in a variety of programming languages, including JavaScript, PHP, Ruby, and others.

The main benefit of Mustache syntax is its simplicity and ease of use. It is a lightweight language that does not require any special tools or libraries to work with. However, its simplicity can also be a pitfall, as it lacks some of the more advanced features of other templating languages, such as advance logic and methods. Although condition of existance and loops are allowed.

``` yaml
title: "This is for the title"
h1: "This is the actual value of a H1"
--yaml--
<html lang="en">
	<head>
		{ {> HEAD} }
	</head>
	<body>
		{ {> HEADER } }

		<main>
			<h1>
				{ { h1 } }
			</h1>
```
Transforms into: 
``` html
<html lang="en">
	<head>
        <title>This is for the title</title>
	</head>
	<body>
		<nav>
            <a href="/">home</a>
        </nav>

		<main>
			<h1>
				This is actual value of a H1
			</h1>
```

### Markdown
[Markdown syntax](https://www.markdownguide.org/), on the other hand, is a lightweight markup language used for formatting plain text. It is designed to be easy to read and write, and is used widely for creating documentation, blog posts, and other types of content. Markdown syntax uses special characters to denote formatting, such as * for bold text and # for headings.

The main benefit of Markdown syntax is its simplicity and ease of use. It allows writers to focus on the content of their writing without getting bogged down in formatting details. However, like Mustache syntax, its simplicity can also be a pitfall, as it lacks some of the more advanced formatting options of other markup languages, such as tables and footnotes.

``` markdown
    # This is an h1
    - this is list item one
    - this is list item two
```
Transforms into:
``` html
    <h1>This is an h1</h1>
    <ul>
        <li>
            this is list item one
        </li>
        <li>
            this is list item two
        </li>
    </ul>
```

### In Summary
While Mustache and Markdown syntax are used for different purposes, they can work together to create dynamic and formatted content. For example, a developer could use Mustache syntax to generate HTML content from data stored in a database, and then use Markdown syntax to format that content for display on a website.


```bash
### Table Data from MarkDown
{ {#alltables.lorem.length} }
{ {#alltables.lorem} }  
* ***ID:*** { {ID} }
* ***Name:*** { {Name} }
* ***Email:*** { {Email} }
* ***Phone:*** { {Phone} }
* ***Country:*** { {Country} }
---  
{ {/alltables.lorem} }  
{ {/alltables.lorem.length} }
```

The main difference between Mustache and Markdown syntax is their purpose and scope. Mustache syntax is designed for generating dynamic content, while Markdown syntax is designed for formatting plain text. Both are *simple* and easy to use, but they serve different needs and are best used in their respective contexts.

## Summary

This guide covered the end-to-end process of setting up the Cloud Run Renderer (Light Switch) and customizing it to suit your project requirements. We explored the renderer's routing system, discussed how to handle dynamic routes, and explained how data is passed through various templates. The document also highlights the use of Mustache for dynamic content generation and Markdown for simple formatting. Lastly, the guide provides detailed instructions on working with data APIs, managing content, and ensuring efficient performance through Gulp for asset compilation.

---
**Please contact [Jeffrey Bue](https://github.com/JeffBue) or the SEO department with any questions.**