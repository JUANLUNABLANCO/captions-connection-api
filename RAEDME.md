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


## AZURE MICROSOFT (subir app_server)

Crear cuenta en azure de microsoft y seleccionar crear una web app

creamos un recurso nuevo llamado: node_captionsconnection_app
nombre del proyecto web: captionsconnection-api
Publicar
    Código                  --> por esta vez lo haremos con código desde github
  	Contenedor Docker
  	Aplicación web estática
Pila de ejecución: Node 16.0LTS
planes del servicio cambiar a Desarrollo y prueba Gratis 1GB de Ram

Ahora vamos al recurso y aparece un panel, con un montón de opciones:

debes subir tu proyecto a github si no lo tenías y consumir la url del proyecto de github para usarlo en azure

    https://github.com/JUANLUNABLANCO/captions-connection-api.git

en el proyecto de node deben cumplirse 2 cosas para poder ejecutarlo en azure:

    1. necesitamos indicarle esta variable de entorno en algún sitio, para que escuche en el puerto que nos indique azure: process.env.PORT
    en nuestro caso así queda el código:

        global._PORT = process.env.PORT || CONFIG.PORT;

    2. scripts: {
        start: "node src/server.js"
    }

si seleccionas crea web app con bd te creará una: captions-connection-web-database

Ahora en Azure nos vamos al centro de implementación
seleccionas github o donde tengas el proyecto, la rama y un para de cosas más y aceptar

te genera un archivo que debes copiar

--- .github/workflows/main_captionsconnection-api.yml ---
# Docs for the Azure Web Apps Deploy action: https://github.com/Azure/webapps-deploy
# More GitHub Actions for Azure: https://github.com/Azure/actions

name: Build and deploy Node.js app to Azure Web App - captions-connection

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2		// cambiar a actions/checkout@v3

      - name: Set up Node.js version
        uses: actions/setup-node@v1
        with:
          node-version: '16.x'

      - name: npm install, build, and test
        run: |
          npm install
          npm run build --if-present
          npm run test --if-present

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v2
        with:
          name: node-app
          path: .

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: 'production'
      url: ${{ steps.deploy-to-webapp.outputs.webapp-url }}

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v2
        with:
          name: node-app

      - name: 'Deploy to Azure Web App'
        id: deploy-to-webapp
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'captions-connection'
          slot-name: 'production'
          publish-profile: ${{ secrets.AzureAppService_PublishProfile_2b507f6e406b410594c8e7c39b279ef3 }}
          package: .
--- ---
    Guardar

		la uri de la app subida es:

    https://captions-connection.azurewebsites.net

		Centro de implementación/ registros 
    
		
