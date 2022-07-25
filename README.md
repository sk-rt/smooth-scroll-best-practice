# smooth scroll best practice

## TODO
- *[x] アンカーのクリックでスムーススクロールで移動する
- *[x] fixed header など画面上部固定要素を考慮してスクロール位置の offset を設定できる
- *[x] hashがURLに表示される（historyに追加される）
- *[x] ページトップ時はurlのhashはクリアされる
- *[x] focus変更時、サイト内検索時のスクロールはスムースにしない

## 実装方針

JavaScriptでクリックイベントを検出してscrollさせる方法だと、自由度は高いが `e.preventDefault()` する必要がありURLには表示されない。 
（location.hashに追加してしまうと、hashchangeイベントが発生し、2重にスクロールする事になる）

単にhtmlのstyleに `scroll-behavior: smooth;` を追記する方法だとfocusやサイト内テキスト検索時もスムーススクロールとなる。

- デフォルトは `scroll-behavior: auto;` を設定しておき、アンカーリンクのクリック時に `scroll-behavior: smooth;` に設定させる。（一定時間後に`auto`に戻す）
- スクロール位置の offsetは `*:target { scroll-margin-top: xxx }` で指定可。
- ページトップ時のhash削除は ` history.pushState();` で削除する。（:targetが残るがどうするか）