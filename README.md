[![Build status](https://api.travis-ci.org/padcom/react-example-02.svg)](https://travis-ci.org/padcom/react-example-02)

## React/Redux/Webpack/Mocha example

This example shows how to configure a full working solution using webpack, React and Redux with tests, developer setup with hot reloading and a fully working production build.

### Motivation

Many frameworks out in the wild have some sort of command-line utility that allows for quick and easy setup of projects and their maintenance. For example [Rails](http://rails.org), [Grails](http://www.grails.org), [Ember](http://emberjs.org) have a fully working solution like that. Unfortunately there is no such thing for React+Redux on Webpack yet. In my opinion on one end it leads to harder project setup but on the other hand allows for experimentation and tune-up that is out of reach for mere mortals when using something like ember-cli (not to mention that thing's sooo slooooow!).

### Building blocks

The solution is based on Webpack. The configuration file is split into 2:

  - webpack.config.js - default set of configuration options
  - webpack-production.config.js - overrides for production builds

Having those two separated allows to easily running commands from npm scripts.

[React](https://facebook.github.io/react/) is used to represent application state.

[Redux](http://redux.js.org/) is used to maintain the application state.

[Karma](https://karma-runner.github.io), [MochaJS](http://mochajs.org), [Chai](http://chaijs.com) and [Enzyme](http://airbnb.io/enzyme) are used for testing.

[Babel](https://babeljs.io/) is used to transpile code from ES6 to ES5 (with es2015 and react presets)

[ESLint](http://eslint.org/) is used to keep you organized in the wilderness of JavaScript capabilities.

### Available commands

The following commands are available:

#### npm start

Starts development server listening on port 3000 with hot reloading.

#### npm run test:watch

Starts webpack-dev-server in watch mode running tests. It is clever enough to know which modules have ties to which tests and when the sources change re-runs the dependant tests automatically.

Open http://localhost:3001 to run tests.

#### npm test

Runs all tests. It is intended for use in CI environment. The configured reporter here is junit to allow for easy integration with CI servers like Bamboo and Jenkins.

#### npm lint

Executes static code analysis. Designed to be part of the CI environment. ESLint is hooked up as a preprocessor for all `.js` files in the project when running
`npm start` so you'll see all the validation messages in the console while developing your app.

#### npm run build

Builds a production version of the application.

### Project structure

Organization of the project is very similar in many aspects to that of a Java Maven project.
This means that all main project source files are inside of `src/main` folder, all tests are located
underneath `src/test`, all output goes to `target` (not `dist` as it usually is with Node projects).

There are 2 main entry points in the build:

  - `src/main/index.js` - entry point for the application
  - `src/main/index.html` - entry point for the browser

Both entry points undergo some sort of processing. `index.js` is compiled using Babel ES6 transpiler. `index.html` gets injected with the transpiled version of `index.js`.

### Babel configuration

The Babel transpiler has been equipped with the obvious `es2015` and `react` presets. However, in the
interest of making things easier to read and write the [react-html-attrs](https://github.com/insin/babel-plugin-react-html-attrs) plugin has been added so that
`class` and `for` are not banned from JSX.

### CSS/Less

The CSS/Less loader has been configured so that styles are modules that can be imported into the sources and then used. The biggest advantage of this approach is human-readable code and scoped CSS (no more need for BEM or any other naming convention!). See `src/main/components/Input.js & Input.less` for example. This [blog post](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284#.ns3j3xts2) explains in details the behavior. Just note that with the addition of [`module`](https://github.com/css-modules/css-modules) option for `css-loader` all classes are local by default (postcss-local-scope not needed!!).

You can always create globally scoped classes. To do that define then in `:global { ... }` scope. See `src/main/components/App.less` for example.

A customized version of [classnames-loader](https://www.npmjs.com/package/classnames-loader) has been implemented. In the original version (see link) all you can do is concatenate the classes. In this extended version you can do that too but also you can access individual classes as if they were regular modules. See `src/main/components/Input.js` to see it in action.

### ESLint

There are 2 special configuration options that are key for this project.

  - `react/prop-types` is disabled (I don't care about those - yet)
  - `react/no-unknown-property` is tweaked because we're using [react-html-attrs](https://github.com/insin/babel-plugin-react-html-attrs) Babel plugin.

That additional configuration is done in `.eslintrc` in the root folder and can be further extended as needed.

### Test environment

There are 2 things to know about the test environment:

  - chai's `expect`, enzyme's `mount`, `shallow` and `render` methods as well as the `React` object are available globally
  - a preconfigured `mockStore` ([redux-mock-store](https://github.com/arnaudbenard/redux-mock-store)) is also available globally (see `src/test/components/Title.test.js`)

The entire setup of test environment happens in `src/test/setup.js` and can serve as extension point for
further enhancements.

### Application structure - Redux store and reducers

The application's store is created in `src/main/store.js`. In there you'll find a placeholder for middleware (none installed by default), a mixin for use with [ReduxDevTools](https://github.com/gaearon/redux-devtools) and a reducer created from exports from `src/main/reducers.js`. I have choosen this approach to have a clear point where I add new reducers and a clear naming convention for that as well.

Reducers and actions are kept in the same file as per Dan Abramov's suggestion to keep things that change together close. Each file in the `src/main/state` folder represents one entry in the root reducer and actions that modify it. I have choosen the approach to export `reducer` by name and `actions` by default so that importing them in `src/main/reducers.js` is straightforward and plays nice with copy-pasted code. Actions on the other hand can have different names depending on where they are included (for example just `actions` if that's all you care about or `SomeActions` and `OtherActions` if you'd like to include actions for more than just one part of the store).

One notable addition: instead of using a complex `switch/case` statement I have opted to use a function that calls the appropriate subreducers based on the action provided. That functionality is provided by [redux-action-reducer-mapper](https://www.npmjs.com/package/redux-action-reducer-mapper). That way the complexity of the inner-workings of the reducer is zero and no tests to cover that piece are necessary. That does not mean you should not tests your reducers! You just don't have to have a tests that checks if all paths through the `swich/case` are covered. Had that not been the case the ESLint rule for max cyclomatic code complexity of 5 would have easily been violated.

### Components and Provider

All components in this basic setup are stateless and declared as pure functions. To connect them to Redux' store I used the [react-redux](https://github.com/reactjs/react-redux) package. Please see [this](https://egghead.io/lessons/javascript-redux-passing-the-store-down-with-provider-from-react-redux) and the next lessons on [egghead.io](http://egghead.io). The only deviation from what's in that tutorial is that I didn't explicitly declare the `mapStateToProps` and `mapDispatchToProps` functions inlining them close to the call to `connect`.

### Extension points

The project should allow for easy extension and tweaking. To achieve that all configuration points have extensive documentation in comments. For the sake of completeness here are the few honorable mentions:

  - extending default build configuration to include additional types of files - `webpack.config.js/module/loaders` (useful when you'd like to load for example JSON files straight from the project's sources)
  - extending the environment for tests - `src/test/setup.js` (useful for adding new globally available identifiers)
  - making eslint like what you added in previous point - `src/test/.eslintrc - globals`
  - adding new actions and reducers - create a new file in `src/main/state` with the name of the new key in global state scope, export object with actions by default and `reducer` as a named export. Add the `reducer` named export to `src/main/reducers.js` and use default export with actions as you see fit.
  - adding a new component - create a new file in `src/main/components` (try to keep it stateless!)
