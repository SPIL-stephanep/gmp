// make sure the callback is defined
if(!SpilAPI_has_callback("pauseGame",0)) {
    exit;
}

// the body of your callback function
show_message("I got called back!");

