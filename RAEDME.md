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

// nosotros no necesitamos el .env, si en otro proyecto lo necesitaras debes crear el .env en la máquina virtual con los comandos siguientes y modificar el .env con las variables que nadie debe saber
> cp .env.example .env
> nano .env

--- .env.example ---
NODE_ENV=development
IP=127.0.0.1
HTTP_PORT=80
--- ---
--- .env ---
NODE_ENV=production
IP=172.26.9.208 // ip privada dentro de la red del VPS Machine
HTTP_PORT=80
--- ---

Por otro lado las conexiones de la app-web desde angular se realizaban a http://127.0.0.1:3333/api en desarrollo y esto en producción deben hacerse a 
la static ip de nuestra MV: 

conexion desde el frontend a nuestra api:   15.188.175.15:80/api



> npm install

### Instalando mongod

> sudo apt install -y gnupg
> wget https://www.mongodb.org/static/pgp/server-5.0.asc -qO- | sudo apt-key add -
> sudo nano /etc/apt/sources.list.d/mongodb-org.list
--- .../mongodb-org.list ---
deb http://repo.mongodb.org/apt/debian buster/mongodb-org/5.0 main
--- ---
[c^X] | y | [enter]

> sudo apt update
> sudo apt install -y mongodb-org
> sudo systemctle enable --now mongod
> sydtemctl status mongod

// si algún problema borrar el .sock de la carpeta /tmp
> ls *.sock
> rm -rf ****.sock  // como se llame el mongod***.sock
// esto tuve que hacerlo

> mongosh
> disableTelemetry()
> exit

En este punto se supone que está habilitado y arranca en el inicio de la máquina




> pm2 start app.js  // o mejor aún 

> npm run nodeProd //  "cross-env NODE_ENV=production && pm2 start ./src/index.js"
> pm2 save  // graba la lista de procesos en ejecución




