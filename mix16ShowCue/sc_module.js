// Do whatever you want
// initialize variables
// declare functions
// listen to app events
// load modules
// etc

const cueAddresses = ['/mix16showcue/cue', '/mix16showcue/nextcue/name', '/mix16showcue/playingcue/name'];
const cue_names=[]
const cue_ids=[]
const cue_numbs=[]
const cue_vols=[]
const cue_stats=[]
const cue_notes=[]
const sb_ids=[]
const sb_names=[] 


module.exports = {

    init: function(){
        // this will be executed once when the osc server starts after
        // connections are set up
        // it is called for the main module only
    },

    stop: function(){
        // this will be executed once when the osc server stops
        // it is called for the main module only
    },

    reload: function(){
        // this will be executed after the custom module is reloaded
        // it is called for the main module only
    },

    oscInFilter:function(data){
        // Filter incoming osc messages
        var {address, args, host, port} = data

        if (data.address == '/mix16showcue/cue') {            
          		            	
            	cue_ids.push(data.args[0].value)             	
         		cue_numbs.push(data.args[1].value)                       	
           		cue_names.push(data.args[2].value)
           		cue_notes.push(data.args[5].value)
           	
           	var maxid = Math.max.apply(Math, cue_ids)
           		
//            var cue_id = data.args[0]
            receive('/cuemax', maxid)
            receive('/cuemax_var', maxid)
                        
            var cue_vol = data.args[3].value
            var cue_play = data.args[4].value       
       		
//		 insert Cue-names and -numbers              
         	for (n=0; n<maxid; n++){
         	no=n+1
         	receive('/cueno_'+no, cue_numbs[n])
         	receive('/cuename_'+no, cue_names[n])
         	receive('/cuelabel_'+no, cue_names[n])
         	receive('/cuenote_'+no, cue_notes[n])
         	receive('/cuetrig_'+no, cue_names[n])
         	receive('/cuetrigvar_'+no, cue_numbs[n])
         	receive('/cuetrigname_'+no, cue_names[n])
         	}                                               
         }
                        
   			if (data.address == '/mix16showcue/sidebarcue') {            
          	          	         		
          		sb_ids.push(data.args[0].value)             	         		                       	
          		sb_names.push(data.args[1])
          		var sbmaxid = Math.max.apply(Math, sb_ids)          		
          		receive('/sb_max', sbmaxid)
            	receive('/sb_max_var', sbmaxid)
            	
            	receive('/text_1', sb_names)
          	
          	//		 insert Cue-names and -numbers              
          		for (i=0; i<sbmaxid; i++){
         	var o=i+1
         	receive('/sbno_'+o, sb_ids[i])
         	receive('/sbname_'+o,sb_names[i])
         	}                     
          }

            // empty return = bypass original message 
            //  return
        // address = string
        // args = array of {value, type} objects
        // host = string
        // port = integer

        // return data if you want the message to be processed
        return data

    },
    
  
    oscOutFilter:function(data){
        // Filter outgoing osc messages

        var {address, args, host, port, clientId} = data
        
        if (data.address == '/clearall') {
        	var count = data.args[0].value
				count = parseInt(count)

//		 clear Cue-names and -numbers				        
        	for (n=0; n<count; n++){
         	no=n+1
         	receive('/cueno_'+no, "")
         	receive('/sbno_'+no,  '')
         	receive('/cuename_'+no, "")
         	receive('/sbname_'+no, "")
         	receive('/cuelabel_'+no, "")
         	receive('/cuetrig_'+no, "")
         	receive('/cuetrigvar_'+no, "")
         	receive('/cuetrigname_'+no, "")
         	}
				while( cue_numbs.length > 0){
				cue_numbs.pop()		}
				while( cue_names.length > 0){
				cue_names.pop()		}
				while( sb_names.length > 0){
				sb_names.pop()		}
				while( sb_ids.length > 0){
				sb_ids.pop()		}								
         	maxid = 0
         	receive('/cuemax', maxid)
            receive('/cuemax_var', maxid)         	  
         } 
         
         if (data.address == '/clearsb') {
        	var countsb = data.args[0].value
				countsb = parseInt(countsb)

//		 clear Sb-names and -numbers				        
        	for (n=0; n<countsb; n++){
         	no=n+1
         	receive('/sbname_'+no, "")
         	receive('/cuelabel_'+no, "")
         	}
				while( sb_names.length > 0){
				sb_names.pop()		}
				while( sb_ids.length > 0){
				sb_ids.pop()		}								
         	sbmax = 0
         	receive('/sb_max', sbmax)
            receive('/sb_max_var', sbmax)         	  
         }   
             
        // return data if you want the message to be and sent
        return {address, args, host, port}
    },

    unload: function(){
        // this will be executed before the custom module is reloaded
        // it is called for all modules, including other loaded modules
    },

}