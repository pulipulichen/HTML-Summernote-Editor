$(document).ready(function() {
  $('#copyHTML').click(() => {
    ClipboardUtils.copyPlainString(getHTML ())
  })
})

var snowturnConverter

function getHTML () {
  let content = $('#summernote').summernote('code')

  let $content = $(content)
  if ($content.find('span[style="white-space: pre-wrap;"]').length === 1) {
    let markdown = $content.find('span[style="white-space: pre-wrap;"]').text()

    if (!snowturnConverter) {
      snowturnConverter = new showdown.Converter();
    }
    content = snowturnConverter.makeHtml(markdown);
  }

  return content
}