;(function(window, document, undefined) {

  // Strict Mode
  'use strict';

  function Layerlax(element) {

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

  	// center
  	this.cx = this.w / 2;
  	this.cy = this.y / 2;

  };

  Layerlax.prototype.enable = function() {
    window.addEventListener('mousemove', this.onMouseMove);
    requestAnimationFrame(this.onAnimationFrame);
  };

  Layerlax.prototype.initialise = function() {

  	this.enable();

  };

  // Expose Parallax
  window.Layerlax = Layerlax;

})(window, document);