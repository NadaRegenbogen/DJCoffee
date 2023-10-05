        
	$menu = $("#mobnav")
    $show = $("#menu_button")
    $close = $("#iks_button")
    
    $show.on("click",()=>$menu.fadeIn(1000))
    $close.on("click",()=>$menu.fadeOut(1000))

    
