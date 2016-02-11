import shallowEqual from './shallowEqual';

export default function pureStateless(statelessComponent) {

    let lastProps, lastContext,
        savedResult, savedException;

    return function (props, context) {
        let shouldUpdate = !shallowEqual(props, lastProps) || !shallowEqual(context, lastContext);

        if (shouldUpdate) {
          lastProps = props;
          lastContext = context;

          savedResult = undefined;
          savedException = undefined;

          try {
            savedResult = statelessComponent.apply(this, arguments);
          } catch(e) {
            savedException = e;
          }
        }

        if (savedException !== undefined) {
          throw savedException;
        }

        return savedResult;
    };
}