# Vieux example with Vanilla.js

This project implements an example chat application with Vieux architecture. It demonstrates how a complex, stateful application should be built.

## Install

```
$ git clone --recursive git@github.com:vieuxjs/example-chat-vanilla.git
$ cd example-chat-vanilla
$ npm install
```

Make sure you have gulp installed:
```
$ sudo npm install -g gulp
```

Now you are ready to run the project. After you execute this command, the project will start automatically on your browser.
```
$ gulp
```

## Development

This project provides a development web server that listens on port 8000.

Run the default task via `gulp` and the project will be ready for development and inspection. Source files are symlinked, and the server watches for file changes with live reloading, so any change you make to the files under `src` folder will cause an automatic reload.

## Production builds

When you are satisfied with development and want to make a production build in order to deploy the app, just run the `bundle` task via `gulp bundle`. This compiles your source code with Closure Compiler in advanced mode and concats and minifies your CSS files producing one file for all your JavaScript codes and one CSS file for all your styles. This task then suffixes these files to evade browser caches. Finally, it minifies the output HTML.

The live-reloading watch server can also be activated for these kind of builds via `gulp serve`.

Happy coding!
