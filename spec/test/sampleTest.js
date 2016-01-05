var rewire = require('rewire')
var subjectToTest = rewire('../../src/testFile')
var Q = require('q')


describe('hope this works', function() {
    var webClientSpy;
    beforeEach(function() {
        webClientSpy = jasmine.createSpy('webClient').and.returnValue(Q.when('hello!'))
        subjectToTest.__set__('webClient', {getRequestBody: webClientSpy});
    })

    it('should make call to webClient', function(done) {
        subjectToTest.getHtml('something')

        done();
        expect(webClientSpy.getRequestBody).toHaveBeenCalled();
    })

    it('should pass in url to webClient call', function(done){
        var url = 'something'
        subjectToTest.getHtml(url)

        done();
        expect(webClientSpy.getRequestBody).toHaveBeenCalledWith(url);
    })
})
