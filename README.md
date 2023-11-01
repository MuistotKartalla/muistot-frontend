# Muistot Kartalla | Frontend
Frontend is built with [React](https://reactjs.org/) 

---

## Developement Setup 

### Pre-requisites

Install [Node.js](https://nodejs.org/en/download) if you don't have it installed. Node Package Manager (npm) is included in the installation.  

It is very highly recommended to use an Integrated Development Environment (IDE) during development. [VSCode](https://code.visualstudio.com/) is a good one, with plenty of extensions available to help with the process.

---

### Setting up the frontend

1. Clone frontend repo to local machine
```shell
git clone git@github.com:MuistotKartalla/muistot-frontend.git
```

2. Navigate to frontend's root folder (or open the folder directly from an IDE)
```shell
cd muistot-frontend
```

3. Install the project's npm packages
```shell
npm install
```

At this point you should have the frontend environment set up. You can now try running it locally:

4. Running local site
```shell
npm start
```

The program should automatically launch at `localhost:3000`.  

All the other scripts for the frontend are found in the `package.json` file under the scripts section.  

---

### Running the frontend together with the backend

If you don't have the backend setup yet, please follow the instructions to do that in the backend's README file.

1. Navigate to the backend's root folder
```shell
cd muistot-backend
```

2. Recreate the database
```shell
sh scripts/recreate_db.sh
```

3. Run the test server
```shell
sh scripts/run_server.sh
```

OR

```shell
sh scripts/run_alt_server.sh
```

for new Docker versions.

4. Fill local database with filler data. Without this the local site wont work.
```shell
python database/test/filler.py
```

If you have the frontend running locally, it should now contain filler data with fake projects, etc.

5. Shut down the test server
```shell
docker-compose down -v
```

## Project Structure

#### React Frontend Is Built With:
Redux for state managment,
react-leaflet for the map,
react-router-dom for routing,
redux-persist for saving redux state to localstorage

#### Folder Structure:
styles are for css,
services are for api requests, data models and api paths,
reducers are for reducers,
hooks are for custom hooks,
mobile and desktop components are split in their own folders

