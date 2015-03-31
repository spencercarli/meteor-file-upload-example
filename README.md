# Meteor File Upload Demo
A demo made for Meteor night school to showcase a simple file upload implementation.

## Get Started

`git clone https://github.com/spencercarli/meteor-file-upload-example.git`

`cd meteor-file-upload-example && meteor`

## Packages used

[`vsivsi:file-collection`](https://github.com/vsivsi/meteor-file-collection)

## Notes/ Issues

- `Resumable.js` may cause a `404 (Not Found)` error in your console. This is expected and nothing to be concerned about.
- There seems to be an issue with uploading multiple times on a page without refreshing. Haven't looked into it yet. If you run into this either refresh the window or run `Photos.resumable.assignBrowse($('#upload-file'));` in your browser console.
- This is not a good example of proper allow/deny rules for a Meteor collection.
