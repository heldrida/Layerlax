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

    console.log('onMouseMove()');

    this.bounds = this.element.getBoundingClientRect();
 
    // mouse cursor position
    this.x = this.bounds.left;    
    this.y = this.bounds.top;
    
    // size
    this.w = this.bounds.width;
    this.h = this.bounds.height;

    // center
    this.cx = this.w / 2;
    this.cy = this.y / 2;

    // amount from center
    this.ix = (event.clientX - this.x - this.cx) / this.cx;
    this.iy = (event.clientY - this.y - this.cy) / this.cy;

    // clip to element bounds
    this.ix = Math.max(this.ix, -1);
    this.ix = Math.min(this.ix, 1);
    this.iy = Math.max(this.ix, -1);
    this.iy = Math.min(this.ix, 1);

  };

  Layerlax.prototype.onAnimationFrame = function () {

    console.log('onAnimationFrame()');

    console.log('this.ix: ', this.ix);

    this.requestAnimationFrame = requestAnimationFrame(this.onAnimationFrame.bind(this));

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