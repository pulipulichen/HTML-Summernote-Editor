$(document).ready(function() {
  $('#copyTEXT').click(() => {
    let markdown = getMarkdown()

    let text = markdown
    console.log(text)
    while (text.indexOf('\n\n') > -1) {
      text = text.replace(/\n\n/g, '\n')
    }
    while (text.indexOf('\\[') > -1) {
      text = text.replace(/\\\[/g, '[')
    }
    while (text.indexOf('\\]') > -1) {
      text = text.replace(/\\\]/g, ']')
    }
    text = text.replace(/\*   /g, '\t')
    text = text.replace(/    /g, '\t')

    ClipboardUtils.copyPlainString(text)
  })
})