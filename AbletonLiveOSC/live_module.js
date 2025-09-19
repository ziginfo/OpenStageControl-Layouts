// ========================== VARS ===========================
const myParameters = {};
const lbl = {};
const host = '127.0.0.1';
const port = 11000 ;

module.exports = {

//====================================================================
//						INITIAL FUNCTIONS 
//====================================================================

    init: function(){
        // this will be executed once when the osc server starts after
        // connections are set up
        // it is called for the main module only
        send (host,port,'/live/track/start_listen/volume', '*')

    },

    stop: function(){
        // this will be executed once when the osc server stops
        // it is called for the main module only
    },

    reload: function(){
        // this will be executed after the custom module is reloaded
        // it is called for the main module only
    },
    
//====================================================================
//						OSC FILTERS IN 
//====================================================================

    oscInFilter:function(data){
        // Filter incoming osc messages

        var {address, args, host, port} = data

        if (address == '/live/track/get/volume') {
          	address = '/live/track/set/volume' }
        if (address == '/live/track/get/send') {
          	address = '/live/track/set/send' }          
        if (address == '/live/track/get/mute') {
        	address = '/live/track/set/mute'
        	if (data.args[1].value== true) {data.args[1].value= 1}
        	else {data.args[1].value= 0}   }          
        if (address == '/live/track/get/solo') {
          	address = '/live/track/set/solo' 
          if (data.args[1].value== true) {data.args[1].value= 1}
        	else {data.args[1].value= 0}  }
        if (address == '/live/track/get/arm') {       
          	address = '/live/track/set/arm' 
          if (data.args[1].value== true) {data.args[1].value= 1}
        	else {data.args[1].value= 0}  }
        	       	
        if (address == '/live/song/get/loop') {
          	address = '/live/song/set/loop'}
          
          if (address == '/live/clip/get/name') {
          	address = '/live/clip/fire'}
          
        return {address, args, host, port}

          
        // address = string
        // args = array of {value, type} objects
        // host = string
        // port = integer

        // return data if you want the message to be processed
        

    },
    
//====================================================================
//						OSC FILTERS OUT 
//====================================================================

    oscOutFilter:function(data){
        // Filter outgoing osc messages

        var {address, args, host, port, clientId} = data
		
		if (address == '/live/song/set/loop') {
          send (host,port,'/live/song/start_listen/loop')}
          
           
        // return data if you want the message to be and sent
        return {address, args, host, port}
    },

    unload: function(){
        // this will be executed before the custom module is reloaded
        // it is called for all modules, including other loaded modules
    },

}