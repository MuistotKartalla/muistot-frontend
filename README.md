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

## Further Development (Written at the end of the Autumn 2023 iteration)
The `general-instructions` repository contains a README file with instructions about the project and software development in general. You should read through it before starting out, especially if you have not been a part of a software development team before.

While the frontend is currently mostly functional, it could be improved in many many ways, especially when it comes to the development process.

There are a ton of existing issues open in the frontend repository already. Trying to get through the backlog should probably be the first priority, instead of trying to add a ton of new fancy stuff (of course the customer might disagree, and have their own demands).

### Things that should be done
Fixing everything that's broken
- There are quite a few things that don't work properly or are straight up broken in the frontend
- There are already issues for many of these problems, even more porbably exist that haven't been reported yet
- Broken code has likely slipped through the cracks due to lack of proper testing and reviewing, which brings us to the next point...

Adding [Jest](https://jestjs.io/) and implementing unit tests
- Unit tests are basically a **must** for any project and should have been there from the beginning
- Jest is the industry's gold standard for unit testing React, in the author's personal view other options don't need to be considered
- Unit tests should be written for all components, services, and reducers. This is a huge feat to do afterwards, which is why it should have been done simultaneously with the development of new features from the get-go

Configuring ESLint to enforce better code
- ESLint is already included, but it is not configured to properly enforce rules
- A style guide should be chosen and enforced with ESLint
- This can be done by adding a configuration file

Adding a pipeline with Github Actions
- Unit tests should be run automatically on every push
- Linting rules should be checked automatically on every push
- Obviously, all checks need to pass before a branch can be merged to master
- Code coverage should also be checked for the frontend

Merging pull requests should require a review and approval from a second developer
- If not already set by the time of the next project, ask the project owner to enforce this. These remarks were written at the end of the Autumn 2023 project

### Possible suggestions to consider
Moving from pure Redux to [Redux ToolKit](https://redux-toolkit.js.org/) to ease/improve state management
- Might require a pretty heavy rework
- Would make the code easier to read and maintain

Adding [PropTypes](https://www.npmjs.com/package/prop-types) to components
- This would help with debugging and make the code more readable
- It would be easy to see what prop types a component expects, and what fields an object coming from an API call should have

Adding End-to-End tests
- A good option to implement this is with [TestCafé](https://testcafe.io/)
- Unit tests should be prioritized over E2E tests

Switching to [Styled Components](https://styled-components.com/) for styles
- This would allow defining the whole component within one `.jsx` file, including the styles, in a more React-y way, instead of having separate `.css` files for everything

Introducing a component library, such as [BluePrint JS](https://blueprintjs.com/)
- Would have ready made components that could be used and altered instead of having to write everything from scratch
- Maybe not necessary, as most components already exists

Updating packages
- Packages are outdated and should be updated
- [Renovate](https://github.com/renovatebot/renovate) is a tool that can help automate the process. It can be configured to automatically create pull requests for updating packages
- Caution should be taken with the updates, things can easily break when jumping to a new major version. Updates should be tested and changes should be reviewed before merging
