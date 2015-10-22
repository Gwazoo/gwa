var elementPosition = $('#navigation').offset();

$(window).scroll(function(){
        if($(window).scrollTop() > elementPosition.top){
              $('#navigation').css('position','fixed').css('top','0');
        } else {
            $('#navigation').css('position','static');
        }    
});