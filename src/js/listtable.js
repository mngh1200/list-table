/**
 * このライブラリのベースとなる名前空間
 * @namespace
 */
window.listtable = window.listtable || {};

/**
 * クラスに関する名前空間
 * @namespace
 */
window.listtable.class = window.listtable.class || {};

listtable.class.ListTable = function(id, settings) {
  this.id = id;
  var $table = $('#'+id);
  // 要素取得 + クラスセット
  this.$table = $table.addClass('list-table');
  this.$thead = $table.children('ul').eq(0).addClass('list-table__head');
  this.$tbody = $table.children('ul').eq(1).addClass('list-table__body');
  this.$th = this.$thead.children('li').addClass('list-table__list list-table__list--head');
  this.$tr = this.$tbody.children('li').addClass('list-table__list');
  this.$tdHead = this.$th.children('span');
  this.$td = this.$tr.children('span');

  var colLen = this.$tdHead.length; // 列数
  var rowLen = this.$tr.length; // 行数

  // 全般設定    settings = settings || {};
  this.settings = $.extend(listtable.const.DEF_STATE.DEF_SETTINGS, settings);
  // 任意の列設定がない場合はタグ構造から生成
  if (this.settings.colSettings == null || Array.isArray(this.settings.colSettings)) {
    this.settings.colSettings = [];
    for (var i = 0; i < colLen; i++) {
      this.settings.colSettings.push({
        id: 'col' + (i + 1),
        type: listtable.const.DEF_STATE.COL_TYPE
      });
    }
  }

  // データセット
  this.data = {};
  for (var i = 0; i < rowLen; i++) {
    var $row = this.$tr.eq(i);
    // dataオブジェクトと行要素を紐付けるidをセット
    var id = 'r' + (i + 1);
    this.data[id] = {};
    $row.attr('id', 'listtable-id--' + id);
    $row.data('listtable-id', id);
    // dataに各セルの情報セット
    var rowData = this.data[id];
    var $cellArr = $row.children('span');
  
    for (var j = 0; j < colLen; j++) {
      var $cell = $cellArr.eq(j);
      var colSetting = this.settings.colSettings[j];
      if (colSetting.id && colSetting.type) {
        if (colSetting.type == listtable.const.DEF_STATE.COL_TYPE) {
          // text型
          rowData[colSetting.id] = $cell.text();
        }
      }
    }
  }
};

require('./_listtable.define.js');
require('./_listtable.sort.js');