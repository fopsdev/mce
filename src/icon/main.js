( function() {
  /**
   * [Material Design Spec.](https://material.io/guidelines/style/icons.html#)
   * Material icons use geometric shapes to visually represent core ideas, capabilities, or topics. System icons represent a command, file, device, directory, or common actions.
   * ### example
   * ```
   *   <an-icon class="small">face</an-icon>
   *   <an-icon>face</an-icon>
   *   <an-icon class="big">face</an-icon>
   *   <an-icon class="double">face</an-icon>
   *   <an-icon class="double">fa-envelope</an-icon> <!-- for Font-Awesome icon -->
   *   <an-icon class="double" img="ali.connors.jpg"></an-icon>
   * ```
   *
   * ### `an-icon` element atttibutes
   *  |name|value|description|
   *  |---|---|---|
   *  |img| image url | Show an image instead of font icon. e.g. img="ali.conors.jpg"
   * 
   * ### `an-icon` element style classes
   *  |name|description|
   *  |---|---|
   *  |small | A smaller icon. 18px
   *  |big | Bigger icon. 36px
   *  |double | Double-sized icon. 48px
   *  |circle | An icon in a circle
   *  |square | An icon in a square
   *  |dark-bg | An icon in dark background
   *  |reactive | An icon respond to click and showing a ripple effect
   *  |disabled | A greyed out without responsiveness
   */
  class Icon extends HTMLElement {
    connectedCallback() {
      this._setImageIcon(); // if img attribute given, set image icon
      this.clickListener = this._onClick.bind(this);
      this._addEventListener();
    }

    disconnectedCallback() {
      this.removeEventListener('mouseup', this.clickListener);
      this.removeEventListener('touchend', this.clickListener);
    }

    _onClick(event) {
      let href = this.getAttribute('href');
      if (href) {
        window.location.href = href; //with href, go to the given url, 
      }
    }

    _addEventListener() {
      this.addEventListener('mouseup',  this.clickListener);
      this.addEventListener('touchend',  this.clickListener);
    }

    // _setImageIcon() {
    //   let img = this.getAttribute('img');
    //   if (img) {
    //     this.style.backgroundImage = `url(${img})`;
    //     this.innerHTML = 'favorite';
    //   }
    // }

    _setImageIcon() {
      let iconText = this.innerHTML;
      let isFAIcon = iconText.match(/^fa-[a-z\-]+$/);
      let isMDIcon = iconText.match(/^[a-z_]+$/);
      let imgSrc = this.getAttribute('img');

      if (isMDIcon) {
        this.innerHTML = iconText;
      } else if (isFAIcon) {
        this.innerHTML = `<i class="fa ${iconText}"></i>`;
      } else if (imgSrc) {
        this.innerHTML = 'photo';
        this.style.backgroundImage = `url(${imgSrc})`;
      }
    }
  }

  customElements.define('an-icon', Icon);
})();
