The JavaScript SVG path animation library for the modern web. 

一个用来使用SVG的路径(path)来制作动画效果的插件

### 关于cobrasvg

cobrasvg主要是用来制作SVG路径动画的即path animation。路径动画主要包括以下三个方面：

* 利用stroke的dashoffset和dasharray两个属性，来制作路径动画；
* 配合透明度来制作填充动画

可以先来看看下面几个演示效果

[demo1](http://jsbin.com/lafaqi/1/){:target="_blank"},[demo2](http://jsbin.com/yisebo/1/){:target="_blank"},[demo3](http://jsbin.com/gixike/1/){:target="_blank"}

### Version

0.01

### 兼容性

根据caniuse网站上的数据，目前大部分的浏览器都支持SVG的使用。PC平台IE9以上才支持SVG，移动端上iOS都支持，Android平台2.3以上都支持SVG。

对于不支持SVG元素的浏览器，插件会自动在html文件的html标签上添加一个noSvg类。这样就可以为不支持SVG元素的浏览器来降级，可以显示一张jpg或者是png图片，比如：

	<svg xmlns="http://www.w3.org/2000/svg" id="svg" class="svg" viewBox="0 0 960 480" preserveAspectRatio="xMinYMin meet">
    <path fill="..." stroke="..." stroke-width="..."/>
    <path fill="..." stroke="..." stroke-width="..."/>
    <path fill="..." stroke="..." stroke-width="..."/>
    <path fill="..." stroke="..." stroke-width="..."/>
    </svg>
    <img src="nosvg.png" class="notSvg"/>
    
在css中就可以这样来定义：
	
	//正常情况下，图片是不显示的
	.notSvg {
		display:none;
	}
	
	//不支持svg，就显示指定的图片
	.noSvg .notSvg {
		display:block;
	}
	

### 使用指南

使用插件制作path动画之前，需要注意一下几点：

* 为了使用path的stoke属性来产生画笔动画效果，SVG文件必须有stroke的属性
* 要制作填充的动画效果，SVG文件必须有fill的属性
* 当然SVG文件的路径必须定义在path元素中

#### 插件配置选项

	cobrasvg.prototype.options = {
		elementId: "svg",    //指定要产生path动画效果的SVG元素的ID
		fillPath: true       //是否开启填充的动画效果
	}


#### 基本的HTML和SVG结构

在插入svg文件的时候，需要给svg文件定义一个ID，这样方便js来处理。

	<svg xmlns="http://www.w3.org/2000/svg" id="svg" class="svg" viewBox="0 0 960 480" preserveAspectRatio="xMinYMin meet">
    <path fill="..." stroke="..." stroke-width="..."/>
    <path fill="..." stroke="..." stroke-width="..."/>
    <path fill="..." stroke="..." stroke-width="..."/>
    <path fill="..." stroke="..." stroke-width="..."/>
    </svg>
    
然后在html文件中引入cobrasvg.js文件，在js文件中创建一个动画的实例就可以制作动画效果啦，如下所示：

	<script src="path/to/cobrasvg.js"></script>
    <script>
     (function() {
	    var myAnimation = new cobrasvg({
	      elementId: "svg"
	    });
	  })();
    </script>
    
如果你不需要开启填充的动画效果，只需要把**fillPath**的值设置为false就可以了如下所示：

	<script src="path/to/cobrasvg.js"></script>
    <script>
     (function() {
	    var myAnimation = new cobrasvg({
	      elementId: "svg",
	      fillPath:false
	    });
	  })();
    </script>
    
就是这么简单，然后刷新页面，一个优雅的svg动画效果就自动制作完成了。


      
   






