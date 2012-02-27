$(function() {
  var addTodo, storage, storageList, todoInput, todoList, updateStorage;
  addTodo = function(text, isComplete) {
    var checkbox, li, spanRemove, spanText;
    li = $("<li>");
    spanText = $("<span class=\"text\">").text(text);
    checkbox = $("<input type=\"checkbox\">");
    spanRemove = $("<span class=\"remove\">削除</span>");
    li.append(checkbox).append(spanText).append(spanRemove);
    if (isComplete) {
      li.addClass("complete");
      checkbox.attr("checked", true);
    }
    checkbox.click(function() {
      if ($(this).is(":checked")) {
        li.addClass("complete");
      } else {
        li.removeClass("complete");
      }
      return updateStorage();
    });
    spanRemove.click(function() {
      if (window.confirm("削除してよろしいですか？")) {
        return li.fadeOut(function() {
          li.remove();
          return updateStorage();
        });
      }
    });
    return todoList.append(li);
  };
  updateStorage = function() {
    var list;
    list = [];
    todoList.find("li").each(function() {
      return list.push({
        text: $(this).find(".text").text(),
        complete: $(this).hasClass("complete")
      });
    });
    return storage["todo.list"] = JSON.stringify(list);
  };
  todoList = $(".todoList");
  todoInput = $(".todoInput");
  storage = window.localStorage;
  $(".todoForm").bind("submit", function(event) {
    var val;
    event.preventDefault();
    val = todoInput.val();
    if (val) addTodo(val);
    todoInput.val("");
    return updateStorage();
  });
  storageList = storage["todo.list"];
  if (storageList) {
    return JSON.parse(storageList).forEach(function(item) {
      return addTodo(item.text, item.complete);
    });
  }
});