$(document).ready(function() {
  $('#summernote').summernote({
    //height: 'calc(100vh - 2rem)',                 // set editor height
        //placeholder: 'Hello stand alone ui',
        tabsize: 2,
        height: 120,
        toolbar: [
          ['view', ['codeview', 'fullscreen', 'help']]
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['font', ['fontname']],
          ['insert', ['link', 'picture', 'video', 'doc']],
          ['misc', ['codeview', 'fullscreen']],
          ['help', ['help']]
        ],

    });

  $('#summernote').on('summernote.change', function(we, contents, $editable) {
    //console.log(contents);

    localStorage.setItem('summernote.code', contents)

    let replace= contents.replaceAll(/<\/?[^>]+(>|$)/gi, "").trim()
    if (replace === '') {
      replace = 'Summernote'
    }

    document.title = replace
  });

let code = localStorage.getItem('summernote.code')
if (code) {
  $('#summernote').summernote('code', code)

  let replace = code.replaceAll(/<\/?[^>]+(>|$)/gi, "").trim()
  if (replace === '') {
    replace = 'Summernote'
  }

  document.title = replace
}

});