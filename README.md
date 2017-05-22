# `myFollowerz`

This is a twitter application which is planned, designed and implemented for Software Development Practice (SWE 573) 2017 Spring project. 
In this application, users can get the list of their twitter followers, see them on a world map and set timers to tweet at a later time. 


## Requirements

Because Github's current markdown implementation does not properly render nested enumerated lists, the requirements document will be 
maintained in a google document. This document can be viewed anonymously.
[`https://docs.google.com/document/d/1UnnVfhVo172_un4o65EWkrTg7eTezHTUuXFD6SASL9U`][local-app-url]

## Project Schedule
The Project Schedule is created as a Gantt Chart and can be seen by using the following link:
[`https://drive.google.com/open?id=0B0GUW5NbDcPgT0lKbEFqNkk5T0E`][local-app-url]

## Sequence Diagram
Sequence diagram of events in myFollowerz app can be found in the following Wiki page:
[`https://github.com/yesimoral/SWE573/wiki/Sequence-diagram`][local-app-url]

## System Design
System design of myFollowerz app can be found in the following Wiki page:
[`https://github.com/yesimoral/SWE573/wiki/System-design`][local-app-url]

## Getting Started

To get you started you can simply clone the `SWE573` repository and install the dependencies:

### Prerequisites

You need git to clone the `SWE573` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `SWE573`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

### Clone `SWE573`

Clone the `SWE573` repository using git:

```
git clone https://github.com/yesimoral/SWE573.git
cd SWE573
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and Angular framework code. The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [Node package manager][npm].
* We get the Angular code via `bower`, a [client-side code package manager][bower].
* In order to run the end-to-end tests, you will also need to have the
  [Java Development Kit (JDK)][jdk] installed on your machine. Check out the section on
  [end-to-end testing](#e2e-testing) for more info.

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`. After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
`SWE573` changes this location through the `.bowerrc` file. Putting it in the `app` folder
makes it easier to serve the files by a web server.*

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].

### Running the App during Development

The `SWE573` project comes preconfigured with a local development web server. It is a Node.js
tool called [http-server][http-server]. You can start this web server with `npm start`, but you may
choose to install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by running:

```
http-server -a localhost -p 8000
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].

### Running the App in Production

Deployment on AWS is completed for this app and you can use the app by browsing to the following link:

Now browse to the app at [`http://52.59.166.209`][local-app-url].


## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  components/           --> all app specific modules
    version/              --> version related components
      version.js                 --> version module declaration and basic "version" value service
      version_test.js            --> "version" value service tests
      version-directive.js       --> custom directive that returns the current app version
      version-directive_test.js  --> version directive tests
      interpolate-filter.js      --> custom interpolation filter
      interpolate-filter_test.js --> interpolate filter tests
  view1/                --> the view1 view template and logic
    view1.html            --> the partial template
    view1.js              --> the controller logic
    view1_test.js         --> tests of the controller
  view2/                --> the view2 view template and logic
    view2.html            --> the partial template
    view2.js              --> the controller logic
    view2_test.js         --> tests of the controller
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```

[angularjs]: https://angularjs.org/
[bower]: http://bower.io/
[git]: https://git-scm.com/
[http-server]: https://github.com/indexzero/http-server
[jasmine]: https://jasmine.github.io/
[jdk]: https://wikipedia.org/wiki/Java_Development_Kit
[jdk-download]: http://www.oracle.com/technetwork/java/javase/downloads
[karma]: https://karma-runner.github.io/
[local-app-url]: http://localhost:8000/index.html
[node]: https://nodejs.org/
[npm]: https://www.npmjs.org/
[protractor]: http://www.protractortest.org/
[selenium]: http://docs.seleniumhq.org/
[travis]: https://travis-ci.org/
[travis-docs]: https://docs.travis-ci.com/user/getting-started
