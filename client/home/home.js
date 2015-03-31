Template.home.onCreated(function() {
  this.subscribe('allPhotos');
  Session.set('uploading', undefined);
})

Template.home.onRendered(function() {

  // Assign our button to be a browse button with resumable.
  Photos.resumable.assignBrowse($('#upload-file'));

  // When you select a file this event fires at which point we upload the file.
  Photos.resumable.on('fileAdded', function(file) {
    uploadFile(file);
  });

  // Another resumable event. Fires when the file has successfully been uploaded.
  // We're just using it to hide our uploading indicator.
  Photos.resumable.on('fileSuccess', function(file) {
    Session.set('uploading', undefined);
  });

  // Another resumable event. Fires when the file upload encounters an error.
  // Used to hide uploading indicator and inform user of an error.
  Photos.resumable.on('fileError', function(file) {
    console.warn("Error uploading", file.uniqueIdentifier);
    Session.set('uploading', undefined);
  });

});

Template.home.helpers({
  // Helper that allows us to loop over our images.
  photos: function() {
    return Photos.find();
  },

  // Generates the proper path for the image.
  link: function() {
    return Photos.baseURL + "/" + this.md5
  },

  // Helper that will let the user know if an image is currently uploading
  uploading: function() {
    return Session.get('uploading');
  },

  // Check if the content type is that of an image. If so then we can show a preview.
  isImage: function() {
    var types = ['image/jpeg','image/png','image/gif', 'image/tiff'];
    return _.contains(types, this.contentType);
  }
});

Template.home.events({
  // Functionality to delete an image.
  'click [data-action=delete]': function(e, instance) {
    e.preventDefault();
    Photos.remove({_id: this._id});
  }
});

// METHODS
var uploadFile = function(file) {
  Session.set('uploading', true);

  // Creates a document in the collection that we can upload the image to
  Photos.insert({
    _id: file.uniqueIdentifier,
    filename: file.fileName,
    contentType: file.file.type
  }, function(err, _id) {
    if (err) {
      console.warn('File creation failed', err);
      return;
    }
    // Once the document has been created we can upload our file information.
    Photos.resumable.upload();
  });
}
