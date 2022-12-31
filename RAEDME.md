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

https://lightsail.aws.amazon.com/ls/webapp/eu-west-3/instances/AWSVPScaptionsconnectionapp/connect
ese es nuestro panel.

https://lightsail.aws.amazon.com/ls/webapp/home/instances?#
y este el home de lightsail

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

Ingresamos a la instancia por la consola, del panel en AWS. En el futuro ingresaremos por ssh desde el pc, con las klaves ssh

> sudo apt-get update
> sudo apt-get upgrade
> curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -		// obtener el irectorio de node para instalar
> sudo apt-get install -y nodejs
> node --version
> npm --version
> sudo apt-get install libcap2-bin  // herramienta para ejecutar node por debajo del puerto 1024, nosotros lo haremos en el 80
> sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\`` // y esta es la configuración para que se pueda ejecutar por debajo del 1024
> sudo npm install pm2 -g
> pm2 ls
> pm2 startup	// nos devuelve un comando para que pm2 se reinicie cuando la máquina empiece o se apague, es este:

> sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u admin --hp /home/admin

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

Nosotros necesitaremos el .env, copias el .env.example con variables de desarrollo y pones las variables con los valores para producción. Esto te ahorrará quebraderos de cabeza sobre el NODE_ENV y cross-env

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

// si tienes problemas con el puerto > sudo ufw allow 27017

En este punto se supone que está habilitado y arranca en el inicio de la máquina



> pm2 start app.js  // o mejor aún 

> npm run nodeProd //  "pm2 start ./src/index.js"
> pm2 save  // graba la lista de procesos en ejecución para que se lancen cuando empiece la máquina

Ahora ya tenemos en esta ip la api funcionando:

http://15.188.175.15:80/api

es hora de confgiurar el frontend para acceder a esa url.

Las conexiones de la app-web desde angular se realizaban a http://127.0.0.1:3333/api en desarrollo y esto en producción deben hacerse a 
la static ip de nuestra MV: 

conexion desde el frontend a nuestra api:   

http://15.188.175.15:80/api

Debes cambiarlo en la app frontend con angular 'captions-connection-web'
 http://localhost:3333/api/channel/check-channel-exists debes cambiar el host:puerto/endpoint:
 
 http://localhost:3333/api/

 por esto otro:

 http://15.188.175.15:80/api

 También en los cors de la app-server 'captions-connection-api', tenemos que modificar la constante de INCOMMING_URL_HTTPACCESS_PERMITED= http://localhost:4200

 por esto otro:

 INCOMMING_URL_HTTPACCESS_PERMITED= https://captions-connection-web.netlify.app

 Esto está hecho, ahora no accede debido a que estamos realizando una petición desde un dominio seguro:

 https://captions-connection-web.netlify.app  hacia un http://15.188.175.15:80/api y cors no nos lo permite lo bloquea, por ello debes registrar un dominio en aws y crear un recurso de DNS para tu app-server

 ## CREACION DE DOMINO EN AWS

	ns-1217.awsdns-24.org

	ns-1983.awsdns-55.co.uk

	ns-618.awsdns-13.net

	ns-193.awsdns-24.com

	DNS: https://captions-connection-app.net

	11 $/y fecha vencimiento: 31/12/2023 autoreneival: true

	en el menú de DOMAINS, debes asignar el recurso de DNS creado al recurso:

	'AWSVPS-CC-static-ip', es decir a la ip statica y pública que correponde a nuestra máquina:

	http://15.188.175.15:80

	Con el objetivo que cada vez que llamemos a https://captions-connection-app.net, nos lleve a esa ip

	y por tanto debemos cambiar en el frontend la

	baseUrl="http://15.188.175.15:80/api"

	por esto otro 

	baseUrl="https://captions-connection-app.net/api"

	Se encuentra en .environment.prod.ts

	Tras los cambios recuerda subir el dist a netlify ejecutando estos comandos

	> ng build --prod
	> netlify deploy --prod
	dist

