;(function($){

	const settings = {
		shrinktogglerAfter: 'firstpage', // shrink hamburgerui UL to just show last LI with hamburger icon when user scrolls the page down? 'firstpage' or px number (ie: 200)
		dismissmenuDelay: 200 // delay in miliseconds after user clicks on full screen menu before hiding it
	}

	let $beforeSize = "default"
	let $preMenuLoadSize = $beforeSize;
	let $afterSize = "default"

	function intializeMenu(){
		const $body = $("body")
		const $headerRight = $(".container-header-right")
		const $headerLeft = $(".container-header-left")
		const $overlay = $(".overlay")
		const $narrowmenu = $(".narrow-menu")
		const $sidebarMenuButton = $(".container-sidebar-float a");
		const $menuwrapper = $('.hamburgericonmenuwrapper')
		const $sidebarmenu = $('.container-sidebar')
		const $sidebarmenufloat = $('.container-sidebar-float')
		const $hamburgerui = $('.hamburgerui')
		const $toggler = $('.navtoggler-parent-a')
		let scrolltop = 0
		let shrinkafter = 0
		let shrinktimer = 0
		let dismisstimer = 0
		let primaryWidth = 0
		let sidebarWidth = 0
		let headerLeftWidth = ""
		let headerRightWidth = ""

		// on off for menu button
		$toggler.on("click", (e) => {
			menuToggle(e)
		});

		$sidebarMenuButton.on("click", (e) => {
			e.preventDefault()
			menuToggle(e);
		});
		
		// If the user clicks on the primary content window when the menu is open
		// Close the menu
		$(".overlay").on("click", (e) => {
			menuToggle(e);
		})

		// if the window is resized whilst the menu is open
		// close it so that the media queries resize properly
		$( window ).resize(function(e) {
			if ($menuwrapper.hasClass("open")) {
				menuToggle(e)
			}  
		});

		// toggle the menu button on and off and display or close menu
		function menuToggle(e) {
			$beforeSize =  primaryWindowSize(false);
			primaryWidth = $(".container-primary").width();
			$('.hamburgericonmenuwrapper').toggleClass("open")
			$overlay.addClass("overlay-show")
			e.preventDefault()
			if ($menuwrapper.hasClass("open")) {
				$body.toggleClass("hideScroller")
				$sidebarmenu.removeClass('container-sidebar-active-show-max container-sidebar-active-show-small container-sidebar-active-show-large')
				$sidebarmenufloat.removeClass('container-sidebar-active-show-max container-sidebar-active-show-small container-sidebar-active-show-large')
				$sidebarmenu.removeAttr("style");
				$sidebarmenufloat.removeAttr("style");
				$(".container-header-left").removeAttr("style");
				$headerRight.removeAttr("style");
				if ($beforeSize === "xlarge1260" || $beforeSize === "large992") {
					if (primaryWidth >= 1325) {
						$sidebarmenu.addClass('container-sidebar-active-show-large display-flex')
						$sidebarmenufloat.addClass('container-sidebar-active-show-large')
						$(".container-header-right").addClass('container-sidebar-active-show-large')
						$(".container-header-left").addClass('container-sidebar-active-adjust-header-large')					
					} else if (primaryWidth <= 1250) {
						$sidebarmenu.addClass('container-sidebar-active-show-small display-flex')
						$sidebarmenufloat.addClass('container-sidebar-active-show-small container-sidebar-float-force')
						$(".container-header-right").addClass('container-sidebar-active-show-small')
						$(".container-header-left").addClass('container-sidebar-active-adjust-header-small')
					} else {

						sidebarWidth = primaryWidth - 992 + getScrollbarWidth();
						const sbStyle = `${sidebarWidth}px`;
						headerRightWidth = `${sidebarWidth}px`;
						headerLeftWidth = "992px";
						$sidebarmenu.css("width", sbStyle.toString());
						$sidebarmenufloat.css("width", sbStyle.toString());
						$sidebarmenu.css("min-width", sbStyle.toString());
						$sidebarmenufloat.css("min-width", sbStyle.toString());
						$(".container-header-left").css("width", headerLeftWidth.toString());
						$(".container-header-left").css("min-width", headerLeftWidth.toString());
						$(".container-header-right").css("width", headerRightWidth.toString());	
						$(".container-header-right").css("min-width", headerRightWidth.toString());							
						$sidebarmenu.addClass('display-flex')
						$sidebarmenufloat.addClass('container-sidebar-float-force')
						$(".container-header-right").addClass('container-sidebar-active-show-large')
						$(".container-header-left").addClass('container-sidebar-active-adjust-header-large')
					}
				} else if($beforeSize === "medium768" || $beforeSize === "small460") {
					$sidebarmenu.addClass('container-sidebar-active-show-small display-flex')
					$sidebarmenufloat.addClass('container-sidebar-active-show-small container-sidebar-float-force')
					$(".container-header-right").addClass('container-sidebar-active-show-small')
					$(".container-header-left").addClass('container-sidebar-active-adjust-header-small')
				} else {
					$sidebarmenu.addClass('container-sidebar-active-show-max display-flex')
					$sidebarmenufloat.addClass('container-sidebar-active-show-max')
				}
				setTimeout(function() {
					$afterSize = primaryWindowSize(false);
					resizeHandler("open", $beforeSize, $afterSize);
				}, 500);
				
				$preMenuLoadSize = $beforeSize;

			}
			else 
			{
				$sidebarmenu.removeAttr("style");
				$sidebarmenufloat.removeAttr("style");
				$(".container-header-left").removeAttr("style");
				$(".container-header-right").removeAttr("style");
				$sidebarmenu.removeClass('container-sidebar-active-show-max container-sidebar-active-show-small container-sidebar-active-show-large')
				$sidebarmenufloat.removeClass('container-sidebar-active-show-max container-sidebar-active-show-small container-sidebar-active-show-large container-sidebar-float-force')
				$(".container-header-left").removeClass('container-sidebar-active-adjust-header-large container-sidebar-active-adjust-header-small')
				$(".container-header-right").removeClass('container-sidebar-active-show-small container-sidebar-active-show-large')
				$afterSize =  primaryWindowSize(false);

				resizeHandler("close", $beforeSize, $afterSize);
				toggle($body, "hideScroller");
				$overlay.removeClass("overlay-show");
			}
		}

		// helper to add or remove css classes (REVERSES CURRENT STATE)
		function toggle (elementName, className) {
			elementName.toggleClass(className)
		}

		$sidebarmenu.on('click', function(e){
			clearTimeout(dismisstimer)
			dismisstimer = setTimeout(function(){
				$menuwrapper.removeClass('open')
				$sidebarmenu.hide("slide", { direction: "right" }, 1200);				
			}, settings.dismissmenuDelay)
		})

		if ($menuwrapper.length == 1 && settings.shrinktogglerAfter != 0){
			var shrinktogglerAfter = settings.shrinktogglerAfter
			$(window).on('scroll resize', function(e){
				clearTimeout(shrinktimer)
				shrinktimer = setTimeout(function(){
					scrolltop = $(window).scrollTop()
					shrinkafter = (shrinktogglerAfter == 'firstpage')? $(window).height() : parseInt(shrinktogglerAfter)
					if ( scrolltop > shrinkafter && !$hamburgerui.hasClass('shrink') ){
						$hamburgerui.addClass('shrink')
					}
					else if ( scrolltop < shrinkafter && $hamburgerui.hasClass('shrink') ){
						$hamburgerui.removeClass('shrink')
					}
				}, 50)
			})
		}
	}

	$(function(){ // on DOM load
		intializeMenu()
	})

}(jQuery))