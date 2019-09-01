// 文档加载完才开始
$(function() {
	function resize() {
		//获得屏幕宽度
		var windowWidth = $(window).width();
		// 判断屏幕是否是最小的那个，768是最下的
		var isSmallScreen = windowWidth < 768;
		// 取得item的类名，用each进行遍历，其中i是变量个数，item是每一项
		$('#main_adv>.carousel-inner>.item').each(function(i, item) {
			// 获得的是dom对象,需要转换成jq的
			var $item = $(item);
			// 取得data那里的值,并用三元进行判断赋值
			var imgSrc = $item.data(isSmallScreen ? 'img-xs' : 'img-lg');
			// 设置高度
			$item.css('backgroundImage', 'url("' + imgSrc + '")');
			// 因为用背景图的话，后面最小的时候，背景会被压缩，高度不变，宽度小了，
			// 所以需要在小屏幕的时候，使用img的图片设置进去
			if (isSmallScreen) {
				$item.html('<img src="' + imgSrc + '" alt="">');
			} else {
				// 小屏幕为空,下面两个是一样的
				// $item.html();
				$item.empty();
			}
		});
	}
	// 这里需要先给它使用一次
	// 可以直接调用resize()；
	// 也可以使用.trigger('resize');
	$(window).on('resize', resize).trigger('resize');
	// tooltip插件
	$('[data-toggle="tooltip"]').tooltip()
	// 动态获取横向
	var $ul = $('.nav-tabs');
	// 因为默认有一个20的padding-left,所以这里比他设置多一点
	var widthSum = 30;
	$ul.children().each(function(i, item) {
		widthSum += item.clientWidth;
	})
	if (widthSum > $(window).width()) {
		$ul
			.css('width', widthSum)
			.parent().css('overflow-x', 'scroll'); //并设置横向滚动条
	}
	// 新闻版块,为a注册点击事件
	var $newsTitle = $('.news_title');
	$('#main_news .nav-pills a').on('click', function() {
		// 获取当前点击元素
		var $this = $(this);
		var title = $this.data('title');
		$newsTitle.text(title);
	})
	// 注册滑动事件，轮播版块
	// 首先获取元素，是轮播的父类
	var $carousel = $('.carousel');
	var startX;
	var endX;
	var offset = 50;
	// 接着为这个元素注册开始滑动事件，使用jq的方式 ,touchstart为手指摸到元素的时候	
	$carousel.on('touchstart', function(e) {
		// jq对象里面的e的那个鼠标坐标取得的位置跟原本的不一样，所以是下面这么一大串，不记得就打印出来要
		// console.log(e)
		// console.log(e.originalEvent.touches[0].clientX) 
		startX = e.originalEvent.touches[0].clientX;
		console.log(startX)
	})
	//注册结束滑动事件,正常来说应该是这个，但是当鼠标出去的那一瞬间，已经不载轮播里面，所以这样是取不到值的
	// $carousel.on('touchend',function(e){
	// 		startX=e.originalEvent.touches[0].clientX;
	// 	})
	// 所以应该是注册手指滑动事件,取最后一个滑动位置
	$carousel.on('touchmove', function(e) {
		endX = e.originalEvent.touches[0].clientX;
	})
	// 所以到这里之后，上面那个是所有移动的值，放到这里后，才为最后一瞬间的值
	$carousel.on('touchend', function(e) {
		console.log(endX);
		var distance = Math.abs(startX - endX);
		// 如果移动的距离比我门设置的岔门还大，就给它移动
		if (distance>offset){
			// 在bootstrap中给了我么方法
			// 我们也可以自己获取页面上a的，然后进行选择哪一个
			// $carousel.carousel(startX<endX?'prev':'next');
			// 原本应该是上面那个，但是，这样写的话，如果页面上有两个轮播图的话，会同时进行移动
			// 所提应获取当前this对象，谁移动的了，就给谁
			$(this).carousel(startX<endX?'prev':'next');
		}
	})
})
