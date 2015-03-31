Photos = new FileCollection('photos', {
  resumable: true, //Enables the resumable.js API on the client
  baseURL: '/photos',
  http: [{
    method: 'get',
    path: '/:md5',
    lookup: function(params, query) {
      return { md5: params.md5 }
    }
  }]
});

// Poor example of allow/deny rules. Allows the client to do anything to the collection without validation.
if (Meteor.isServer) {
  Photos.allow({
    insert: function(userId, file) {
      return true;
    },
    remove: function(userId, file) {
      return true;
    },
    read: function(userId, file) {
      return true;
    },
    write: function(userId, file) {
      return true;
    }
  });
}
