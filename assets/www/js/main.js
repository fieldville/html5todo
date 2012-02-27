$(function() {
  var todoList = $('.todoList');
  var todoInput = $('.todoInput');
  var storage = window.localStorage;

  function addTodo(text, isComplete) {
    var li = $('<li>');
    var spanText = $('<span class="text">').text(text);
    var checkbox = $('<input type="checkbox">');
    var spanRemove = $('<span class="remove">削除</span>');
    li.append(checkbox).append(spanText).append(spanRemove);

    if (isComplete) {
      li.addClass('complete');
      checkbox.attr('checked', true);
    }

    checkbox.click(function() {
      if ($(this).is(':checked')) {
        li.addClass('complete');
      }
      else {
        li.removeClass('complete');
      }
      updateStorage();
    });

    spanRemove.click(function() {
      if (window.confirm('削除してよろしいですか？')) {
        li.fadeOut(function() {
          li.remove();
          updateStorage();
        });
      }
    });
    todoList.append(li);
  }

  function updateStorage() {
    var list = [];
    todoList.find('li').each(function() {
      list.push({
        text: $(this).find('.text').text(),
        complete: $(this).hasClass('complete')
      });
    });
    storage['todo.list'] = JSON.stringify(list);
  }

  $('.todoForm').bind('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.val());
    todoInput.val('');
    updateStorage();
  });

  var storageList = storage['todo.list'];
  if (storageList) {
    JSON.parse(storageList).forEach(function(item) {
      addTodo(item.text, item.complete);
    });
  }
});
