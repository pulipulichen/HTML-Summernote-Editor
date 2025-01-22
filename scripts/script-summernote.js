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
          ['table', ['table', 'formatTable']],
          ['font', ['fontname']],
          ['insert', ['link', 'picture', 'video', 'doc']],
          ['help', ['help']]
        ],
        buttons: {
          formatTable: function() {
                var ui = $.summernote.ui;
                var button = ui.button({
                    contents: '<i class="fa fa-font"></i> Format Table',
                    tooltip: 'Format Table',
                    click: function() {
                        formatTable()
                    }
                });
                return button.render();
            }
        }
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

function formatTable() {
  // Select the entire editor content and change its color
  // $('#summernote').summernote('formatPara', {
  //   style: 'color: red;'
  // });
  let $html = $(`<div>${getHTML()}</div>`);
  $html.find(`table`).appendTo($html)

  $html.children(`:not(table)`).remove()
  
  // $html.find('google-sheets-html-origin').each(function() {
  //   // Replace the <google-sheets-html-origin> with its children
  //   $(this).replaceWith($(this).children());
  // });
  // // $html.find('google-sheets-html-origin').remove()

  $html.find('colgroup').remove()
  $html.find('[xmlns]').removeAttr('xmlns')
  $html.find('[cellspacing]').removeAttr('cellspacing')
  $html.find('[cellpadding]').removeAttr('cellpadding')
  $html.find('table').each(function() {
      // Remove all attributes from the table element
      var attributes = this.attributes;
      for (var i = attributes.length - 1; i >= 0; i--) {
          $(this).removeAttr(attributes[i].name);
      }

      let $table = $(this)
      if ($table.children('thead').length === 0) {
        $table.prepend(`<thead></thead>`)
      }
      if ($table.children('tbody').length === 0) {
        $table.append(`<tbody></tbody>`)
      }

      let $thead = $table.children('thead')
      let $tbody = $table.children('tbody')
      if ($table.children('tr').length > 0) {
        $table.children('tr').appendTo($tbody)
      }

      if ($thead.children().length === 0 && $tbody.children().length > 1) {
        // console.log('ok')
        // $thead.html($tbody.html)
        $tbody.children(':eq(0)').appendTo($thead)
        // $thead.children().eq(0).appendTo($tbody)
      }

      $thead.find('td').each(function() {
          // Replace <td> with <th> and retain content and attributes
          var th = $('<th>').html($(this).html());
          $.each(this.attributes, function() {
              th.attr(this.name, this.value);
          });
          $(this).replaceWith(th);
      });
  });

  // dir="ltr" border="1" data-sheets-root="1" data-sheets-baot="1"
  $html.find('[style]').removeAttr('style')
  $html.find('[width]').removeAttr('width')

  $html.find('th,td').each(function () {
    let $this = $(this)

    while ($this.children().length === 1 && $this.contents().length === 1) {
      $this.html($this.children().html())
    }
  })

  // console.log($html.html())
  $('#summernote').summernote('code', $html.html());
  
}

});