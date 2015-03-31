Template.home.onRendered(function() {
  Photos.resumable.assignBrowse($('#upload-file'));

  Photos.resumable.on('fileAdded', function(file) {
    uploadFile(file);
  });

  this.autorun(function() {
    Meteor.subscribe('allPhotos');
  });


});

Template.home.helpers({
  photos: function() {
    return Photos.find();
  },

  link: function() {
    return Photos.baseURL + "/" + this.md5
  }
});

uploadFile = function(file) {
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
