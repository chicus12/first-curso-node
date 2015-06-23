var request = require('supertest');
var api = require('../server.js');
var host = api;

request = request(api);

describe('Modelo de Posts [/api/posts]', function() {

describe('POST', function() {
	it('deberia crear un mensaje', function(done) {
		var data = {
			"content": "hola",
			"user": "chicus12"
		};

		request
			.post('/api/posts')
			.set('Accept', 'application/json')
			.send(data)
			.expect(200)
			.expect('Content-Type', /application\/json/)
			.end(function(err, res) {
				var nota;

				var body = res.body;
				console.log('body', body);

				// Propiedades
				expect(body).to.have.property('content', 'hola');
				expect(body).to.have.property('user', 'chicus12');
				
				done(err);
			});
		});
	});

});