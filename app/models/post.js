var models = require('./models'),
	Schema = models.Schema;

var postSchema = Schema({
	message : 'string',	
	user : {
		type : Schema.Types.ObjectId,
		ref  : 'users'
	}
});

var Post = models.model('posts', postSchema);

module.exports = Post;