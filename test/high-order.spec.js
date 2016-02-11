import pureStateless from '../high-order';
import { toObj } from "./test-utils";
import { expect } from 'chai';

describe('pureStateless', () => {
    describe('true positives', function() {

        it('should run once on shallow-ly equal props', () => {
            let props = toObj("one", "two", ["three", "four"], {"five": "six"});
            let newProps = {...props};
            let fn = (props) => ({"first": props.a + props.b, "second" : props.c + props.d});
            let elevated = pureStateless(fn);
            expect(elevated(props)).to.be.equal(elevated(newProps));
        });
    });

    describe('true negatives', function() {
        it('should run again on shallow-ly equal props and different context', () => {
            let props = toObj("one", "two", ["three", "four"], {"five": "six"});
            let newProps = {...props};
            let context = toObj("one", "two", ["three", "four"], {"five": "six"});
            let newContext = {...context, c: ["three", "four"]};
            let fn = (props, context) => ({"first": props.a + context.b, "second" : props.b + context.b});
            let elevated = pureStateless(fn);
            expect(elevated(props, context)).to.not.be.equal(elevated(newProps, newContext));
        });
    });
})