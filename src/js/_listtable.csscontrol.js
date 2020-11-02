window.listtable = window.listtable || {};
window.listtable.class = window.listtable.class || {};

/**
  * listtable用のスタイル追加
  * @param {string} key - 対象スタイルシートのkey
  * @param {string} selector - 追加するスタイルのセレクタ
  * @param {Object} map - セレクタ以外のスタイルルール
  */
listtable.class.ListTable.prototype.addCSSStyleRule = function(key, selector, map) {
  var sheet = this.setCSSStyleSheet(key);
    
  if (sheet.insertRule) {
    // セレクタの一番上に本テーブルのidを追加
    if (selector.indexOf('#' + this.id)) {
      selector = '#' + this.id + ' ' + selector;
    }

    sheet.insertRule(selector + JSON.stringify(map).replace(/'|"/g,''), sheet.cssRules.length);
  }
};

/**
  * listtable用のスタイルシートの生成
  * @param {string} key - 対象スタイルシートのkey
  * @return {Object} - 対象のスタイルシート
  */
listtable.class.ListTable.prototype.setCSSStyleSheet = function(key) {
  key = key || 0;

  // listtable関連のスタイルシートを保持するオブジェクト
  this.styleElements = this.styleElements || {};

  // スタイル生成がなければ新規作成
  if (!this.styleElements[key]) {
    var style = document.createElement("style");
    document.getElementsByTagName("head")[0].appendChild(style);
    this.styleElements[key] = style.sheet;
  }

  return this.styleElements[key];
};

/**
  * listtable用のスタイルシートの削除
  * @param {string} key - 対象スタイルシートのkey
  */
listtable.class.ListTable.prototype.deleteCSSStyleSheet = function(key) {
  key = key || 0;

  // listtable関連のスタイルシートを保持するオブジェクト
  this.styleElements = this.styleElements || {};

  // スタイル生成がなければ新規作成
  if (this.styleElements[key]) {
    this.styleElements[key].ownerNode.remove();
    delete this.styleElements[key];
  }
};