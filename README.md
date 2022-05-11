# Muistot Kartalla | Frontend
Frontend is built with [React](https://reactjs.org/) 

## Developement Setup 
1. Install [Docker](https://www.docker.com/get-started/) if you don't have it installed
2. Clone frontend repo
```shell
  git clone https://github.com/MuistotKartalla/muistot-frontend.git
```
3. Install npm packages
```shell
npm install
```
4. Running local site
```shell
npm start
```
5. Clone backend repo 
```shell
git clone https://github.com/MuistotKartalla/muistot-backend.git
```
6. Recreating database

```shell
sh scripts/recreate_db.sh
```
7. Running test server

```shell
sh scripts/run_server.sh
```

OR

```shell
sh scripts/run_alt_server.sh
```

for new Docker versions.

8. Filling local database with filler data. Without this the local site wont work.
```shell
python database/test/filler.py
```
## Project Structure

##### React Frontend Is Built With:
####### Redux for state managment
####### react-leaflet for the map
####### react-router-dom for routing
####### redux-persist for saving redux state to localstorage

##### Folder Structure:
####### styles are for css
####### services are for api requests, data models and api paths
####### reducers are for reducers
####### hooks are for custom hooks
####### mobile and desktop components are split in their own folders

