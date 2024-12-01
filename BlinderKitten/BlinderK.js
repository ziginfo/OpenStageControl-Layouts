// ========================== VARS ===========================


//====================================================================
//						INITIAL FUNCTIONS 
//====================================================================

//  initial functions
init: function() {
        console.log("Custom module running...")
},

//========================================================================
//							 VALUE CHANGE EVENTS
//========================================================================

function moduleValueChanged(value) { 
// >>>>>>>>>>>>>>> RESET ALL <<<<<<<<<<<<<
	if (value.name == ""){
	}
},
	
//============================================================
//				KEEP ALIVE
//============================================================
function update(deltaTime) {
		var now = util.getTime();
		if(now > TSSendAlive) {
			TSSendAlive = now + 8;
			keepAlive(); 
		}

},

function keepAlive() {
		local.send("");
		if (activMeters.get()) {
		local.send("/etc", "/metersrtc")
		
},
//============================================================
//							OSC EVENTS
//============================================================

oscInFilter: function(data) {

        var {address, args, host, port} = data

        if (address === '') {
            if (args[1].value === ' ') {
                createPluginsList(args[0].value, [])
            } 
        }
           
 },
 
oscOutFilter: function(data) {

        var {address, args, host, port} = data

        if (address === '') {
        }
}
