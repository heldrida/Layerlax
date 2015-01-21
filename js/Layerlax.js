;(function(window, document, undefined) {

  // Strict Mode
  'use strict';

  function Layerlax(element) {

    // DOM Context
    this.element = element;
    this.layers = element.getElementsByClassName('layer');

    // Element
    this.bounds = null;
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.ix = 0;
    this.iy = 0;

    // Initialise
    this.initialise();

  }

  Layerlax.prototype.onMouseMove = function (event) {

    this.bounds = this.element.getBoundingClientRect();
 
    // mouse cursor position
    this.x = this.bounds.left;    
    this.y = this.bounds.top;
    
    // size
    this.w = this.bounds.width;
    this.h = this.bounds.height;

    console.log('this.bounds: ', this.bounds);

    // center
    this.cx = this.w / 2;
    this.cy = this.h / 2;

    // amount from center
    this.ix = (event.clientX - this.x - this.cx) / this.cx;
    this.iy = (event.clientY - this.y - this.cy) / this.cy;

    // clip to element bounds, but keep all values positive,
    // also set boundaries of element set to 0.6/1.2
    //this.ix = Math.abs(this.ix);
    //this.iy = Math.abs(this.iy);

    /*
    this.ix = Math.max(this.ix, 0);
    this.ix = Math.min(this.ix, 5);
    this.iy = Math.max(this.iy, 0);
    this.iy = Math.min(this.iy, 5);
    */

  };

  Layerlax.prototype.onAnimationFrame = function () {

    for (var i = 0; i < this.layers.length; i++) {

      this.setStyle(this.layers[i], this.ix, this.iy);

    }

    this.requestAnimationFrame = requestAnimationFrame(this.onAnimationFrame.bind(this));

  };

  Layerlax.prototype.setStyle = function (element, x, y) {
    
    var val = (parseFloat(x) > 0 ? x : 1),
        resistance = element.getAttribute('data-depth'),
        scale = element.getAttribute('data-scale');
 
        console.log('scale: ', scale);

        val = val * resistance;
        x = x * resistance;
        y = y * resistance;

        // element.style.webkitTransform = 'scale(' + val + ')';
        
        if (!scale) {

          element.style.webkitTransform = 'translate3d(' + x + '%, ' + y + '%, 0)';

        } else {

          element.style.webkitTransform = 'scale(' + x + ')';

        }

  };

  Layerlax.prototype.enable = function() {
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    requestAnimationFrame(this.onAnimationFrame.bind(this));
  };

  Layerlax.prototype.initialise = function() {

    this.enable();

  };

  // Expose Parallax
  window['Layerlax'] = Layerlax;

})(window, document);