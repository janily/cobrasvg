The JavaScript SVG path animation library for the modern web. 

一个用来使用SVG的路径(path)来制作动画效果的插件

### 关于cobrasvg

cobrasvg主要是用来制作SVG路径动画的即path animation。路径动画主要包括以下三个方面：

* 利用stroke的dashoffset和dasharray两个属性，来制作路径动画；
* 配合透明度来制作渐隐渐现动画

### Version

0.01

### 使用指南

使用插件制作path动画之前，需要注意一下几点：

* 为了使用path的stoke属性来产生画笔动画效果，SVG文件必须有stroke的属性
* 要制作渐现的动画效果，SVG文件必须有fill的属性
* 当然SVG文件的路径必须定义在path元素中

#### 基本的HTML和SVG结构

在插入svg文件的时候，需要给svg文件定义一个ID，这样方便js来处理。

	<svg xmlns="http://www.w3.org/2000/svg" id="svg" class="svg" viewBox="0 0 960 480" preserveAspectRatio="xMinYMin meet">
    <path fill="..." stroke="..." stroke-width="..."/>
    <path fill="..." stroke="..." stroke-width="..."/>
    <path fill="..." stroke="..." stroke-width="..."/>
    <path fill="..." stroke="..." stroke-width="..."/>
    </svg>
    
然后在html文件中引入cobrasvg.js文件，在js文件中创建一个动画的实例就可以制作动画效果啦，如下所示：

	<script src="path/to/svgdrawfill.js"></script>
    <script>
     (function() {
	    var myAnimation = new cobrasvg({
	      elementId: "svg"
	    });
	  })();
    </script>
    
就是这么简单，然后刷新页面，一个优雅的svg动画效果就自动制作完成了。


      
   






