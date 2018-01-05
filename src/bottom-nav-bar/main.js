import {windowResizeHandler} from '../mce-util.js';

( function() {
  /**
   * [Material Design Spec.](https://material.io/guidelines/components/bottom-navigation.html#bottom-navigation-specs)
   * 
   * ## Example
   * ```
   * <a-bottom-nav-bar>
   *   <a-nav-item icon="favorite">Favourite</a-nav-item>
   *   <a-nav-item icon="search" class="disabled">Disabled</a-nav-item>
   *   <a-nav-item icon="alarm">Alarm</a-nav-item>
   *   <a-nav-item icon="music_note">Music</a-nav-item>
   * </a-bottom-nav-bar>
   * ```   
   * 
   * <p data-height="300" data-theme-id="32189" data-slug-hash="aEVowx" data-default-tab="html,result" data-user="allenhwkim" data-embed-version="2" data-pen-title="mce template" class="codepen">See the Pen <a href="https://codepen.io/allenhwkim/pen/PEJKKo/">mce template</a> by Allen kim (<a href="https://codepen.io/allenhwkim">@allenhwkim</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>`
   *
   * ### `a-bottom-nav-bar` style classes
   *  |name|description|
   *  |---|---|
   *  |dark-bg| dark background bottom bar
   */
  class BottomNavBar extends HTMLElement {
    connectedCallback() {
      if (window.ce && window.ce.resizeHandler) {} else {
        window.ce = {resizeHandler: windowResizeHandler};
        window.addEventListener('resize', window.ce.resizeHandler);
      }
    }
  }
  
  customElements.define('a-bottom-nav-bar', BottomNavBar);
})();