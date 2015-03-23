/**
 * cobrasvg
 *
 *
 * 一个用来使用SVG的路径(path)来制作动画效果的插件
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2015,janily
 *
 */

(function(window) {

	'use strict';

	/**
	 * 针对不支持SVG的浏览器的检测，如果不支持svg的话，会在html元素上添加一个noSvg的class，反之则添加一个svg的class
	 * 可以使用这个class来做一些降级处理，如不支持svg的浏览器，则直接显示一张png或者是jpg图片
	 * 参考：http://stackoverflow.com/questions/654112/how-do-you-detect-support-for-vml-or-svg-in-a-browser
	 */

	cobrasvg.prototype._supportSvg = function() {
		return !!document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
	}

	/* 探测浏览器种类 
	 * 使用JavaScript来检测浏览器动画事件是否完成
	 * 参考http://davidwalsh.name/css-animation-callback
	 */

	function whichTransitionEvent() {
		var t;
		var el = document.createElement('fakeelement');
		var transitions = {
			'transition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'MozTransition': 'transitionend',
			'WebkitTransition': 'webkitTransitionEnd'
		}

		for (t in transitions) {
			if (el.style[t] !== undefined) {
				return transitions[t];
			}
		}
	}

	var transitionEvent = whichTransitionEvent();
	/**
	 * 扩展
	 */

	function extend(a, b) {
		for (var key in b) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}

	/**
	 * 构造函数
	 */

	function cobrasvg(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
	}

	/**
	 * 配置选项
	 * 指定要产生动画效果SVG元素的ID，默认为svg
	 * 是否开启填充动画效果
	 */

	cobrasvg.prototype.options = {
		elementId: "svg",    //指定要产生path动画效果的SVG元素的ID
		fillPath: true       //是否开启填充的动画效果
	}

	/**
	 * cobrasvg _init
	 * 初始化方法
	 */

	cobrasvg.prototype._init = function() {
		if (!this._supportSvg()) {
			document.documentElement.className = "noSvg";
		} else {
			document.documentElement.className = "svg";
		}
		this.svg = document.getElementById(this.options.elementId);
		this.fillDraw = this.options.fillPath;
		this.paths = this.svg.querySelectorAll("path");
		this._initAnimation();
	}

	/**
	 * cobrasvg _initAnimation()
	 * 动画方法，主要是初始化一些属性的值，首先是获取path元素的长度；
	 * 然后设置path的透明度。
	 */
	cobrasvg.prototype._initAnimation = function() {
		for (var i = 0; i < this.paths.length; i++) {
			var path = this.paths[i];
			var length = path.getTotalLength();

			// 重置透明度
			path.style.fillOpacity = 0;
			path.style.strokeOpacity = 1;

			// 重置transition
			path.style.transition = path.style.transitionEvent = "none";

			// 重置path的strokeDasharray和strokeDashoffset属性
			path.style.strokeDasharray = length + " " + length;
			path.style.strokeDashoffset = length;
			path.getBoundingClientRect();

			// 应用transition
			path.style.transition = path.style.transitionEvent = "stroke-dashoffset 2s ease-in-out";

			// 设置strokeDashoffset的值为0
			path.style.strokeDashoffset = 0;

			// 是否填充路径
			if(this.fillDraw == true) {
				this._fillPath(path);
			}
		}
	}

	/**
	 * cobrasvg _fillPath()
	 *
	 * 重置transition并设置路径的透明度
	 *
	 */

	cobrasvg.prototype._fillPath = function(path) {
		path.addEventListener(transitionEvent, function() {
			// 重置transition
			path.style.transition = path.style.transitionEvent = "none";
			path.style.transition = path.style.transitionEvent = "fill-opacity 1s ease-in-out, stroke-opacity 1s ease-in-out";

			// 修改透明度
			path.style.fillOpacity = 1;
			path.style.strokeOpacity = 0;
		});
	}

	/**
	 * 添加命名空间
	 */

	window.cobrasvg = cobrasvg;

})(window);