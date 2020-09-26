window.listtable = window.listtable || {};
window.listtable.class = window.listtable.class || {};


/**
  * JSONデータメンバをソートする。
  * sortKeysは次のように定義する<br/>
  * [{keyname: 'column1', order:listtable.const.ORDER_ASC}, {keyname: 'column2', order:listtable.const.ORDER_DESC}]
  * @param {Array} sortKeys - ソートのキー、並び順のオブジェクト配列
  * @return {Array} ソート順の行番号リストを返す
  */
 listtable.class.ListTable.prototype.sortData = function(sortKeys) {
  var sortArray = [];  // ソート用配列
  // dataメンバのキーを取得
  var keys = Object.keys(this.data);
  var keysLength = keys.length;
  // dataメンバのキーからソート対象と対象外を分ける
  for (var i = 0; i < keysLength; i++){
    var key = keys[i];
    var tmpData = this.data[key];
    tmpData['rowKey'] = key;
    // ソート配列に格納
    sortArray.push(tmpData);
  }
  // ソート配列をsortKeysでソート
  sortArray = listtable.class.ListTable.prototype.sortObject(sortArray, sortKeys);
  var keyArray = [];
  var sortArrayLength = sortArray.length;
  for (var i=0; i < sortArrayLength; i++) {
    keyArray.push(sortArray[i]['rowKey']);
  }
  return keyArray;
};

/**
 * Object型の配列をソートする<br/>
 * sortKeysは次のように定義する<br/>
 * [{keyname: 'column1', order:listtable.const.ORDER_ASC}, {keyname: 'column2', order:listtable.const.ORDER_DESC}]
 * @param {Array} data - ソートを行うオブジェクト配列
 * @param {Array} sortKeys - ソートのキー、並び順のオブジェクト配列
 * @return {Array} ソートされたdataを返す
 */
listtable.class.ListTable.prototype.sortObject = function(data, sortKeys) {
  if (sortKeys === null) return data;
  if (typeof sortKeys !== 'object') return data;
  var sortdata = data.concat();
  sortdata.sort(function(a, b) {
    var keylen = sortKeys.length;
    for (var i = 0; i < keylen; i++) {
      var sortkey = sortKeys[i];
      if (!(('order' in sortkey) && ('keyname' in sortkey))) continue;
      if (sortkey.order === listtable.const.ORDER_ASC) {
        if (a[sortkey.keyname] < b[sortkey.keyname]) return -1;
        if (a[sortkey.keyname] > b[sortkey.keyname]) return 1;
      } else if(sortkey.order === listtable.const.ORDER_DESC) {
        if (a[sortkey.keyname] > b[sortkey.keyname]) return -1;
        if (a[sortkey.keyname] < b[sortkey.keyname]) return 1;
      }
    }
    return 0;
  });
  return sortdata;
}

/**
 * ソート配列の内容をテーブルに反映する
 * @param {Array} sortArray - 行idをソート順に並べた配列
 */
listtable.class.ListTable.prototype.sortTable = function(sortArray) {
  console.time('sort table');
  var len = sortArray.length;

  // ソートする順番にjquery要素を格納
  
  // 一つ目の要素取得まで繰り返し
  var $firstRow = null;
  var count = 0;
  for (var i = 0; i < len; i++) {
    count++;
    var rowId = sortArray[i];
    var $row = $('#listtable-id--' + rowId);

    if ($row.length) {
      $firstRow = $row;
      break;
    }
  }

  // 後ろの要素から最初の要素の後に追加していく
  var rows = [];
  for (var i = count; i < len; i++) {
    var rowId = sortArray[i];
    rows.push($('#listtable-id--' + rowId));
  }

  $firstRow.after(rows);

  console.timeEnd('sort table')
}