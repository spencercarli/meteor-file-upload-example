Template.home.onCreated(function() {
  this.subscribe('allPhotos');
  Session.set('uploading', undefined);
})

Template.home.onRendered(function() {
  Photos.resumable.assignBrowse($('#upload-file'));

  Photos.resumable.on('fileAdded', function(file) {
    uploadFile(file);
  });

  Photos.resumable.on('fileSuccess', function(file) {
    Session.set('uploading', undefined);
  });

  Photos.resumable.on('fileError', function(file) {
    console.warn("Error uploading", file.uniqueIdentifier);
    Session.set('uploading', undefined);
  });

});

Template.home.helpers({
  photos: function() {
    return Photos.find();
  },

  link: function() {
    return Photos.baseURL + "/" + this.md5
  },

  uploading: function() {
    return Session.get('uploading');
  }
});

Template.home.events({
  'click [data-action=delete]': function(e, instance) {
    e.preventDefault();
    Photos.remove({_id: this._id});
  }
});

uploadFile = function(file) {
  Session.set('uploading', true);
  Photos.insert({
    _id: file.uniqueIdentifier,
    filename: file.fileName,
    contentType: file.file.type
  }, function(err, _id) {
    if (err) {
      console.warn('File creation failed', err);
      return;
    }
    Photos.resumable.upload();
  });
}
