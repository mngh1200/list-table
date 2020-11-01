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
  var self = this;
  
  // フォーマット関数
  var formatNum = function(value, colSetting) {
    if (colSetting == null) return value;
    if ( ('settings' in colSetting) && ('comma' in colSetting.settings) && (colSetting.settings.comma) ) {
      return String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }
  };
  
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
  this.settings = $.extend({}, listtable.const.DEF_STATE.DEF_SETTINGS, settings);

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

  // テーブル幅
  var tableWidth = 0;

  // 列幅、テーブル幅取得
  for (var i = 0; i < colLen; i++) {
    var colSetting = this.settings.colSettings[i];

    // 値未指定時
    if (!$.isNumeric(colWidth)) {
      this.settings.colSettings[i].width = listtable.const.DEFAULT_COL_WIDTH;
    }

    tableWidth += this.settings.colSettings[i].width;
  }

  if (this.settings.colStyle == listtable.const.DEF_STATE.COL_STYLE.RATE) {
    // 列幅を比率で指定
    for (var i = 0; i < colLen; i++) {
      var colWidth = this.settings.colSettings[i].width;
      var colWidthPercent = (colWidth * 100 / tableWidth);
      this.$table.find('.list-table__list span:nth-of-type(' + (i + 1) + ')').css({
        'flex': '0 0 ' + colWidthPercent + '%',
        'max-width': colWidthPercent + '%'
      });
    }

    tableWidth = 'auto';
  } else {
    // 列幅を固定幅で指定
    for (var i = 0; i < colLen; i++) {
      var colWidth = this.settings.colSettings[i].width;
      this.$table.find('.list-table__list span:nth-of-type(' + (i + 1) + ')').css({
        'flex': '0 0 ' + colWidth + 'px',
        'max-width': colWidth + 'px'
      });
    }

    tableWidth = tableWidth + 18; // スクロールバー分の調整
  }

  // テーブル幅
  tableWidth = this.settings.width || tableWidth;
  this.$table.width(tableWidth);

  // テーブル高さ
  if (settings.height != 'auto') {
    this.$table.height(settings.height);
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
      $cell.data('listtable-col-id', j);
      if (colSetting.id && colSetting.type) {
        if (!$cell.children().eq(0).is('p')) {
          $cell.html('<p>' + $cell.html() + '</p>');
        }
        var $cellP = $cell.children().eq(0);
        if (colSetting.type == listtable.const.DEF_STATE.COL_TYPE.TEXT) {
          // text型
          rowData[colSetting.id] = $cellP.text();
        } else if (colSetting.type == listtable.const.DEF_STATE.COL_TYPE.NUM) {
          rowData[colSetting.id] = $cellP.text().replace(/,/g, '');
          // settingsで桁区切りオプションがtrueの場合
          $cellP.html( formatNum(rowData[colSetting.id], colSetting) );
        } else if (colSetting.type == listtable.const.DEF_STATE.COL_TYPE.TEXTAREA) {
          rowData[colSetting.id] = $cellP.text();
          // textarea
          $cellP.addClass('list-table__cell list-table__cell--textarea').html(rowData[colSetting.id]);
        }
      }
    }
  }

  // スクロールイベント
  this.$tbody.scroll(function() {
    self.$thead.scrollLeft(self.$tbody.scrollLeft());
  });

  // 編集モードイベント追加
  this.$table.on('editStart', '.list-table__body .list-table__list span', function() {
    var colIdx = $(this).data('listtable-col-id');
    var colSetting  = self.settings.colSettings[colIdx];
    var colId = colSetting.id;
    var rowId = $(this).parent().data('listtable-id');
    var html = '';
    var value = self.data[rowId][colId];
    if(colSetting.type === listtable.const.DEF_STATE.COL_TYPE.TEXT) {
      html += '<input type="text" style="width:100%;" id="' +
      self.id + '__edit__' + rowId + '__' + colSetting.id + '" class="list-table__edit list-table__edit--text" data-listtable-col-id="' +
      colIdx + '" data-listtable-row-id="' + rowId + '" value="' + value + '" />';
    } else if(colSetting.type === listtable.const.DEF_STATE.COL_TYPE.NUM) {
      html += '<input type="text" style="width:100%;" id="' +
      self.id + '__edit__' + rowId + '__' + colSetting.id + '" class="list-table__edit list-table__edit--num" data-listtable-col-id="' +
      colIdx + '" data-listtable-row-id="' + rowId + '" value="' + value + '" />';
    }  else if(colSetting.type === listtable.const.DEF_STATE.COL_TYPE.TEXTAREA) {
      html += '<textarea style="width:100%;" id="' +
      self.id + '__edit__' + rowId + '__' + colSetting.id + '" class="list-table__edit list-table__edit--textarea" data-listtable-col-id="' +
      colIdx + '" data-listtable-row-id="' + rowId + '">' + value + '</textarea>';
    } else {
      html += value;
    }
    $(this).find('p').eq(0).html(html).children().eq(0).focus();
  });

  // 編集終了イベント設定
  this.$table.on('editEnd', '.list-table__edit', function() {
    var colId = $(this).data('listtable-col-id');
    var rowId = $(this).data('listtable-row-id');
    var value = $(this).val();
    var colSetting = self.settings.colSettings[colId];
    self.data[rowId][colSetting.id] = value;
    var html = '';
    if(colSetting.type === listtable.const.DEF_STATE.COL_TYPE.TEXT) {
      html += value;
    } else if(colSetting.type === listtable.const.DEF_STATE.COL_TYPE.NUM) {
      html += formatNum(value, colSetting);
    } else if(colSetting.type === listtable.const.DEF_STATE.COL_TYPE.TEXTAREA) {
      html += value;
    } else {
      html += value;
    }
    $(this).parent().html(html);
  });
  
  // 編集開始終了イベント
  this.$table.on('dblclick', '.list-table__body .list-table__list span', function() {
    $(this).trigger('editStart');
  });
  
  this.$table.on('blur', '.list-table__edit', function() {
    $(this).trigger('editEnd');
  });
};

require('./_listtable.define.js');
require('./_listtable.sort.js');
require('./_listtable.filter.js');