## Instalar y configurar nginx

esto solo es necesario si tienes en el mismo dominio 2 apps en difernetes puertos, que no es nuestro caso, porque solo tenemos la app de node.js. 
Por ejemplo:

	app A con angular: contenido estático
	http://tudominio:4200

	app B con nodejs: app server
	http://tudominio:3000

	entonces sí lo instalaríamos

> sudo apt install nginx

> sudo systemctl status nginx

> sudo ufw allow 'Nginx Full'

> sudo mkdir -p /var/www
> sudo chown -R admin:admin /var/www

> sudo nano /etc/nginx/sites-available/default

--- default ---
server {
  listen 0.0.0.0:80;  // :80 o :443

  root /var/www/captions-connection-web/captions-connection-app;
  index index.html index.htm;
  server_name captions-connection-app.net;
  access_log /var/log/nginx/captions-connection-app.access.log;
  error_log /var/log/nginx/captions-connection-app.error.log debug;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarder-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;

    proxy_pass http://captions-connection-app.net;   // http o htttps
    proxy_redirect off;
  }
}
--- ---
--- /etc/hosts ---
127.0.0.1         localhost
127.0.0.1         admin
15.188.175.15:80 	captions-connection-app.net							// ?? debe llevar el :80 o no?
--- ---

> sudo service nginx restart
> sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

// WARNING no me queda claro hacerlo con nginx o sin nginx

## CREACIÓN DEL CERTIFICADO DENTRO DE LA MÁQUINA VIRTUAL

> sudo nano /etc/apt/sources.list

--- sources.list ---
deb http://ftp.debian.org/debian buster-backports main
--- ---


> sudo apt-get update
> sudo apt-install python-certboot

> sudo service nginx stop  // o apache o lo que tengas corriendo, en mi caso nada

> sudo certbot certonly --standalone -d captions-connection-app.net -d www.captions-connection-app.net

> sudo service nginx start

// // WARNING no me queda claro hacerlo con nginx o sin nginx, si no tienes nginx cambia el comando??, como 
// se redirecciona hacia el puerto 443

Configurar la renovación automática del servicio

> sudo sh -c 'printf "#!/bin/sh\n service nginx stop \n" > /etc/letsencrypt/renewal-hooks/pre/webservice.sh'
> sudo sh -c 'printf "#!/bin/sh\n service nginx start \n" > /etc/letsencrypt/renewal-hooks/post/webservice.sh'
> sudo chmod 755 /etc/letsencrypt/renewal-hooks/*/webservice.sh



## Intentemos otra cosa primero

> sudo apt install ufw

> sudo ufw status verbose

> sudo ufw allow ssh   	// 22
> sudo ufw allow http		// 80
> sudo ufw allow https	// 443

> sudo ufw status verbose

> sudo ufw enable

> sudo ufw status verbose

en node.js hemos activado las credenciales para https
--- app_server/server.js ---
if (_ENV == "production") {
    // app.use(cors()); // HASK: ############# CORS CONFIGURATION IN PRODUCTION
    const credentials = {
        ca: fs.readFileSync(__dirname + "/_configs/ssl/captionsconnection_net.ca-bundle", 'utf8'), //la certification authority o CA
        key: fs.readFileSync(__dirname + "/_configs/ssl/captionsconnection_net.key", 'utf8'), //la clave SSL, que es el primer archivo que generamos ;)
        cert: fs.readFileSync(__dirname + "/_configs/ssl/captionsconnection_net.crt", 'utf8') //el certificado
    };
    var _server = https
        .createServer(credentials, api)
        .listen(api.get("port"), function() {
            console.log("NODE_ENV: " + api.get("env"));
            console.log(
                "Express server with SSL certificate listening in https://www.captions-connection-app.net:" +
                _server.address().port
            );
        });
}
--- ---
esto ahbilita el https y la app se ejecutará en el puerto 443







