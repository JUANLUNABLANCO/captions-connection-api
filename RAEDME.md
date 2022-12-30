# Captionsconnection

  aplicacion realizada con node.js y mongodb

  esta aplicacion hace parte de captions-connection-web realizada con angular
  
# captions-connection-api

  https://github.com/JUANLUNABLANCO/captions-connection-api

## CREATED BY

Juan Manuel Luna Blanco
[Instagram: gotth3way](https://www.instagram.com/gotth3way.apis/)
[Instagram: Kryptonite](https://www.instagram.com/kryptonite.original/)

[Linkedin](https://www.linkedin.com/in/juan-manuel-luna-blanco-180a1570/)

[Youtube: desarrolladorhoy](https://www.youtube.com/channel/UCSEwIRkDJxLkbvKHOAcw_Xw)
[Youtube: Kryptonite](https://www.youtube.com/channel/UCSEwIRkDJxLkbvKHOAcw_Xw)

## INSTALACIONES

	> node -v                 // v16.17.0
	> npm -v                  // 8.15.0

## Development server

1. Run `npm run mongod` to serve mongod sevice. this service its running in port `30030`

2. Run `npm run dev`to serve Nodejs server app. This api-rest-full its running in `http://localhost:3333/`


## GIT CONFIGURATIONS

	> git init
	> git config --local user.email "desarrolloaplicacionesweb.jmlb@gmail.com"
	> git config --local user.name "JUANLUNABLANCO"
	> git branch -M  main

	En este punto debes crear un repositorio nuevo en github vac铆o y enlazarlo

	<!-- > git remote add origin https://github.com/JUANLUNABLANCO/<tu-repo>.git -->
    
    en caso que ya tuviésemos apuntando nuestro repo local a otro podemos borrar el origin así
    > git remote remove origin

	> git remote add origin https://github.com/JUANLUNABLANCO/captions-connection-api.git
	> git config --list
	 git add .
	 git commit -m "Captions connection proyect with node and mongodb"
	 git push -u origin main


## AWS Lightsail

servicio de vps en la nube

Creamos la instancia básica con 'centos 10' estable VM de linux
3.50€/m [512MB ram|20GB ssd|1 TB transferencia]

nombre de la instancia: AWSVPScaptionsconnectionapp

Hemos descargado las ssh keys, para conexión posterior por ssh

nombre del recurso:     sshkey_ccserver_access.
user name access:       admin

Luego hemos creado un recurso en network, una ip publica statica para este servidor privado.

Nombre del recurso:     AWSVPS-CC-static-ip
ip statica:             15.188.175.15

Ingresamos a la instancia por la consola, del panel en AWS.

> sudo apt-get update
> sudo apt-get upgrade
> curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
> sudo apt-get install -y nodejs
> node --version
> npm --version
> sudo apt-get install libcap2-bin  // herramienta para ejecutar node por debajo del puerto 1024, nosotros lo haremos en el 80
> sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\`` // y esta es la configuración para que se pueda ejecutar por debajo del 1024
> sudo npm install pm2 -g
> pm2 ls
> pm2 startup

// nos devuelve un comando para que pm2 se reinicie cuando la máquina empiece o se apague, es este:

sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u admin --hp /home/admin

> sudo apt-get install git
> pwd
/home/admin
> mkdir www
> cd www
> pwd
/home/admin/www

> git clone https://github.com/JUANLUNABLANCO/captions-connection-api.git
> ls -la
captions-connection-api
> cd captions-connection-api  // /home/admin/www/captions-connection-api/

> cp .env.example .env
> nano .env
> npm install
> pm2 start app.js
> pm2 save




