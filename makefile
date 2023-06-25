#CHEMINS RELATIFS

NODEPATH = LesBonsArtisants-API

REACTPATH = lesbonsartisans-react

#COMMANDES

EXEC = npm start

node:
	cd ${NODEPATH} && ${EXEC}

react:
	cd ${REACTPATH} && ${EXEC}


