# smooth scroll best practice

## TODO
- *[ ] アンカーのクリックでスムーススクロールで移動する
- *[ ] fixed header など画面上部固定要素を考慮してスクロール位置の offset を設定できる
- *[ ] hashがURLに表示される（historyに追加される）
- *[ ] ページトップ時はurlのhashはクリアされる
- *[ ] focus変更時、サイト内検索時のスクロールはスムースにしない

## 実装方針

JavaScriptでクリックイベントを検出してscrollさせる方法だと、自由度は高いが `e.preventDefault()` する必要がありURLには表示されない。 
（location.hashに追加してしまうと、hashchangeイベントが発生し、2重にスクロールする事になる）

単にhtmlのstyleに `scroll-behavior: smooth;` を追記する方法だとfocusやサイト内テキスト検索時もスムーススクロールとなる。
