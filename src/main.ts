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
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    document.documentElement.style.scrollBehavior = 'smooth';
    // 一定時間後にscroll-behavior: smooth;を削除する。
    // NOTE: requestAnimationFrameだとfirefoxで動作しない。setTimeoutだと小さくても動作する(?)
    setTimeout(() => {
      console.log('requestAnimationFrame');
      document.documentElement.style.scrollBehavior = 'auto';
    }, 1);
  });
});

