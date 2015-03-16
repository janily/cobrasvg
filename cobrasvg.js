/**
 * cobrasvg
 *
 * 
 * 一个用来使用SVG的路径(path)来制作动画效果的插件
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2015, Call Me janily
 * 
 */

 (function( window ){

  'use strict';

  /**
   * 
   * 扩展
   */

  function extend( a, b ) {
    for( var key in b ) { 
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  /**
   * 
   * 构造函数
   */

  function cobrasvg( options ) {
    this.options = extend( {}, this.options );
    extend( this.options, options );
    this._init();
  }

  /**
   * 
   *
   * 指定要产生动画效果SVG元素的ID，默认为svg
   * 
   */

  cobrasvg.prototype.options = {
    elementId : "svg"
  }

  /**
   * cobrasvg _init
   *
   * 
   * 初始化方法
   */

  cobrasvg.prototype._init = function() {
  	  this.svg = document.getElementById(this.options.elementId);
      this.paths = this.svg.querySelectorAll("path");
      this._initAnimation();
      if (!this._initNosupportSvg()) {
	      document.documentElement.className = "noSvg";
	  } else {
	  	  document.documentElement.className = "svg";
	  }
  }

  /**
 * cobrasvg _initAnimation()
 * 动画方法，主要是初始化一些属性的值，首先是获取path元素的长度；
 * 然后设置path的透明度。
 * 
 * 
 * 
 * 
 */
 cobrasvg.prototype._initAnimation = function() {
  for ( var i = 0; i < this.paths.length; i++ ) {
    var path = this.paths[i];
    var length = path.getTotalLength();

    // 重置透明度
    path.style.fillOpacity = 0;
    path.style.strokeOpacity = 1;

    // 重置transition
    path.style.transition = path.style.WebkitTransition = "none";

    // 重置path的strokeDasharray和strokeDashoffset属性
    path.style.strokeDasharray = length + " " + length;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect();

    // 应用transition
    path.style.transition = path.style.WebkitTransition = "stroke-dashoffset 2s ease-in-out";

    // 设置strokeDashoffset的值为0
    path.style.strokeDashoffset = 0;

    // 填充路径
    this._fillPath( path );
  }
}

  /**
   * 
   * 针对不支持SVG的浏览器的检测，如果不支持svg的话，会在html元素上添加一个noSvg的唱class，反之则添加一个svg的class
   * 可以使用这个个class来做一些降级处理，如不支持svg的浏览器，则直接显示一张png或者是jpg图片
   */

  cobrasvg.prototype._initNosupportSvg = function() {
	return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
  } 

  /**
   * 添加命名空间
   */

  window.cobrasvg = cobrasvg;

})( window );





