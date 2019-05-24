$(document).ready(function () {

    //storyboard inladen
    $.ajax({
        'url': 'http://10.3.50.56:3015/getData',
        'method': 'POST',
        'data': {
            'uuid': localStorage.getItem('uuid')
        }
    }).done(function (data) {
        console.log(JSON.parse(data["storyboards"]));
        var storyboards = JSON.parse(data["storyboards"]);
        var huidigStoryboard = localStorage.getItem("HuidigStoryboard");

        //uitgelezen data invoeren
        $("#naamStoryboard").val(storyboards[huidigStoryboard].naam);
        $("#opleidingsonderdeel").val(storyboards[huidigStoryboard].opleidingsonderdeel);

        $("#semester").val(storyboards[huidigStoryboard].semester);

        $("#deeltraject").val(storyboards[huidigStoryboard].deeltraject);


        //alle data uitlezen en opslaan
        $(".finish").on("click", function (e) {

            e.preventDefault();

            var naamStoryboard = $("#naamStoryboard").val();
            if (naamStoryboard != "") {
                storyboards[huidigStoryboard].naam = naamStoryboard;
            }

            var opleidingsonderdeel = $("#opleidingsonderdeel").val();
            storyboards[huidigStoryboard].opleidingsonderdeel = opleidingsonderdeel;
            
             var semester = $("#semester").val();
            storyboards[huidigStoryboard].semester = semester;
            
             var deeltraject = $("#deeltraject").val();
            storyboards[huidigStoryboard].deeltraject = deeltraject;


            save();
            console.log(storyboards);

        });


        //save
        function save() {
            var saveObj = {
                uuid: localStorage.getItem("uuid"),
                storyboards: JSON.stringify(storyboards)
            }

            $.ajax({
                "url": "http://10.3.50.56:3015/insertData",
                "method": "POST",
                "data": saveObj

            }).done(function () {
                console.log("saved");
            });
        }

    });






    //animaties etc
    console.log("ready");
    $(".tuto").hide();
    $(".contentDoel").hide();

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
            $(".contentDoel").slideDown();
        } else {
            $(".contentDoel").slideUp();
        }
    });

    //textareaautoresize//
    var $textareas = $('textarea');

    $textareas.on('input', autosize);

    function autosize() {
        var $this = $(this);

        $this
            .css({
                height: 'auto'
            })
            .css({
                height: $this.prop('scrollHeight')
            });
    }

    //doelstelling toevoegen//
    $(".toev").click(function () {
        number = number + 1;
        ad = ad + 1;
        $(".ad h1").text("D" + ad);
        $(".contentToev").append('<div class="ADD"><h1>D' + number + ':</h1><textarea rows="1" placeholder="lorem ipsum dolor sit amet" style="resize: none;"></textarea></div>');
        return false;

    });


    //save


});
