//= require_tree .

$(document).ready(function(){

  $(window).load(function(){
    $('body.index .project, .hero').addClass('animate');
  });

  $('.menu-btn').click(function(){
    $(this).toggleClass('open');
    $('header').toggleClass('open');
  });

  $('body:not(.index) .logo, body:not(.index) .menu-btn .work').click(function(e){
    $('body').addClass('index work-open');
    e.preventDefault();
    $.get("/work.html", function(data){
      $("body").prepend(data);
      setTimeout(function(){
        $('.project-list .project').addClass('animate');
      }, 100);
      $('.project-detail').delay(2000).hide(0);
    });
  });


  //////////////////////////////////////////////////////////////////////////////////////
  // Portfolio scroll animations
  //////////////////////////////////////////////////////////////////////////////////////
  if ($(".module").length){
    var win = $(window);
    var allMods = $(".module");

    allMods.each(function(i, el) {
      var el = $(el);
      if (el.visible(true)) {
        el.addClass("already-visible");
      }
    });

    win.scroll(function(event) {
      allMods.each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
          el.addClass("come-in");
        }
      });
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Kickdrop JS
  //////////////////////////////////////////////////////////////////////////////////////
  function isScrolledIntoView(elem){
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((docViewTop < elemTop) && (docViewBottom > elemBottom));
  }

  if ($(".themes").length){
    $(window).on('scroll', function (){
      if(isScrolledIntoView('.themes')) {
        setTimeout(function(){
          $('.theme-1').show().delay(200).animate({'margin-left': '-420px'}, 300, 'easeOutBack');
          $('.theme-2').show().delay(200).animate({'margin-left': '-350px'}, 300, 'easeOutBack');
          $('.theme-3').show().delay(200).animate({'margin-left': '-150px'}, 300, 'easeOutBack');
          $('.theme-4').show().delay(200).animate({'margin-left': '-80px'}, 300, 'easeOutBack');
        }, 1800);

        $('.theme-main').addClass('open');
        setTimeout(function(){
          $('.theme-main .image').show();
        }, 1000);
      }
    });
  }

  // Drag and drop widgets
  $(".widgets .widget").each(function(){
    $(this).mousedown(function(){
      var boxClass = $(this).attr('title');
      $(".browser-content .box." + boxClass + "").addClass('active animated rubberBand');
      $(".bubble").addClass('animated bounceOut');
    });

    $(this).mouseup(function(){
      var boxClass = $(this).attr('title');
      $(".browser-content .box." + boxClass + "").removeClass('active animated rubberBand');
      $(".bubble").hide();
    });
  });

  $(".widgets .widget").draggable({
    revert: "invalid",
    revertDuration: 500,
    scroll: false
  });

  $(".browser-content .box").each(function(){
    var widgetClass = $(this).attr('title');
    $(this).droppable({
      tolerance: "touch",
      accept: function(e){
        if(e.hasClass(widgetClass)) return true;
      },
      drop: function( event, ui ) {
        $(".widget." + widgetClass + "").addClass("animated tada");
        $(".widget." + widgetClass + "").draggable("disable");
        $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
        $(this).addClass('complete');

        if ($('.browser-content .complete').length == 6) {
          $('.drops').addClass('completed');
          $('.drops .text.mobile').addClass('bounceOutUp');
        }
      }
    });
  });

});