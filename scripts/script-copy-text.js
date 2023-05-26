$(document).ready(function() {
  $('#copyTEXT').click(() => {
    let markdown = getMarkdown()

    let text = markdown
    while (text.indexOf('\n\n') > -1) {
      text = text.replace(/\n\n/g, '\n')
    }
    text = text.replace(/\*   /g, '\t')
    text = text.replace(/    /g, '\t')

    ClipboardUtils.copyPlainString(text)
  })
})