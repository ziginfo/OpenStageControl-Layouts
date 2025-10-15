## Contrôle et retour d'informations sur Ableton Live avec OpenStageControl

Je tiens tout d'abord à remercier [Jean-Emmanuel](https://github.com/jean-emmanuel/ardour-control) et [FreddieVentura](https://github.com/freddieventura/virtual-launchpad), car ce layout AbletonLive s'appuie essentiellement sur leur excellent travail sur les layouts "Ardour-Remote" et "Virtual Launchpad". Un grand merci pour leur travail !

---
Pour que ce layout LiveOSC puisse fonctionner correctement, vous devez d'abord télécharger et installer un remote script pour Ableton-Live qui est gratuit. Il s'agit d'une surface de contrôle virtuelle : [AbletonOSC](https://github.com/ideoforms/AbletonOSC), puis l'activer dans Ableton Live ! Assurez-vous d'avoir la dernière version d'AbletonOSC, car une toute nouvelle classe pour les scènes est disponible depuis janvier 2025 (avec des fonctions telles que fire-scenes, scene-name, scene-tempo, etc.).

Les ports OSC sont définis par défaut ! Ableton Live écoute sur le port **11000** et envoie des retours sur le port **11001** ; dans OpenStageControl, les ports doivent donc être définis sur : port d'entrée : **11001** et port d'envoi de sortie : **11000**.
L'adresse IP du réseau sera soit local (127.0.0.1), en cas qu'il s'agit du même ordinateur,  ou tout réseau privé (routeurs Wi-Fi, etc.).

Cette interface OpenStageControl inclut également un Launchpad virtuel qui communique avec Ableton Live par MIDI. Veuillez sélectionner "Launchpad" comme contrôleur virtuel dans les préférences MIDI de Live, puis définir les ports MIDI (virtuels) appropriés.
Voir également les images (pics) pour plus de détails.

---
#### La version actuelle de mon layout est la v2.3
Ajout du feedback de couleur et de quelques autres fonctionnalités…
Ajout de deux nouveaux onglets pour le clavier et le drumpad, ainsi que de nouvelles fonctionnalités de feedback pour les clips et les scènes.

Certaines règles CSS de base sont intégrées directement au layout pour le rendu des couleurs, etc., mais il serait préférable de charger un fichier CSS spécifique (j'ai écrit le fichier **live.css** et je l'utilise !).

Les scènes peuvent être jouées depuis l'OSC-LaunchPad grâce à la nouvelle fonction "Fire Scenes" et aussi depuis le Virtual-MIDI-Launchpad (déclenche donc par MIDI dans ce cas) !

Pour que le MIDI puisse fonctionner correctement, vous devez utiliser une interface MIDI virtuelle (par exemple, "Virtual MIDI Port" sous Mac OS, ou un logiciel tiers comme LoopMIDI ou autre) et la configurer correctement dans la configuration d'OpenStageControl et les préférences d'Ableton Live. Voir aussi les "images".

**Il existe quelques lacunes, limitations et problèmes cachés liés à la bibliothèque Python OSC de AbletonOSC ; certains seront peut-être corrigés ultérieurement… ?**
- Il n'y a actuellement aucun contrôle sur la piste Master (mais je l'ai ajouté via MIDI Control -> CC127).
- Aucun contrôle non plus pour les pistes de retour auxiliaire (et elles ne sont même pas affichées dans la liste des pistes !).
- Lorsqu'une piste fait partie d'un groupe, elle sera toujours affichée dans le layout O-S-C, que le groupe soit plié ou déployé !   

---
**À propos des "feedbacks" de la session Live :**
Pour de nombreux feedbacks, une fonctionnalité "start_listen" indique à Live d'envoyer un feedbacks dès qu'un changement se fait dans la session (par exemple : noms, volumes, mutes, solo, etc.). La plupart de ces "start_listen" sont activées automatiquement lors du lancement du layout O-S-C. D'autres peuvent être activés manuellement avec le bouton "Sync". (Certaines ne sont pas encore disponibles… car il y en a tellement à inclure…)   
Notez aussi que ces feedbacks génèrent un fort traffic de Datas, ce qui peut ralentir le l'ayout dans son ensemble (notamment les Meters et les feedbacks sur les Clips). N'activez donc uniquement ce dont vous avez besoin.

---
Je mettrai à jour cette interface ultérieurement et y ajouterai de nouvelles fonctionnalités. Il serait donc judicieux de [revenir ici](https://github.com/ziginfo/OpenStageControl-Layouts/tree/main/AbletonLiveOSC) régulièrement pour consulter les mises à jour (généralement indiquées dans les fichiers Lisez-moi).

N'hésitez pas à me contacter pour toute suggestion ou demande. Toute aide est toujours la bienvenue !
Amusez-vous bien…

Un grand merci à [Daniel Jones](https://github.com/ideoforms) pour son script Python à distance.