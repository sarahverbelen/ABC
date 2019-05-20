$(document).ready(function () { 
    console.log("ready");
    $(".tuto").hide();
    $(".content").hide();
    
    var number = 1;
    var ad = 2;
    $(".ad h1").text("D" + ad);

    //vraagteken//
    $("h1 img").click(function () {
        $(this).parent().find(".tuto").fadeToggle().css("display", "inline");
    });

    //switchcheckbox//
    $('.check').click(function () {
        if ($(this).is(':checked')) {
            $(".content").slideDown();
        } else {
            $(".content").slideUp();
        }
    });

    //textareaautoresize//
 var $textareas = $('textarea');

  $textareas.on('input', autosize);

  function autosize() {
    var $this = $(this);

    $this
      .css({height: 'auto'})
      .css({height: $this.prop('scrollHeight')});
  }

    //doelstelling toevoegen//
    $(".toev").click(function () {
        number = number + 1;
        ad = ad + 1;
        $(".ad h1").text("D" + ad);
        $(".contentToev").append('<div class="ADD"><h1>D' + number +':</h1><textarea rows="1" placeholder="lorem ipsum dolor sit amet" style="resize: none;"></textarea></div>');
        return false;
        
    });

});
