import shallowEqual from '../shallowEqual';
import { toObj } from "./test-utils";
import { expect } from 'chai';

describe('shallowEqual', () => {
    describe('true positives', function() {

        it('should return true on objects with primitives', () => {
            expect(shallowEqual(toObj("one", "two"), toObj("one", "two"))).to.be.true;
        });

        it('should return true on shallow-ly equal objects', () => {
            let obj = toObj("one", "two", ["three", "four"], {"five": "six"});
            expect(shallowEqual(obj, {...obj})).to.be.true;
        });

        it('should return true on shallow-ly equal mutated objects', () => {
            let obj = toObj("one", "two", ["three", "four"], {"five": "six"});
            let obj2 = {...obj};
            obj2.d.five = "seven";
            expect(shallowEqual(obj, obj2)).to.be.true;
        });
    });

    describe('true negatives', function() {
        // TODO
    });
});