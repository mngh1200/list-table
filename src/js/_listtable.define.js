window.listtable = window.listtable || {};

/**
 * 定数格納用の名前空間
 * @namespace
 */
listtable.const = listtable.const || {};

/**
 * 定義用の名前空間
 * @const
 */
listtable.const.DEF_STATE = {};

/**
 * 列の型idの定義
 * @const
 */
listtable.const.DEF_STATE.COL_TYPE = {
  TEXT: 'text',
  NUM: 'num',
  TEXTAREA: 'textarea',
  DATE: 'date',
  HTML: 'html'
};

/**
 * 列スタイルの定義
 * @const
 */
listtable.const.DEF_STATE.COL_STYLE = {
  FIXED: 'fixed',
  RATE: 'rate'
};


/**
 * listtableのsettingsのデフォルト設定
 * @const
 */
listtable.const.DEF_STATE.DEF_SETTINGS = {
  height: 'auto', // テーブル高さ (auto or int)
  colStyle: listtable.const.DEF_STATE.COL_STYLE.FIXED, // 列スタイル (fixed or rate)
  colSettings: null // 列定義 [{id: ..., type, ...}, ...]のJSON配列
};



/**
 * デフォルトの列幅
 * @const
 */
listtable.const.DEFAULT_COL_WIDTH = 120;

/**
 * ソート順昇順を示す定数
 * @const
 */
listtable.const.ORDER_ASC = 0;

/**
 * ソート順降順を示す定数
 * @const
 */
listtable.const.ORDER_DESC = 1;

/**
 * フィルター完全一致を示す定数
 * @const
 */
listtable.const.FILTER_FULL = 1;

/**
 * フィルター部分一致を示す定数
 * @const
 */
listtable.const.FILTER_PART = 2;


