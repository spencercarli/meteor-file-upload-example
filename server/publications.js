Meteor.publish('allPhotos', function() {
  return Photos.find();
});
