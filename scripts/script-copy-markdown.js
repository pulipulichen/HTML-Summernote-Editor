turndownService = false
$(document).ready(function() {
  $('#copyMarkdown').click(() => {
    ClipboardUtils.copyPlainString(getMarkdown())
  })
})

function getMarkdown() {
  if (!turndownService) {
    turndownService = new TurndownService()

    // 加入 table 支援
    turndownService.addRule('table', {
      filter: ['table'],
      replacement: function (content, node) {
        let table = '';
        const rows = Array.from(node.querySelectorAll('tr'));
        rows.forEach((row, rowIndex) => {
          const cells = Array.from(row.children);
          const rowText = cells.map(cell => cell.textContent.trim()).join(' | ');
          table += `| ${rowText} |\n`;
          if (rowIndex === 0) {
            table += `| ${cells.map(() => '---').join(' | ')} |\n`;
          }
        });
        return '\n' + table + '\n';
      }
    });
  }

  let markdown = turndownService.turndown(getHTML())

  return markdown
}