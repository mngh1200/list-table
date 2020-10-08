window.listtable = window.listtable || {};
window.listtable.class = window.listtable.class || {};


/**
  * JSONデータメンバをフィルターする。
  * filterKeysは次のように定義する<br/>
  * [{keyname: 'column1', type:listtable.const.FILTER_FULL, value: ['1', 'A', 'データ']}, {keyname: 'column2', type:listtable.const.FILTER_PART, value: 'データ'}]
  * @param {Array} filterKeys - フィルターの種類、フィルターのタイプ（完全一致、部分一致）、フィルターの値のオブジェクト配列
  * @return {Array} フィルター結果の行番号リストを返す
  */
 listtable.class.ListTable.prototype.filterData = function(filterKeys) {
  var filterArray = [];  // ソート用配列
  // dataメンバのキーを取得
  var keys = Object.keys(this.data);
  var keysLength = keys.length;
  // dataメンバのキーからソート対象と対象外を分ける
  for (var i = 0; i < keysLength; i++){
    var key = keys[i];
    var tmpData = this.data[key];
    tmpData['rowKey'] = key;
    // ソート配列に格納
    filterArray.push(tmpData);
  }
  // ソート配列をsortKeysでソート
  filterArray = listtable.class.ListTable.prototype.filterObject(filterArray, filterKeys);
  var keyArray = [];
  var filterArrayLength = filterArray.length;
  for (var i=0; i < filterArrayLength; i++) {
    keyArray.push(filterArray[i]['rowKey']);
  }
  return keyArray;
};

/**
 * Object型の配列をソートする<br/>
 * filterKeysは次のように定義する<br/>
 * [{keyname: 'column1', type:listtable.const.FILTER_FULL, value: ['1', 'A', 'データ']}, {keyname: 'column2', type:listtable.const.FILTER_PART, value: 'データ'}]
 * @param {Array} data - フィルターを行うオブジェクト配列
 * @param {Array} filterKeys - フィルターの種類、フィルターのタイプ（完全一致、部分一致）、フィルターの値のオブジェクト配列
 * @return {Array} フィルターされたdataを返す
 */
listtable.class.ListTable.prototype.filterObject = function(data, filterKeys) {
  if (filterKeys === null) return data;
  if (typeof filterKeys !== 'object') return data;
  var filterdatas = data.concat();
  var filterArray = new Array();
  var dataLength = filterdatas.length;
  var keyLength = filterKeys.length;
  for (var i = 0; i < dataLength; i++) {
    var filterdata = filterdatas[i];
    var addFlg = true;
    for (var j = 0; j < keyLength; j++) {
      var key = filterKeys[j];
      if (!(('keyname' in key) && ('type' in key) && ('value' in key))) continue;
      if (!(key.keyname in filterdata)) continue;
      var target = filterdata[key.keyname];
      var values = [];
      if (typeof key.value === 'object') {
        values = key.value;
      } else {
        values = [key.value];
      }
      var valueKeys = Object.keys(values);
      var valueLength = valueKeys.length;
      var matchFlg = false;
      for (var k = 0; k < valueLength; k++) {
        var value = values[ valueKeys[k] ];
        if (key.type === listtable.const.FILTER_FULL) {
          if (String(target) === String(value)) {
            matchFlg = true;
            break;
          }
        } else if (key.type === listtable.const.FILTER_PART) {
          if (String(target).indexOf( String(value) ) !== -1) {
            matchFlg = true;
            break;
          }
        } else {
          matchFlg = true;
          break;
        }
      }
      addFlg = addFlg && matchFlg;
      if (!addFlg) break;
    }
    if (addFlg) filterArray.push(filterdata);
  }
  return filterArray;
};