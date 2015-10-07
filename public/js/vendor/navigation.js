
// Gwazoo Main
var ww = document.body.clientWidth;

$(document).ready(function() {
	$(".nav li a, .nav2 li a").each(function() {
		if ($(this).next().length > 0) {
			$(this).addClass("parent");
		};
	})
	
	$(".toggleMenu").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(".nav, .nav2").toggle();
	});
	adjustMenu();
})

// For Gwazoo.com only when screen smaller than 768px
$(window).bind('resize orientationchange', function() {
	ww = document.body.clientWidth;
	adjustMenu();
});

var adjustMenu = function() {
	if (ww < 768) {
		$(".toggleMenu").css("display", "inline-block");
		if (!$(".toggleMenu").hasClass("active")) {
			$(".nav").hide();
		} else {
			$(".nav").show();
		}
		$(".nav li").unbind('mouseenter mouseleave');
		$(".nav li a.parent").unbind('click').bind('click', function(e) {
			// must be attached to anchor element to prevent bubbling
			e.preventDefault();
			$(this).parent("li").toggleClass("hover");
		});
	} 
	// All other screen sizes
	else if (ww >= 768) {
		$(".toggleMenu").css("display", "none");
		$(".nav, .nav2").show();
		$(".nav li, .nav2 li").removeClass("hover");
		$(".nav li a, .nav2 li a").unbind('click');
		$(".nav li, .nav2 li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
		 	// must be attached to li so that mouseleave is not triggered when hover over submenu
		 	$(this).toggleClass('hover');
		});
	}
}

