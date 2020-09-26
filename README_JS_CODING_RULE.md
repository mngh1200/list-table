# Javascriptコーディング規約

## 変数
- 変数宣言にはvarを使用する。
- グローバル変数は禁止とする。

## 定数
- 大文字で名前を定義する。
- 定数は説明に@constコメントにをつける。
```
例：
/**
 * 定数です
 * @const
 */
namespace.CONSTANT_VALUE = 0;
```

## セミコロン
- セミコロンは必ずつける。

## インデント
- 半角スペース2つとする。

## 命名規則
以下形で命名する。
- 関数：ロウワーキャメルケース
- 変数：ロウワーキャメルケース
- クラス：アッパーキャメルケース
- 列挙型：アッパーキャメルケース
- メソッド：ロウワーキャメルケース
- 定数：大文字とアンダーバー
- 名前空間：ロウワーキャメルケース
- ファイル：小文字のみ（仮）
```
ロウワーキャメルケースはlowerCamelCaseと記述
アッパーキャメルケースはUpperCamelCaseと記述
```

## jQueryを使用する変数について
jQueryの機能を使用する変数には
```
$elementName
```
のように$をつける。

## 演算子
式が複数行になる場合、演算子先行する行につける。
```
三項演算子は次のように記述
var a = b ?
  longOperandTrueValue :
  longOperandFalseValue;
ドット演算子も同様に記述する
var c = foo.bar.
  doLongName().
  doLongerName();
```

## スペース
以下にスペースを入れること
- 演算子の前後
```
var a = a + b;
var a = b < c ? d : e;
```
- if/for/whileの後ろ
```
if (a = b) {
  // ～
}

for (var a = 0; a < b; a++) {
  // ～
}

while (a != 0) {
  // ～
}
```
- 波括弧（{}）の前後
```
if (a == b) {
  // ～
} else {
  // ～
}

if (a == b) { c = d; }

for (var a = 0; a < b; a++) {
  // ～
}

while (a != 0) {
  // ～
}

function foo(a, b) {
  // ～
}
```
- 引数の間
```
function foo(a, b) {
  // ～
}
var x = foo('bar', 1);
```
- ネストで呼び出す関数の前後
```
alert( foor(a, b) );
```
オブジェクト定義時のプロパティ値の前
```
// プロパティ名とコロンの間は空けない
var obj = {
  a: 'a',
  b: 2
};
```

## 文字列
シングルクォーテーションを使用する。

## その他
- 条件式での代入は追加の括弧でラップする。
```
while ((a = b)) {
  // ～
}
```
- 配列、オブジェクトリテラルの末尾カンマは禁止
```
// 次の記述は禁止です
var a = [a, b, c, ];
var obj = {
  a: 'a',
  b: 1,
  c: 'c',
};
```
- 複数行にわたる場合半角スペース2つのインデントとする
```
var a = b ?
  longOperandTrueValue :
  longOperandFalseValue;
var c = foo.bar.
  doLongName().
  doLongerName();
var d = '<html>' +
  '<body></body>' +
  '</html>';
```
## コメントアウト
JSDocの形式で記述する。