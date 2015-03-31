Photos = new FileCollection('photos', {
  resumable: true,
  baseURL: '/photos',
  http: [{
    method: 'get',
    path: '/:md5',
    lookup: function(params, query) {
      return { md5: params.md5 }
    }
  }]
});

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
