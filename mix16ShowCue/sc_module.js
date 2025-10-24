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
const cue_colors=[]
const cue_times=[]
const sb_ids=[]
const sb_names=[] 
const sb_times=[]
const sb_colors=[]
maxid=0; 

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
        
// this will show incoming-messages-logs in the console =>> 
//    receive('/LOG', `MSG IN: ${data.address}, ${data.args.map(a=>a.value).join(', ')}`)

        var {address, args, host, port} = data
        
        if (data.address == '/mix16showcue/cues') { 
        	 maxid = args[0].value
        	receive('/cuemax', maxid)
//            receive('/cuemax_var', maxid)
//            receive('/cues_count', maxid)
        }
        
        if (data.address == '/mix16showcue/sidebarcues') { 
        	 sbmaxid = args[0].value
        	receive('/sb_max', sbmaxid)
            receive('/sb_max_var', sbmaxid)
            receive('/sb_count', sbmaxid)
        }

        if (data.address == '/mix16showcue/cue') {            
 /*         		            	
            	cue_ids.push(data.args[0].value)             	
         		cue_numbs.push(data.args[1].value)                       	
           		cue_names.push(data.args[2].value)
           		cue_stats.push(data.args[4].value)
           		cue_notes.push(data.args[5].value)
           		cue_times.push(data.args[6])
           		cue_colors.push(data.args[7].value)
*/           		                        
            var cue_id = data.args[0].value
            var cue_numb = data.args[1].value
            var cue_name = data.args[2].value
            var cue_vol = data.args[3].value
            var cue_play = data.args[4].value
            var cue_note = data.args[5].value
            var cue_time = data.args[6].value
            var cue_color = data.args[7].value              		
//		 insert Cue-names and -numbers              
         	for (n=0; n<maxid; n++){
         		no=n+1
         	if(cue_id===no){
//         		receive('/cueid_'+no, no)
         		receive('/cueno_'+no, cue_numb)
        		receive('/cuename_'+no, cue_name)
       	 		receive('/cuecol_var_'+no, cue_color)
         		receive('/cuetime_'+no, cue_time)
         		receive('/cuenote_'+no, cue_note)
         		receive('/cuetrig_'+no, cue_name)
         		receive('/cuetrigvar_'+no, data.args[1])
         		receive('/cueplayvar_'+no, cue_play)
         		receive('/playtext_'+no, cue_play)
         		receive('/cuetrigname_'+no, cue_numb+' :: '+cue_name)
         		receive('/cuetrignote_'+no, cue_note)  }         	
         	}                                               
         }
                        
   			if (data.address == '/mix16showcue/sidebarcue') { 
/*   			                     	          	         		
          		sb_ids.push(data.args[0].value)             	         		                       	
          		sb_names.push(data.args[1].value) 
          		sb_times.push(data.args[5].value)             	         		                       	
          		sb_colors.push(data.args[6].value)
*/  
			var sbid = data.args[0].value
            var sbname = data.args[1].value
            var sbtime = data.args[5].value
            var sbcol = data.args[6].value     		          	
//		 insert Cue-names and -numbers              
          		for (i=0; i<sbmaxid; i++){
         	var o=i+1
         	if(sbid===o){
         	receive('/sbno_'+o, sbid)
         	receive('/sbname_'+o,sbname)
         	receive('/sbcuecol_var_'+o, sbcol)	}
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
        
// this will show outgoing-messages-logs in the console =>> 
//    receive('/LOG', `MSG OUT: ${data.address}, ${data.args.map(a=>a.value).join(', ')}`)

        var {address, args, host, port, clientId} = data
        
        if (data.address == '/clearall') {
        	var count = data.args[0].value
				count = parseInt(count)
			
			receive('/notes_nextcue', "")    
			
//		 clear Cue-names and -numbers				        
        	for (n=0; n<count; n++){
         	no=n+1
         	receive('/cueno_'+no, "")
         	receive('/sbno_'+no,  '')
         	receive('/cuename_'+no, "")
         	receive('/sbname_'+no, "")
         	receive('/cuelabel_'+no, "")
         	receive('/cuenote_'+no, "")
         	receive('/cuetrig_'+no, "")
         	receive('/cuetrigvar_'+no, "")
         	receive('/cuetrigname_'+no, "")
         	}
				while( cue_numbs.length > 0){
				cue_numbs.pop()		}
				while( cue_names.length > 0){
				cue_names.pop()		}
				while( cue_notes.length > 0){
				cue_notes.pop()		}
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