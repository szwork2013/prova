/**
 * Created by Sysdata on 28/07/2015.
 */
(function(){
    $(document).ready(function(){
        $(".nav a").on("click", function(){
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
        });
    })
})()
