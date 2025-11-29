// Hide context menu on homepage only
(function() {
  const styleId = 'hide-context-menu-homepage';

  function updateContextMenuVisibility() {
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '';
    let style = document.getElementById(styleId);

    if (isHomepage && !style) {
      style = document.createElement('style');
      style.id = styleId;
      style.textContent = '#page-context-menu, #page-context-menu-button { display: none !important; }';
      document.head.appendChild(style);
    } else if (!isHomepage && style) {
      style.remove();
    }
  }

  // Run on initial load
  updateContextMenuVisibility();

  // Listen for client-side navigation
  const originalPushState = history.pushState;
  history.pushState = function() {
    originalPushState.apply(this, arguments);
    setTimeout(updateContextMenuVisibility, 0);
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    setTimeout(updateContextMenuVisibility, 0);
  };

  window.addEventListener('popstate', updateContextMenuVisibility);
})();
