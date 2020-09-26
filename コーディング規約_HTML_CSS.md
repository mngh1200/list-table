# コーディング規約

## HTML/CSS共通

#### インデント

半角スペース2つ開ける

```
<ul>
  <li>りんご</li>
  <li>みかん</li>
</ul>
```

```
.block {
  color: #0000;
}
```

#### 大文字/小文字

属性やスタイルの値については、基本的に小文字を使用する

```
<a href="#">リンク</a>
```

```
.text {
  color: #fff;
}
```

#### エンコード

html、css、scssファイルのエンコードはUTF-8（BOMなし）にする

## HTML

#### タグ

目的に応じたタグを選択する

例：
- 見出しには見出し要素（h1～h5）
- 段落にはp要素
- アンカーにはa要素 
等

#### altタグ

imgタグには必ずalt属性に代替テキストを付与する
意味のない要素の場合は、alt=""を指定する

```
<img src="logo.jpg" alt="タイトル">
```

#### クオーテーション

属性値にはダブルクオーテーションを使用する

```
<a href="">リンク</a>
```

## CSS

#### 全般

- セレクタと宣言ブロックの間に半角スペースを挿入する
- セレクタと宣言ブロックの「{」（左中括弧）は同じ行に記入する

NG例
```
.text{
  color: red;
}

.text
{
  color: red;
}
```

推奨
```
.text {
  color: red;
}
```


#### コメントアウト

一行コメントには//を使用する
複数行のコメントには/* */を使用する

```
// コメント一行

/*
コメント複数行
コメント複数行
*/
```


#### プロパティ

###### 可能な限り省略形のプロパティを使用する

NG例
```
border-top-style: none;
font-family: palatino, georgia, serif;
font-size: 100%;
line-height: 1.6;
padding-bottom: 2em;
padding-left: 1em;
padding-right: 1em;
padding-top: 0;
```

推奨
```
border-top: 0;
font: 100%/1.6 palatino, georgia, serif;
padding: 0 1em 2em;
```



###### 最終行のプロパティのセミコロンを省略しない

NG例
```
border-top: 0;
padding: 0 1em 2em
```

推奨
```
border-top: 0;
padding: 0 1em 2em;
```



###### プロパティ名とコロンの後には半角スペースを挿入する

また、プロパティ名とコロンの間にはスペースを挿入しない

NG例
```
border-top:0;
```

推奨
```
border-top: 0;
```



###### プロパティ値にはシングルクオーテーションを使用してください



###### !importantは可能な限り使用しない
※ 禁止ではない


#### セレクタ

###### 命名規則は基本的にBEM記法を使用する

BEM記法については後述



###### 単語区切りには「-」（ハイフン）を使用する
（BEM記法前提）

```
.search-table {}
```



###### 意味の取れない名称のid及びclassを使用しない 

NG例
```
#rre-112 {}

.button-blue {}
```



###### 意味の取れない名称の短縮を行わない

NG例: sub-search-table  →　sst 
推奨: navigation → nav



###### 要素名とidまたはclassの組み合わせを使用しない

NG例
```
div#main-table {}
p.error {}
```



###### 名前空間の汚染を防止するため固有の接頭辞を付ける
（TODO: 本プロジェクトの接頭辞は検討中） 
 
接頭辞の後には「-」（ハイフン）を付ける

```
.jstable-table {}
```



###### 複数のセレクタを使用する場合はセレクタ毎に改行する

NG例
```
.text1, .text2, .text3 {
  color: #333;
}
```

推奨
```
.text1,
.text2,
.text3 {
  color: #333;
}
```



###### セレクタのネストは孫要素まで

```
親 > 子 > 孫
```


#### BEM記法

HTMLタグ要素をクラス名でBlock、Element 、Modifer として表現する 
（本ルールではBEM記法を元にした本プロジェクトでのルールを記載する） 



###### Block

親の要素となるもをBlockとして命名する

```
.list
.search-table
```



###### Element

- 親要素（Block）の部品をElementとして命名する 
- Block__Elementのように「__」（アンダーバー二つ）で区切って表現する
- 下位要素が連立する場合はBlock__Element__Elementのように表現する

```
.list__item
.search-table__header
.search-table__header__cell
```



###### Modifer

- 特定要素の状態を表現する
- 同種類のタグの中で色や有効/無効等の状態に差異があることを表現する
- BlockやElementに対して末尾に「--」（ハイフン二つ）と状態を示す語句を記載する
- 状態についてキーとなる語句が必要な場合は「_」（アンダーバー）で区切って表現する
- Modiferを付与するタグに関しては、Modiferのついたクラスとついていないクラスを両方付与する

```
.list--hidden
.list__item--disabled
.search-table__header__cell--status_error
```



###### SCSSでの記述例

```
.list {
  &__item {
    &--disabled {
      color: #888;
    }
  }

  &--hidden {
    display: none;
  }
}
```