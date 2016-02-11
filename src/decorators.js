import shouldPureComponentUpdate from './function';

export function pureClass(Component) {
  const componentName = Component.displayName || Component.name || 'component';

  if (Component.prototype === undefined) {
    throw new Error(`${componentName} does not have a prototype`);
  }

  if (Component.prototype.shouldComponentUpdate !== undefined) {
    throw new Error(`${componentName} already has shouldComponentUpdate`);
  }

  Component.prototype.shouldComponentUpdate = shouldPureComponentUpdate;
}

export function pureMethod(target, name, descriptor) {
  let lastProps, lastState,
      savedResult, savedException;

  const oldValue = descriptor.value;
  descriptor.value = function () {
    // shouldPureComponentUpdate is symmetric, so can re-use it here.
    if (shouldPureComponentUpdate.call(this, lastProps, lastState)) {
      lastProps = this.props;
      lastState = this.state;

      savedResult = undefined;
      savedException = undefined;

      try {
        savedResult = oldValue.apply(this, arguments);
      } catch(e) {
        savedException = e;
      }
    }

    if (savedException !== undefined) {
      throw savedException;
    }

    return savedResult;
  };

  return descriptor;
}
