// make sure the callback is defined
if(!SpilAPI_has_callback("resumeGame",0)) {
    exit;
}

// the body of your callback function
show_message("Game API requested that I resume myself");
// below, put your logic to resume your game
