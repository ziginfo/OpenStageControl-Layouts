// ========================== VARS ===========================
const myParameters = {};
const lbl = {};
const host = '127.0.0.1';
const port = 11000 ;
const names = {};
const track_names = [];
const selno = 0;
const hex_colors_id =[
"#FF94A6","#FFA529","#CC9927","#F7F47C","#BFFB00","#1AFF2F","#25FFA8","#5CFFE8","#8BC5FF","#5480E4","#92A7FF","#D86CE4","#E553A0","#FFFFFF","#FF3636","#F66C03","#99724B","#FFF034","#87FF67","#3DC300","#00BFAF","#19E9FF","#10A4EE","#007DC0","#886CE4","#B677C6","#FF39D4","#D0D0D0","#E2675A","#FFA374","#D3AD71","#EDFFAE","#D2E498","#BAD074","#9BC48D","#D4FDE1","#CDF1F8","#B9C1E3","#CDBBE4","#AE98E5","#E5DCE1","#A9A9A9","#C6928B","#B78256","#99836A","#BFBA69","#A6BE00","#7DB04D","#88C2BA","#9BB3C4","#85A5C2","#8393CC","#A595B5","#BF9FBE","#BC7196","#7B7B7B","#AF3333","#A95131","#724F41","#DBC300","#85961F","#539F31","#0A9C8E","#236384","#1A2F96","#2F52A2","#624BAD","#A34BAD","#CC2E6E","#3C3C3C"
]


module.exports = {

//====================================================================
//						INITIAL FUNCTIONS 
//====================================================================

    init: function(){
        // this will be executed once when the osc server starts after
        // connections are set up
        // it is called for the main module only
//        send ('/live/track/start_listen/volume', '*')

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
        
    	 // receive incoming osc messages in the console

// this will show incoming-messages-logs in the console =>> 
    receive('/LOG', `MSG IN: ${data.address}, ${data.args.map(a=>a.value).join(', ')}`)
    	
        // Filter incoming osc messages

        var {address, args, host, port} = data
          	
        if (address == '/live/device/get/parameter/value') {
          	address = '/live/device/set/parameter/value' }
          	 	
        if (address == '/live/track/get/volume') {
          	address = '/live/track/set/volume' }
          	
        if (address == '/live/track/get/send') {
          	address = '/live/track/set/send' }
          	
        if (address == '/live/track/get/panning') {
        	address = '/live/track/set/panning' }
        
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
        	
        if (address == '/live/track/get/is_visible') {       
          	address = '/live/track/get/is_visible' 
        	if (data.args[1].value== true) {data.args[1].value= 1}
        	else {data.args[1].value= 0}  }
        	
        	if (address == '/live/track/get/is_grouped') {       
          	address = '/live/track/get/is_grouped' 
        	if (data.args[1].value== true) {data.args[1].value= 1}
        	else {data.args[1].value= 0}  }
        	
        	if (address == '/live/track/get/is_foldable') {       
          	address = '/live/track/get/is_foldable' 
        	if (data.args[1].value== true) {data.args[1].value= 1}
        	else {data.args[1].value= 0}  }
        	       	
        if (address == '/live/song/get/loop') {
          	address = '/live/song/set/loop'}
          
        if (address == '/live/clip/get/name') {
          	address = '/live/clip/fire'}
			
		if (address == '/live/view/get/selected_track') {
        	var seltr = data.args[0].value 
        	}
        	
        if (address == '/live/view/get/selected_scene') {
        	var selsc = data.args[0].value 
//        	receive('/selscene1',selsc)
        	}	
                	
        if (address == '/live/song/get/is_playing') {
      		var is = data.args[0].value 
      		if(is == true){
        	receive('/playstat', 0.8 )
        	receive('/stopstat', 0.2 )}
        	if(is == false){
        	receive('/playstat', 0.3 )
        	receive('/stopstat', 0.5 )}	}
        	
        if (address == '/live/song/get/session_record') {
      		var is = data.args[0].value 
      		if(is == true){
        	receive('/recstat', 1 )}
        	if(is == false){
        	receive('/recstat', 0.5)}	}
        	
        if (address == '/live/song/get/loop') {
      		var is = data.args[0].value 
      		if(is == true){
        	receive('loopstat', 0.6 )}
        	if(is == false){
        	receive('/loopstat', 0.4)}	}
        	 
		if (address == '/live/clip_slot/get/has_clip') {
			var tra = data.args[0].value 
      		var clip = data.args[1].value
      		var val = data.args[2].value
      		if(val==true){
      		 send (data.host,data.port,'/live/clip/get/is_playing',tra,clip)}
      		}
          	
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

// this will show outgoing-messages-logs in the console =>> 
    receive('/LOG', `MSG OUT: ${data.address}, ${data.args.map(a=>a.value).join(', ')}`)
    	
        // Filter outgoing osc messages

        var {address, args, host, port, clientId} = data
          
        if (address == '/live/track/get/name') {
        	const selno = data.args[0].value +1
          	}
          
           
        // return data if you want the message to be and sent
        return {address, args, host, port}
    },

    unload: function(){
        // this will be executed before the custom module is reloaded
        // it is called for all modules, including other loaded modules
    },

}