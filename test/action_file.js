describe('Action: file', function(){
  var specHelper = require('../helpers/_specHelper.js').specHelper;
  var apiObj = {};
  var should = require("should");

  before(function(done){
    specHelper.prepare(0, function(api){ 
      apiObj = specHelper.cleanAPIObject(api);
      done();
    })
  });

  it('file: response is NOT json', function(done){
    specHelper.apiTest.get('/file/' + "someRandomFile", 0, {}, function(response){
      should.not.exist(response.body.error);
      done();
    });
  });

  it('file: 404 pages', function(done){
    specHelper.apiTest.get('/file/' + "someRandomFile", 0, {}, function(response){
      response.statusCode.should.equal(404)
      done();
    });
  });

  it('file: an HTML file', function(done){
    specHelper.apiTest.get('/file/' + "simple.html", 0, {}, function(response){
      response.statusCode.should.equal(200);
      response.body.should.equal('<h1>ActionHero</h1>\\nI am a flat file being served to you via the API from ./public/index.html<br />');
      done();
    });
  });

  it('file: ?filename should work like a path', function(done){
    specHelper.apiTest.get("/file/" + "?fileName=simple.html", 0, {}, function(response){
      response.statusCode.should.equal(200);
      response.body.should.equal('<h1>ActionHero</h1>\\nI am a flat file being served to you via the API from ./public/index.html<br />');
      done();
    });
  });

  it('file: index page should be served when requesting a path', function(done){
    specHelper.apiTest.get("/file/", 0, {}, function(response){
      response.statusCode.should.equal(200);
      response.body.should.be.a('string');
      done();
    });
  });

  it('file: sub paths should work', function(done){
    specHelper.apiTest.get("/file/" + "/logo/actionHero.png", 0, {}, function(response){
      response.statusCode.should.equal(200);
      done();
    });
  });

  it('file: binary files should also work', function(done){
    specHelper.apiTest.get("/file/" + "/logo/actionHero.png", 0, {}, function(response){
      response.statusCode.should.equal(200);
      response.body.length.should.be.within(136836, 136920);
      done();
    });
  });

});