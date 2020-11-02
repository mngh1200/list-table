window.listtable = window.listtable || {};
window.listtable.class = window.listtable.class || {};


/**
 * テーブル列の設定（初期設定や変更時）  
 * @param {Array} newColSettings - セットする列幅セット
 **/
 listtable.class.ListTable.prototype._setCol = function(newColSettings) {
  var colLen = this.$tdHead.length; // 列数
  
  this.settings.colSettings = newColSettings || this.settings.colSettings;
  
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

  
  var totalPxWidth = 0; // px固定の幅合計
  var totalRateWidth = 0; // %指定の幅合計
  var colWidthSettings = []; // 列幅設定一時格納

  // 列幅取得　＋　各幅合計取得
  for (var i = 0; i < colLen; i++) {
    var colWidth = this.settings.colSettings[i].width;
    var colWidthNum = typeof colWidth == 'string' ? Number(colWidth.replace(/px|\%/,'')) : null; // widthの数値部分
    var colWidthUnit = typeof colWidth == 'string' ? colWidth.replace(/[0-9]*/,'') : null; // widthの%部分

    // 値未指定時(or 不正時)
    if (!$.isNumeric(colWidthNum) || (colWidthUnit != 'px' && colWidthUnit != '%')) {
      this.settings.colSettings[i].width = listtable.const.DEFAULT_COL_WIDTH;
      colWidthNum = Number(this.settings.colSettings[i].width.replace(/px|\%/,'')); // widthの数値部分
      colWidthUnit = this.settings.colSettings[i].width.replace(/[0-9]*/,''); // widthの%部分
    }

    colWidthSettings.push({num: colWidthNum, unit: colWidthUnit});

    if (colWidthUnit == '%') {
      totalRateWidth = totalRateWidth + colWidthNum;
    } else {
      totalPxWidth = totalPxWidth + colWidthNum;
    }
  }

  // 列幅を比率で指定
  for (var i = 0; i < colLen; i++) {
    var colWidth = colWidthSettings[i].num;

    if (colWidthSettings[i].unit == '%') { // %指定
      var rate = colWidth * 100 / totalRateWidth;
      colWidth = rate + '%';
      if (totalPxWidth != 0) {
        var subWidth = totalPxWidth * rate / 100; // 固定列幅との調整用で減算する幅量
        colWidth = 'calc(' + colWidth + ' - ' + subWidth + 'px)';
      }
    } else { // px指定
      colWidth = colWidth + 'px';
    }
    
    this.$table.find('.list-table__list span:nth-of-type(' + (i + 1) + ')').css({
      'flex': '0 0 ' + colWidth,
      'width': colWidth
    });
  }  

  // テーブル幅 (設定幅、設定幅がなく列幅全固定の場合は列幅合計)
  var tableWidth = totalRateWidth == 0 ? totalPxWidth + 18 : 'auto';
  var tableWidth = this.settings.width || tableWidth;
  this.$table.width(tableWidth);
};