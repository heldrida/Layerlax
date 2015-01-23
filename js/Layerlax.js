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
    this.z = 0;
    this.w = 0;
    this.h = 0;
    this.ix = 0;
    this.iy = 0;
    this.ax = 0;
    this.ay = 0;

    // velocity
    this.vx = 0;
    this.vy = 0;
    this.vz = {}; // map, because scalable elements have different values

    // friction
    this.friction = 0.01;

    // timeout
    this.timeout = null;

    // locker
    this.lock = false;

    // throttle delay
    this.throttleDelay = 12; // in ms (timer, for setPositionScaling function call. Optimization!)

    // inverse X/Y
    this.inverse = true;

    // anchor center
    this.anchorCenter = false;

    // Initialise
    this.initialise();

  }

  Layerlax.prototype.onMouseMove = function (event) {

    clearInterval(this.timeout);

    this.timeout = setTimeout(function () {

      this.bounds = this.element.getBoundingClientRect();
   
      // mouse cursor position
      this.x = this.bounds.left;    
      this.y = this.bounds.top;
      
      // size
      this.w = this.bounds.width;
      this.h = this.bounds.height;

      // center
      this.cx = this.w / 2;
      this.cy = this.h / 2;

      // amount from center
      this.ix = (event.clientX - this.x - this.cx) / this.cx;
      this.iy = (event.clientY - this.y - this.cy) / this.cy;

      // amount from top/left
      this.ax = event.clientX / this.w;
      this.ay = event.clientY / this.h;

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


    }.bind(this), this.throttleDelay);

  };

  Layerlax.prototype.onAnimationFrame = function () {

    for (var i = 0; i < this.layers.length; i++) {

      var z =  Math.abs(this.ix);
      // z = z + 0.5;
      // z = Math.min(z, 1.12);
      // z = Math.max(z, 1);

      if (this.anchorCenter !== true) {
        this.setStyle(this.layers[i], this.ax, this.ay, z);
      } else {
        this.setStyle(this.layers[i], this.ix, this.iy, z);        
      }

    }

    this.requestAnimationFrame = requestAnimationFrame(this.onAnimationFrame.bind(this));

  };

  Layerlax.prototype.setStyle = function (element, x, y, z) {

    var val = (parseFloat(x) > 0 ? x : 1),
        depth = element.getAttribute('data-depth'),
        scale = element.getAttribute('data-scale');

        this.vx += (x - this.vx) * this.friction;
        this.vy += (y - this.vy) *  this.friction;

        if (scale) {

          var layer = 'layer_' + element.getAttribute('data-layer'),
              zoomIn = parseFloat(element.getAttribute('data-zoom-in')),
              zoomOut = parseFloat(element.getAttribute('data-zoom-out'));

          if (!this.vz.hasOwnProperty(layer)) {
            this.vz[layer] = 0;
          }

          // set Z boundaries
          z = Math.min(z, zoomOut);
          z = Math.max(z, zoomIn);

          this.vz[layer] += (z - this.vz[layer]) * this.friction;

        }

        this.xOffset = this.vx * depth; 
        this.yOffset = this.vy * depth;

        if (this.inverse) {
          this.xOffset *= -1;
          this.yOffset *= -1;
        }

        if (!scale) {

          element.style.webkitTransform = 'translate3d(' + this.xOffset + '%, ' + this.yOffset + '%, 0)';
          element.style.MozTransform = 'translate3d(' + this.xOffset + '%, ' + this.yOffset + '%, 0)';
          element.style.msTransform = 'translate3d(' + this.xOffset + '%, ' + this.yOffset + '%, 0)';
          element.style.oTransform = 'translate3d(' + this.xOffset + '%, ' + this.yOffset + '%, 0)';
          element.style.transform = 'translate3d(' + this.xOffset + '%, ' + this.yOffset + '%, 0)';

        } else {

          element.style.webkitTransform = 'scale(' + this.vz[layer] + ') translate3d(' + this.xOffset + '%, ' + this.yOffset + '%, 0)';
          element.style.MozTransform = 'scale(' + this.vz[layer] + ') translate3d(' + this.xOffset + '%, ' + this.yOffset + '%, 0)';
          element.style.msTransform = 'scale(' + this.vz[layer] + ') translate3d(' + this.xOffset + '%, ' + this.yOffset + '%, 0)';
          element.style.oTransform = 'scale(' + this.vz[layer] + ') translate3d(' + this.xOffset + '%, ' + this.yOffset + '%, 0)';
          element.style.transform = 'scale(' + this.vz[layer] + ') translate3d(' + this.xOffset + '%, ' + this.yOffset + '%, 0)';

        }

  };

  Layerlax.prototype.enable = function () {
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    requestAnimationFrame(this.onAnimationFrame.bind(this));
  };

  Layerlax.prototype.destroy = function () {

    // DOM Context
    delete this.element;
    delete this.layers;

  };

  Layerlax.prototype.initialise = function () {

    this.enable();

  };

  // Expose Parallax
  window['Layerlax'] = Layerlax;

})(window, document);