# react-pure-render-utils

[![NPM Version](http://img.shields.io/npm/v/react-pure-render-utils.svg)](https://www.npmjs.org/package/react-pure-render-utils)
[![Build Status](https://travis-ci.org/liady/react-pure-render-utils.svg?branch=master)](https://travis-ci.org/liady/react-pure-render-utils)

A function, a component, decorators and a mixin for React pure rendering.

> This module is **directly based on** gaeron's [react-pure-render](https://github.com/gaearon/react-pure-render), adding decorators, tests and a high-order function.<br/>
> All rights for the original module is [gaeron](http://github.com/gaearon)'s.

This module provides *exactly* the same functionality as [PureRenderMixin](https://facebook.github.io/react/docs/pure-render-mixin.html), but as a standalone module and in three different flavors.

### Usage

#### Installing

```sh
npm install react-pure-render-utils
```

#### Function

Requires ES7 [class property transform](https://gist.github.com/jeffmo/054df782c05639da2adb) to be enabled by putting `{ "stage": 0 }` in your [.babelrc](https://babeljs.io/docs/usage/babelrc/).

```js
import shouldPureComponentUpdate from 'react-pure-render-utils/function';

export default class Button extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() { }
}
```

#### Component

Inheritance is not very cool but it doesn't hurt a lot if it's just for the sake of this single method. If you don't want to use stage 0 transforms, you can use a base class instead:

```js
import PureComponent from 'react-pure-render-utils/component';

export default class Button extends PureComponent {
  render() { }
}
```

#### Decorators

This is based directly on taion's [pull request](https://github.com/gaearon/react-pure-render/pull/4) to the original repo.
This adds two decorators - `pureClass` and `pureMethod`:

```js
import { Component } from 'react';
import { pureClass } from 'react-pure-render-utils/decorators';

@pureClass
export default class Button extends Component {
  render() { }
}
```

```js
import { Component } from 'react';
import { pureMethod } from 'react-pure-render-utils/decorators';

export default class Button extends Component {
  
  @pureMethod
  calc() { 
    return someHeavyCalc(this.props);
  }

  render() { }
}
```

#### High-Order Function

In version 0.14, React introduced [stateless components](https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d#.zbvj2eye3).
This is a great way to write components as stateless "pure" functions. However, since they don't have lifecycle hooks, there is no way to enforce "pure render".<br/>
Using this you can wrap your component in a "purify" high-order function, in order to guarantee pure render.

```js
import pureStateless from 'react-pure-render-utils/high-order';

let Title = (props, context) => <div onClick={props.onClick}>{props.title}</div>

export default pureStateless(Title);
```

#### Mixin

If you're working with `createClass`-style components, use the mixin. It's exactly the same as [`React.addons.PureRenderMixin`](https://facebook.github.io/react/docs/pure-render-mixin.html).

```js
var React = require('react');
var PureMixin = require('react-pure-render-utils/mixin');

var Button = React.createClass({
  mixins: [PureMixin],

  render: function () { }
});

module.exports = Button;
```

#### shallowEqual

Sometimes `shallowEqual` is all you need. It's bad to reach out into React internals, so this library exposes exactly the same `shallowEqual` you already know and love from React.

```js
import shallowEqual from 'react-pure-render-utils/shallowEqual';
console.log(shallowEqual({ x: 42 }, { x: 42 });
```

### Known Issues

If a component in the middle of your rendering chain has pure rendering, but some nested component relies on a `context` change up the tree, **the nested component won't learn about `context` change and won't update**. This is a [known React issue](https://github.com/facebook/react/issues/2517) that exists because `context` is not a documented feature and is not finished. However some React libraries already rely on `context`, for example, [React Router](https://github.com/rackt/react-router). My suggestion for now is to use pure components in apps relying on such libraries very carefully, and only use pure rendering for leaf-ish components that are known *not* to rely on any parent `context`.

### Further Reading

* [PureRenderMixin](https://facebook.github.io/react/docs/pure-render-mixin.html)
* [Advanced Performance](https://facebook.github.io/react/docs/advanced-performance.html)

### License

MIT
