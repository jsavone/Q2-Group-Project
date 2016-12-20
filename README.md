# Q2 Group Project Requirements

The goal of this project is to put what you've learned to use to:

* [Write a project proposal and get it approved by an instructor](#proposal)
* [Follow an agile development workflow](#agile)
* [Create and deploy a complete CRUD app](#create-deploy)
* [Make a video highlighting the functionality of your app](#video)
* [Complete a write-up of the project](#write-up)
* [Add all three of these to an online portfolio](#portfolio)
* [Present your work to the class](#present)

<a id="proposal"></a>

## Write a project proposal and get it approved by an instructor

For this project, you will be assigned into groups of four/five. Together, you will need to come up with a product idea, and write it as a proposal that includes:

* A project description
    * Who uses it?
    * What outputs do they need?
    * What inputs are needed to generate those outputs?
* A list of technologies that you plan to use
* A well-defined and written-out feature list

There are some constraints around what technologies MUST be present in your app. Check out [Create and deploy a web app](#create-deploy) below.

## Follow Agile Workflow

### Example Ideas

* Library
* Movie Database
* Blog
* Retail Store
* Student Enrollment System
* Sports Performance Database
* Trip Itenerary

<a id="create-deploy"></a>

## Create and deploy a complete CRUD app

Your web app should:

* CRUD
    * Allow users to create, read, update, and delete data from a form

* HTML
    * Make good use of semantic HTML tags
    * Be well-indented, [validated](https://validator.w3.org/nu/), etc.

* CSS
    * Be well-designed
    * Use either CSS or a styling framework like Bootstrap
        * If you are using Bootstrap, please consider theming with something like bootswatch, customizing the download with SASS, or a [customizer](http://getbootstrap.com/customize/)
    * Be well-indented and clean
    * Use at least one web font
    * Split code into separate files where appropriate
    * Responsive design optional but strongly encouraged

* JavaScript
    * Well-indented, linted, and use excellent variable names
    * Split code into separate files where appropriate
    * Optionally, use a test-driven development approach

* Workflow
    * Use wireframes to create your layouts before you build them
    * Use a feature-branch workflow for your user stories

Your App should:

* App
    * Use express.js
    * Handle create, read, update, and delete operations on multiple related models
    * CRUD data from/to a relational database using SQL, Knex, or an ORM

* Auth
    * Support functionality for three role types:
        * A non-logged in user
        * A logged-in user with limited permissions
        * A logged-in superuser (admin)
    * Passwords should be hashed

* Database
    * Use Postgres
    * Be normalized to 3rd Normal Form
    * Be seeded with data

* Workflow
    * Use a feature-branch workflow for your user stories
    * Document all dependencies in a `package.json` file

<a id="video"></a>

## Make a video highlighting the functionality of your app

* Make a 3-6 minute video explaining your project and demonstrating its features

<a id="write-up"></a>

## Complete a write-up of the project

* Describe what the project is, the technologies you used, and some information about the workflow you followed.
* 1-2 tight paragraphs

<a id="portfolio"></a>

## Add all three of these to an online portfolio

* Create a portfolio on [talent](http://talent.galvanize.com)
* Link to your final deployed site, your video, your respositories, and your write-up
* This will be added to your web development portfolio

<a id="present"></a>

## Present your work to the class

* Be prepared to spend ~10 minutes presenting your work to the class.

---

This is a realistic approximation of what developing real products on a software team is like. You will have approximately 20-25 hours of class time to work on this. **It will not be enough time to do a good job on this project**. Plan on spending extra time outside of class, and coordinate this time with your team. This is another Big Deal Week, and you should put maximum effort into making it successful. You can and should use your teammates, classmates on other teams, and your instructors as learning resources, but this should be your own work.
