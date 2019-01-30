let scrollBarWidth = 0;
const body = document.getElementsByTagName("body")[0];
const cssmobile = document.getElementById("cssmobile");
const csssmall460 = document.getElementById("csssmall460");
const cssmedium768 = document.getElementById("cssmedium768");
const csslarge992 = document.getElementById("csslarge992");
const cssxlarge1260 = document.getElementById("cssxlarge1260");
const cssmediabody = document.getElementById("cssmediabody");

// inform visitor about cookie usage
// using cookie consent plugin
window.addEventListener("load", function(){
window.cookieconsent.initialise({
  "palette": {
        "popup": {
        "background": "#343c66",
        "text": "#cfcfe8"
        },
        "button": {
        "background": "#f71559"
        }
    },
  "theme": "classic",
  "position": "bottom-left",
  "type": "opt-in",
  "content": {
    "href": "http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm",
   "cookie": {
       "domain" : "file://"
   } 
  }
})});

// setup banner carousel on document load
$(document).ready(function() {

    $(".main-banner").removeClass("initial-hidden");
    const owl = $('.owl-carousel');
    owl.owlCarousel({
        items: 1,
        autoplay: true,
        loop: true,
        responsiveRefreshRate: 10000
    });
    owl.trigger('play.owl.autoplay',[4500])
    
    // prepare sticky header
    const header = $(".container-header");
    const headerClone = $(".container-header").clone(true, true).attr("class", "header-clone");
    headerClone.insertBefore(header);
    
    scrollBarWidth = getScrollbarWidth();
    const primaryStart = primaryWindowSize();
    cssmediabody.setAttribute("disabled", true);
    resizeHandler("startup", primaryStart, primaryStart);

}); 

window.onresize = function(event) {
    const primaryStart = primaryWindowSize(true);
    resizeHandler("resize", primaryStart, primaryStart);
};


// show hide header and/menu depending on scroll direction
$(function () {
    
    let position = $(window).scrollTop();

    $(window).scroll(function () {
        let scroll = $(window).scrollTop();

        // const primaryWidth = primaryWindowSize();


        if ( (scroll < position) && (position >= 400) )  {
             $('.header-clone').addClass("header-clone-slideDown");
         } else {
            if ((scroll > position) && !$('.hamburgericonmenuwrapper').hasClass("open") ) {
                if( $('.header-clone').length ) 
                {
                    $('.header-clone').removeClass("header-clone-slideDown");
                }
            } else if (scroll === 0) {
                $('.header-clone').removeClass("header-clone-slideDown");
            }
        }
        
        position = $(window).scrollTop();
    });  
}); 




// Work out the primary content div size for CSS application

  function primaryWindowSize(includeScroll = true) {

    let $primarySize = 0;
    if (includeScroll) {
        $primarySize = $(".container-primary").width() + scrollBarWidth;
    } else {
        $primarySize = $(".container-primary").width();
    } 

    if ($primarySize >= 1260) {
        return $resize = "xlarge1260";
    } else 
    if ($primarySize >= 992) {
        return $resize = "large992";
    } else 
    if ($primarySize >= 768) {
        return $resize = "medium768";
    }
    if ($primarySize >= 460) {
        return $resize = "small460";
    } else {
        return $resize = "mobile";
    }
  }

// modify elements as necessary based on the resize of the primary content container
function resizeHandler(action, beforeSize, afterSize) {
    let $primarySize = $(".container-primary").width();
    let $sidebarSize = $(".container-sidebar").width();
    applyCSS(afterSize);
    $('.owl-carousel').trigger('refresh.owl.carousel');  
}

function applyCSS(level) {
    if (level === "mobile")
    {
        cssxlarge1260.setAttribute("disabled", true);
        csslarge992.setAttribute("disabled", true);
        cssmedium768.setAttribute("disabled", true);
        csssmall460.setAttribute("disabled", true);
    }
    if (level === "small460")
    {
        cssxlarge1260.setAttribute("disabled", true);
        csslarge992.setAttribute("disabled", true);
        cssmedium768.setAttribute("disabled", true);
        csssmall460.removeAttribute("disabled");
    }
    if (level === "medium768")
    {
        cssxlarge1260.setAttribute("disabled", true);
        csslarge992.setAttribute("disabled", true);
        csssmall460.removeAttribute("disabled");
        cssmedium768.removeAttribute("disabled");
    }
    if (level === "large992")
    {
        cssxlarge1260.setAttribute("disabled", true);
        csssmall460.removeAttribute("disabled");
        cssmedium768.removeAttribute("disabled");
        csslarge992.removeAttribute("disabled");
    }
    if (level === "xlarge1260")
    {
        csssmall460.removeAttribute("disabled");
        cssmedium768.removeAttribute("disabled");
        csslarge992.removeAttribute("disabled");
        cssxlarge1260.removeAttribute("disabled");
    }
}

function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.display = "hidden";
    outer.style.width = "100px";

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    inner.style.display = "hidden";
    outer.appendChild(inner);        

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
}

