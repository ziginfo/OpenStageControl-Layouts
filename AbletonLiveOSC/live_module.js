// ========================== VARS ===========================
const myParameters = {};
const lbl = {};
const host = '127.0.0.1';
const port = 11000 ;
const names = {};
const selno = 0;
const colors = {"16733296":"rgba(255,148,166,1)","15698432":"rgba(255,165,41,1)","10779423":"rgba(204,153,39,1)","15986495":"rgba(247,244,124,1)","10078720":"rgba(191,251,0,1)","57877":"rgba(26,255,47,1)","1900511":"rgba(37,255,168,1)","4892159":"rgba(92,255,232,1)","2251482":"rgba(139,197,255,1)","2251482":"rgba(84,128,228,1)","5403647":"rgba(146,167,255,1)","13252570":"rgba(216,108,228,1)","14360963":"rgba(229,83,160,1)","16777215":"rgba(255,255,255,1)","16384000":"rgba(255,54,54,1)","12998402":"rgba(246,108,3,1)","8084540":"rgba(153,114,75,1)","16311808":"rgba(255,240,52,1)","5570343":"rgba(135,255,103,1)","3251712":"rgba(61,195,0,1)","39822":"rgba(0,191,175,1)","52449":"rgba(25,233,255,1)","885951":"rgba(16,164,238,1)","26011":"rgba(0,125,192,1)","6109146":"rgba(136,108,228,1)","10439860":"rgba(182,119,198,1)","16515269":"rgba(255,57,212,1)","11579568":"rgba(208,208,208,1)","14235687":"rgba(226,103,90,1)","16742451":"rgba(255,163,116,1)","12882498":"rgba(211,173,113,1)","14679921":"rgba(237,255,174,1)","12310116":"rgba(210,228,152,1)","10731590":"rgba(186,208,116,1)","7843684":"rgba(155,196,141,1)","10812352":"rgba(212,253,225,1)","10347761":"rgba(205,241,248,1)","9214417":"rgba(185,193,227,1)","11308754":"rgba(205,187,228,1)","8742104":"rgba(174,152,229,1)","13483205":"rgba(229,220,225,1)","9079434":"rgba(169,169,169,1)","11627105":"rgba(198,146,139,1)","9988161":"rgba(183,130,86,1)","8153429":"rgba(153,131,106,1)","10986055":"rgba(191,186,105,1)","8821248":"rgba(166,190,0,1)","6589758":"rgba(125,176,77,1)","6270370":"rgba(136,194,186,1)","7574700":"rgba(155,179,196,1)","6064045":"rgba(133,165,194,1)","5729466":"rgba(131,147,204,1)","8810651":"rgba(165,149,181,1)","10844580":"rgba(191,159,190,1)","10833529":"rgba(188,113,150,1)","6513507":"rgba(123,123,123,1)","9251113":"rgba(175,51,51,1)","8929575":"rgba(169,81,49,1)","6111285":"rgba(114,79,65,1)","11574528":"rgba(219,195,0,1)","7109145":"rgba(133,150,31,1)","4423720":"rgba(83,159,49,1)","556916":"rgba(10,156,142,1)","1921388":"rgba(35,99,132,1)","1386106":"rgba(26,47,150,1)","2507395":"rgba(47,82,162,1)","5192843":"rgba(98,75,173,1)","8600715":"rgba(163,75,173,1)","10757464":"rgba(204,46,110,1)","3289650":"rgba(60,60,60,1)"}

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
          	
        if (address == '/live/track/get/name') {
         	var name = data.args[1].value         
			receive('/seltr_labl', name ) }
	/*		
		if (address == '/live/view/get/selected_track') {
        	var seltr = data.args[0].value }
   */     	
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
