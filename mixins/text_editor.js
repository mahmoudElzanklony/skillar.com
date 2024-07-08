export default{
  mounted(){
    for (let editor of document.querySelectorAll('#__nuxt .editor')) {
      setTimeout(()=>{
        ClassicEditor
          .create(editor, {
            removePlugins: ['CKFinderUploadAdapter', 'CKFinder','EasyImage', 'Image' , 'ImageCaption','ImageUpload','ImageStyle','ImageToolbar'/*'Link'*/,
              /* , 'ImageToolbar',
              'ImageUpload', 'MediaEmbed'*/],
          })
          .catch(error => {
            console.error(error);
          });
      },100)

    }
  }
}


