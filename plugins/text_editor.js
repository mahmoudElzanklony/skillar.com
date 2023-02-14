// text editor
for(let editor of document.querySelectorAll( '.editor' )){
  ClassicEditor
    .create( editor, {
      removePlugins: ['CKFinderUploadAdapter', 'CKFinder','Link',
        'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar',
        'ImageUpload', 'MediaEmbed'],
    })
    .catch( error => {
      console.error( error );
    } );

}

