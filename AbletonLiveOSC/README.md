## Ableton Live  Control and Feedback with OpenStageControl    

First of all I want to thank [Jean-Emmanuel](https://github.com/jean-emmanuel/ardour-control) and also [FreddieVentura](https://github.com/freddieventura/virtual-launchpad), as this AbletonLive-Layout is essentially based on there great jobs on the "Ardour-Remote" and "Virtual Launchpad" Layouts.... so a big thanks here for there prior work !!

---
To get this LiveOSC-Layout run correctly, you must first donwload and install the free [AbletonOSC](https://github.com/ideoforms/AbletonOSC) Remote-Script and than activate it in Ableton Live !! Be shure to have the latest version of AbletonOSC as there is a whole new class for Scenes, since january 2025 (with functions as fire-scenes, scene-name, scene-tempo etc)   

OSC ports are set by default ! Ableton Live is listening on Port **11000** and sending Feedback on Port **11001** ; so in OpenStageControl the ports must be set to : Input Port : **11001** and Output Send Port : **11000**    
Remote Control and Feedback can be by Localhost (127.0.0.1) or any private Network (Wi-Fi Routers etc)   

This OpenStageControl Layout includes also a virtual Launchpad which communicates with Ableton-Live by MIDI. Please select "Launchpad" as a virtual controler in Live's MIDI-Preferences and than set the correct (virtual) MIDI-Ports.    
See also the "pics" images for details.

---
#### The actual Version of my layout is  v1.2    
But it is still "work-in-progress" and I'll try to get it better and richer in the future... some features are still missing or "in work" !  

Some basic css-rules are written directly into the layout for color rendering etc... but consider that it'll be better to load a specific css-file (the **live.css** file is what I wrote and use for me !!)   
   
Scenes can  be played from the OSC-LaunchPad with the new function "Fire Scenes" and also from the Virtual-MIDI-Launchpad !    

To get MIDI to work correctly, you must use some Virtual-MIDI-Interface ( for example Virtual-MIDI-Port in Mac-OS; or third-party software as loopMIDI or others); and configure them in the OpenStageControl-Setup and Ableton Live-Preferences correctly. See also the "pics".      

**There are some lacks and limitations, and some hidden issues due to the Python-OSC-Library; maybe some of them will be fixed in the future..??**
- there is at the moment no control on the Master-Track (but I will add it by MIDI-Control)
- no control either for the Aux-Return-Tracks (and they are even not shown in the Track-List !)
- when a Track is part of a Group, it will always be shown in the O-S-C Layout, no matter if the group is folded or deployed ! 

---
**About Feedback from the Live-Session :**    
For many Feedbacks there is a "start_listen" feature which tells Live to send Feedback as soon as there are any changes in the session (for example : Names, Volumes, Mutes, Solo etc etc). Most of these "start_listens" are activated automatically, when the O-S-C-Layout goes online. Others may be activated manually with the "Sync" Button. (Some are not yet available.... as there are so many to include....)   

---
I will update this Layout in the future and add more features to it, so  it may be worth to [come back here](https://github.com/ziginfo/OpenStageControl-Layouts/tree/main/AbletonLiveOSC) from time to time, to see if there are any updates (usually notified in the Readme-Files).     
Please contact me if you have any suggestions, demands or requests and any help is always welcome !!   
Have Fun ...  

Special Thanks to [Daniel Jones](https://github.com/ideoforms) for his Python-Remote-Script
