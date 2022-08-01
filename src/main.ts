import './base.css';
import './style.css';

const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

anchorLinks.forEach((anchorLink) => {
  anchorLink.addEventListener('click', (e) => {
    // href="#" の時はトップにスクロールし、hashを削除する。
    // これはanchorである必要がないので<button>などでマークアップして別のリスナーで処理しても良い
    if (anchorLink.getAttribute('href') === '#') {
      e.preventDefault();
      // NOTE: location.hash = '' は動作しないのでhistory apiを使用する
      history.pushState('', document.title, location.pathname + location.search);
      /**
       * NOTE: クリックしたアンカーのフォーカスを外す。（ preventDefault()しない場合のブラウザの挙動に合わせる ）
       * 標準ではtargetがfocusable areaの場合はtargetにフォーカスを、その他の場合はviewport(body)をフォールバックにする。
       * @see https://html.spec.whatwg.org/multipage/browsing-the-web.html#scroll-to-the-fragment-identifier
       */
      anchorLink.blur();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }
    document.documentElement.style.scrollBehavior = 'smooth';
    // 一定時間後にscroll-behavior: smooth;を削除する。
    // NOTE: requestAnimationFrameだとfirefoxで動作しない。setTimeoutだと小さくても動作する(?)
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'auto';
    }, 1);
  });
});
