# Notecards all the way down

[![Build Status](https://img.shields.io/travis/ckelner/notecards-all-the-way-down.svg?style=flat-square)](https://travis-ci.org/ckelner/notecards-all-the-way-down)
[![Coverage Status](https://img.shields.io/coveralls/ckelner/notecards-all-the-way-down.svg?style=flat-square)](https://coveralls.io/github/ckelner/notecards-all-the-way-down?branch=master)

A recursive notecard app.  Incomplete - Still a _**WIP**_

## Prototype

A hand-rolled vanilla JS prototype was built for proof of concept purposes. A live demo can be found by [clicking
here](http://notecardsallthewaydown.s3-website-us-east-1.amazonaws.com/). The
code for the prototype can be found in the [prototype](./prototype) directory.

## Tools/Tech Used

- [Node](https://nodejs.org/en/) for runtime
- [Yarn](https://yarnpkg.com/en/) for package management
- [ES6](http://es6-features.org/)
- [Babel](https://babeljs.io/) for ES6 to ES5
- [ESLint](http://eslint.org/) for linting
  - [AirBnB's ESLint Config](https://www.npmjs.com/package/eslint-config-airbnb)
- [Flow](https://flowtype.org/) for static type checking
- [Jest](https://facebook.github.io/jest/) for testing
- [Husky](https://github.com/typicode/husky) for precommit/push hooks
- [Express](http://expressjs.com/) for web framework
- [Nodemon](https://nodemon.io/) to watch for file changes and restart node (dev)
- [Webpack](https://webpack.js.org/) for bundling all modules
- [React](https://facebook.github.io/react/) for UI
- [Webpack: Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) for switching modules during dev
- [ImmutableJS](https://facebook.github.io/immutable-js/) for managing immutable collections
- [Redux](http://redux.js.org/) for managing application state
- [React-Redux](https://github.com/reactjs/react-redux) React bindings for Redux
- [React Router](https://reacttraining.com/react-router/) for navigating between pages
- [React Helmet](https://github.com/nfl/react-helmet) for injecting content in `<head>`
- [Socket.IO](https://github.com/socketio/socket.io) for using WebSockets
- [Bootstrap](http://getbootstrap.com/) for UI lookey-loos
- [JSS](http://cssinjs.org/) for a CSS-in-JS library to write your styles in JavaScript and inject them into your app.
- [Travis CI](https://travis-ci.org) for testing
- [Coveralls](https://coveralls.io/) for test history & stats
- [Heroku](http://heroku.com) for hosting
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) for working with heroku locally

## Dev Setup

- Follow [Nodejs.org](https://nodejs.org/en/) instructions to install Node, or
use a version manager like [NVM](https://github.com/creationix/nvm).
- Follow [Yarnpkg.com](https://yarnpkg.com/en/) install instructions.

## Background

A friend (`friend-one`) wanted this app.  I decided I wanted to do it, but not put much effort into it.

`friend-one`:
> actually i have an idea for a webapp but i don’t know if anyone but me would ever use it
>
> i have a raging hardon for hierarchical lists that can nest at n layers. i live and breathe workflowy, which is basically that - bullets with infinite levels
>
> but doing that with notecards would be nice
>
> like, you have a notecard with a title, but you can “zoom in” on that notecard to see all the notecards within it
>
> kind of like in Snow Crash, how they used things that looked like business cards to carry all sorts of data

`friend-two`:
> So you have a dashboard filled with notecards, and you can click to edit them, and the notecard size grows to contain the list?
>
> Can you link notecards?
>
> Pretty much my life run by is a series of indented items. e.g.:

```
PR for deprecations
    done
git-crypt
    install git-crypt on staging1
        done
    generate keys for role account
        done
        imported on staging1
    add to authorship
        done
    whitelist test file
        done
    encrypt
        automatic
    push
    done
leads creation failure
merge master into rails-integration
    done
Liz
    reached out
```

> The top level is what I need to do. Indented are updates, or prerequisite tasks

`friend-one`:
> pretty much same for me

`friend-two`:
> I live on the edge by keeping it in a scratch buffer, and never write it to disk

`friend-one`:
> yes, each notecard can open up to become a new dashboard with its own notecards, with references to associated cards at the same or other levels
>
> lol you are brave

`friend-two`:
> Notecards all the way down?

`friend-one`:
> yes
>
> i think my workflowy has something like 15,000 bulleted items in it now
>
> i use it for literally everything
>
> it’s just not great for visual things
>
> a fractal corkboard would make my life 10x better

`friend-two`:
> You want Pintrest?
>
> Pintrest: Recursive Edition?

`friend-one`:
> well, something with more organization than pinterest
>
> so yeah pinterest with recursion would be good
>
> well, except that pinterest requires some media to base a post on
>
> so pinterest for plaintext + media

`friend-two`:
> Can you make some wireframes? Could be fun
>
> Maybe I’ll give React.JS a spin

`friend-one`:
> yeah give me a few to cook the idea and draw some up

`friend-two`:
> Have you used Balsamiq ?

`friend-one`:
> only when making a bread plate :V
>
> brb work
>
> uploaded an image: notecardwf.png
![wireframe](images/notecardwf.png)

`friend-two`:
> > brb work

> Classic
>
> Slack is the top priority. Work must come second

`friend-one`:
> anyway, the idea is, if a notecard has child items, you’d see a preview of those items as a list (like the groceries). you can create child notecards going either way - if you are looking at the card itself, you add line items to the card using a traditional list view, but each of those line items also spawns a card that has the same contents, so you can ‘unpack’ the list into individual cards, and carry on creating items on those cards as child items

`friend-two`:
> So given a list:

```
* Item 1
  * Subitem 1
```

> Item 1 is a notecard, and you can see Subitem 1 as a list item, but clicking “Subitem 1” expands a new notecard for Subitem 1?
>
> And Subitem 1 can have its own subitems, and so on?
>
> When do subitems become notecards? Automatically?

`friend-one`:
> yes
>
> everything is a notecard and a list item

`friend-three`:
> Everything is notecards. That is your design doc

`friend-one`:
> ^
>
> get to work, we’re done
>
> lmk when you’re done and i’ll start using it

`friend-three`:
> THEN we can slap ads on it, get some SEO, and retire. (Notice how I said we. I summarized the design doc for you)

`friend-one`:
> that’s how this team works, right? i’m the golden goose, friend-one and kelner do the work, and friend-three is middle management

`me`
> Hey this almost sounds like real life, just got voluntold to work on something I know nothing about and there is a one sentence design doc
