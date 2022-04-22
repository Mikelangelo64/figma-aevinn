'use strict'

$(document).ready(function () {
    $('.slider').slick({
        //appendArrows: $('.reviews-content__slider__controls'),
        prevArrow: $('.reviews-content__slider__prev'),
        nextArrow: $('.reviews-content__slider__next'),
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        draggeble: false,
        waitForAnimate: false,
        variableWidth: false,
        infinite: false,
        responsive:[
            {
                breakpoint: 940,
                settings:{
                    slidesToShow: 2,
                }
            },{
                breakpoint: 660,
                settings:{
                    slidesToShow: 1,
                }
            },
            
        ] 
    })

    //scrollTo from menu/footer

    $('li > .menu__link').click(function(event){
        onMenuLinkClick(event)
        
    })
    $('.menu__list li > .menu__link').click(function(event){
        onHeaderMenuLinkClick(event, this)
    })

    function onHeaderMenuLinkClick(event, link){
        if(document.documentElement.clientWidth > 940){
            if(!$(link).hasClass('_active-page')){
                $('li > .menu__link').not(link).removeClass('_active-page')
                $(link).addClass('_active-page')
            }
            
        }
    }

    function onMenuLinkClick(event){
        const menuLink = event.target

        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = $(menuLink.dataset.goto).get(0)
            //console.log($(menuLink.dataset.goto).get(0))
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY - Math.round($('.header').outerHeight())
            //const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY /* - document.querySelector('header').offsetHeight */
            

            if($('.burger').hasClass('_menu__active')){
                $('.burger').removeClass('_menu__active')
                $('.menu').removeClass('_menu__active')
                $('.header').removeClass('_menu__active')
                $('body').removeClass('_lock')

                if(document.documentElement.clientWidth < 660){
                    $('.header-content__log__in__btn').removeClass('_menu__active')
                }
            }
    
            window.scrollTo({
                top: gotoBlockValue,
                behavior: 'smooth'
            })
        }

        

        event.preventDefault()
    }

    //scrollToUp
    $('.reviews-content__btn__to__up').click(function(e) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $('.main').offset().top
            
        }, 500)
        
        e.preventDefault()
    })
   
    //burger
    $('.burger').click(function(e){
        $(this).toggleClass('_menu__active')
        $('.menu').toggleClass('_menu__active')
        $('.header').toggleClass('_menu__active')

        $('body').toggleClass('_lock')
        if(document.documentElement.clientWidth < 660){
            $('.header-content__log__in__btn').toggleClass('_menu__active')
        }
    })

    //header
    /* $(window).bind('mousewheel', function(event){
        console.log('scrolY', scrollY)
        console.log('getboundclrect',$('.header').get(0).getBoundingClientRect().top)
        console.log('pos',$('.header').position().top)
        console.log('offset',$('.header').offset().top)  

        if($('.header').offset().top - 100 > $('.header').position().top){
            $('.header').addClass('_header__scroll')
        } else if($('.header').offset().top - 100 <= $('.header').position().top){
            $('.header').removeClass('_header__scroll')
        }
    }) */

    const headerInitialPos = $('.header').offset().top

    $(window).scroll(function(){
        const scrolled = $(this).scrollTop()

        if(document.documentElement.clientWidth > 940){
            if(headerInitialPos + 108 < scrolled){
                $('.header').addClass('_header__scroll')
            } else{
                $('.header').removeClass('_header__scroll')
            }
        }
        
    })

    //spoiler footer
    $('.footer-list-column__title').click(function(e) { 
        $('.footer-list-column__title').not($(this)).removeClass('_footer-list__open').next().slideUp(300)

        $(this).toggleClass('_footer-list__open').next().slideToggle(300)
     })

});