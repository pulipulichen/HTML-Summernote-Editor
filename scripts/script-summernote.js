$(document).ready(function() {
  $('#summernote').summernote({
    //height: 'calc(100vh - 2rem)',                 // set editor height
        //placeholder: 'Hello stand alone ui',
        tabsize: 2,
        height: 120,
        toolbar: [
          // ['misc', ['codeview', 'fullscreen']],
          ['view', ['codeview', 'fullscreen']],
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['font', ['fontname']],
          ['insert', ['link', 'picture', 'video', 'doc']],
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

$('#summernote').on('summernote.paste', function(fn, e) {
  // console.log('ok')
  // Check if the pasted content looks like HTML code
  if (!e) {
    return false
  }
  if (e.originalEvent) {
    e = e.originalEvent
  }
  if (!e.clipboardData) {
    return false
  }
  

  const pastedContent = (e.originalEvent || e).clipboardData.getData('text/plain');
  // console.log(pastedContent)
  if (isHTML(pastedContent)) {
    e.preventDefault()
    e.stopPropagation()

    // Set Summernote to code view and insert the HTML code
    // $('#summernote').summernote('codeview.activate');
    $('#summernote').summernote('code', pastedContent);

    // Restore cursor position to the end of the inserted code
    // setTimeout(function() {
    //   $('#summernote').summernote('restoreRange', savedRange);
    // }, 0);
    
    // Switch back to WYSIWYG mode after a brief delay
    // setTimeout(function() {
    //   $('#summernote').summernote('codeview.deactivate');
    // }, 100);
  }
});

function isHTML(content) {
  const htmlRegex = /<([A-Z][A-Z0-9]*)\b[^>]*>(.*?)<\/\1>/i;
  return htmlRegex.test(content);
}

});