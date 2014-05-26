// make sure the callback is defined
if(!SpilAPI_has_callback("pauseGame",0)) {
    exit;
}

// the body of your callback function
show_message("Game API requested that I pause myself");
// below, put your logic to pause your game
