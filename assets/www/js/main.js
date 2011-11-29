$(function() {
  var $list = $('.todoList');
  var $input = $('.todoInput');
  var storage = window.localStorage;

  /*
   * Todoを追加する関数
   */
  function addTodo(text, isComplete) {
    // リストアイテムをつくる
    var $li = $('<li>');
    var $text = $('<span class="text">').text(text);
    var $checkbox = $('<input type="checkbox">');
    var $remove = $('<span class="remove">削除</span>');
    $li.append($checkbox).append($text).append($remove);

    // 完了済みの場合の処理
    if (isComplete) {
      $li.addClass('complete');
      $checkbox.attr('checked', true);
    }

    // チェックボックスをクリックしたときの処理
    $checkbox.click(function() {
      if ($(this).is(':checked')) {
        $li.addClass('complete');
      }
      else {
        $li.removeClass('complete');
      }
      updateStorage();
    });

    // 削除ボタンをクリックしたときの処理
    $remove.click(function() {
      if (window.confirm('削除してよろしいですか？')) {
        $li.fadeOut(function() {
          $li.remove();
          updateStorage();
        });
      }
    });

    // リストに追加する
    $list.append($li);
  }

  /*
   * ストレージを更新する関数
   */
  function updateStorage() {
    var list = [];

    // 現在のリスト情報を全て取得する
    $list.find('li').each(function() {
      var $item = $(this);

      // テキストと完了かどうかを保存する
      list.push({
        text: $item.find('.text').text(),
        complete: $item.hasClass('complete')
      });
    });

    // 文字列にしてストレージに保存
    storage['todo.list'] = JSON.stringify(list);
  }

  // フォームを送信したときの処理
  $('.todoForm').bind('submit', function(event) {
    // フォームのデフォルトの動作を止める
    event.preventDefault();

    // テキストボックスに入っている文字列を取得
    var text = $input.val();

    // todoを追加
    addTodo(text);

    // テキストボックスを空にする
    $input.val('');

    // ストレージの更新
    updateStorage();
  });

  // 初期表示時にストレージからデータを復元する処理
  var storageList = storage['todo.list'];
  if (storageList) {
    JSON.parse(storageList).forEach(function(item) {
      addTodo(item.text, item.complete);
    });
  }
});
