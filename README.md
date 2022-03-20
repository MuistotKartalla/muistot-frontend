****************************
PAIKALLINEN KEHITYSYMPÄRISTÖ

Paikallisen kehitysympäristön asentaminen normaalisti, kunhan olet asentanut SSH-avaimet:

1. git clone git@github.com:ttokola/muistotkartalla.git


***********************************
KÄYTTÖLIITTYMÄN PAIKALLINEN TESTAUS

Käyttöliittymän paikallinen testaus ilman paikallista tietokantaa (eli API-yhteys otetaan suoraan muistotkartalla.fi -tietokantaan) onnistuu repon kloonauksen jälkeen:

1. npm install
2. npm start

Hox myös '''npm test'''

*************************************
PALVELIMELLE AJETTAVAN VERSION LATAUS

Palvelun ajaminen muistotkartalla.fi -palveluun edellyttää, että sinulla on SSH-avaintiedosto muistotkartalla_id_rsa ja tiedossa palvelun käyttäjätunnus. Sitä ennen luodaan asennettava versio npm run build -komennolla.

1. npm run build
2. scp -i /path/muistotkartalla_id_rsa -r /project_path/build/* username@muistotkartalla.fi:public_html/


*************
REACT-tietoa:


Create React App README:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
