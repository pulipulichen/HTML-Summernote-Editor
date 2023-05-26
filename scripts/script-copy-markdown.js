turndownService = false
$(document).ready(function() {
  $('#copyMarkdown').click(() => {
    ClipboardUtils.copyPlainString(getMarkdown())
  })
})

function getMarkdown() {
  if (!turndownService) {
    turndownService = new TurndownService()
  }

  let markdown = turndownService.turndown(getHTML())

  return markdown
}