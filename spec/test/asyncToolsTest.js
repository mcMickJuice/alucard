var asyncTools = require('../../src/utility/asyncTools');

describe('asyncTools', () => {
    //describe('DelayPromiseAction', () => {
    //    var delay = asyncTools.delayPromiseAction;

    //
    //    it('should call callback after x amount of seconds', done => {
    //        var spy = jasmine.createSpy('spy').and.returnValue(Q());
    //        var msAmount = 1000;
    //
    //        delay(msAmount, _ => spy()).catch(err => console.log(err.stack));
    //        jasmine.clock().tick(msAmount + 1);
    //        expect(spy).toHaveBeenCalled();
    //        done();
    //    })
    //
    //    it('should pass arguments from original action to thenned function', () => {
    //        var val = 'this special val';
    //        var spy = jasmine.createSpy('spy').and.returnValue(Q(val));
    //        var msAmount = 1000;
    //
    //        delay(msAmount, _ => spy())
    //            .then(v => {
    //                expect(v).toEqual(val);
    //            })
    //            .catch(err => console.log(err.stack))
    //        jasmine.clock().tick(msAmount + 1);
    //TODO omg fix this
    //    })
    //})

    describe('delay', () => {
        beforeEach(() => jasmine.clock().install());
        afterEach(() => jasmine.clock().uninstall());

        console.log('this is async tools',asyncTools)
        it('should delay a call for x number of seconds', () => {
            var delayTools = asyncTools.build(setTimeout);

            var spy = jasmine.createSpy('spy');
            var msAmount = 1000;

            delayTools.delay(msAmount)
                .then(() => {
                console.log('in callback!');
                spy();
            });
            expect(spy).not.toHaveBeenCalled();
            jasmine.clock().tick(2000);
            expect(spy).toHaveBeenCalled();
        });

        //it('should pass along arguments', () => {
        //
        //});
    })

});

