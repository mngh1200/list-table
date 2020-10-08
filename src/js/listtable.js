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

listtable.class.ListTable = function(id, settings, datas) {
  this.id = id;
  var $table = $('#'+id);
  // settings、datasが存在する場合はDOM生成
  if (settings != null && settings.colSettings != null && Array.isArray(settings.colSettings) && datas != null) {
    var html = '';
    html += '<ul><li>';
    var csLen = settings.colSettings.length;
    for (var i = 0; i < csLen; i++) {
      var colName = settings.colSettings[i].name;
      html += '<span>' + colName + '</span>';
    }
    html += '</li></ul>';
    html += '<ul>';
    var dataLen = datas.length;
    for (var i = 0; i < dataLen; i++) {
      var data = datas[i];
      html += '<li>';
      for (var j = 0; j < csLen; j++) {
        var colId = settings.colSettings[j].id;
        var value = data[colId];
        html += '<span>' + value + '</span>';
      }
      html += '</li>';
    }
    html += '</ul>';
    $table.html(html);
  }
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

  // 列定義セット（設定されていない場合）
  if (this.settings.colSettings == null || !Array.isArray(this.settings.colSettings)) {
    this.settings.colSettings = new Array(colLen);
  }

  for (var i = 0; i < colLen; i++) {
    var defColSetting = {
      id: 'col' + (i + 1),
      type: listtable.const.DEF_STATE.COL_TYPE.TEXT
    }
    this.settings.colSettings[i] = $.extend(defColSetting, this.settings.colSettings[i] || {});
  }

  // データセット
  this.data = {};
  for (var i = 0; i < rowLen; i++) {
    var $row = this.$tr.eq(i);
    // dataオブジェクトと行要素を紐付けるidをセット
    var id = 'r' + (i + 1);
    this.data[id] = {};
    $row.attr('id', this.id + '__' + id);
    $row.data('listtable-id', id);
    // dataに各セルの情報セット
    var rowData = this.data[id];
    var $cellArr = $row.children('span');
  
    for (var j = 0; j < colLen; j++) {
      var $cell = $cellArr.eq(j);
      var colSetting = this.settings.colSettings[j];
      if (colSetting.id && colSetting.type) {
        if (colSetting.type == listtable.const.DEF_STATE.COL_TYPE.TEXT) {
          // text型
          rowData[colSetting.id] = $cell.text();
        }
      }
    }
  }

  if (this.settings.colStyle == listtable.const.DEF_STATE.COL_STYLE.RATE) {
    // 列幅を比率で指定
  } else {
    var totalWidth = 0;
    // 列幅を固定幅で指定
    for (var i = 0; i < colLen; i++) {
      var colSetting = this.settings.colSettings[i];
      var colWidth = colSetting.width;

      // 値未指定時
      if (!$.isNumeric(colWidth)) {
        colWidth = listtable.const.DEFAULT_COL_WIDTH;
      }

      totalWidth += colWidth;
      this.$table.find('.list-table__list span:nth-of-type(' + (i + 1) + ')').css({
        'flex': '0 0 ' + colWidth + 'px',
        'max-width': colWidth + 'px'
      });
    }
    this.$table.width(totalWidth + 20);
  }
};

require('./_listtable.define.js');
require('./_listtable.sort.js');
require('./_listtable.filter.js');