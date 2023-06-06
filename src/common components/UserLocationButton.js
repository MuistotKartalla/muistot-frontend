import React from 'react';

export const Location = (props) => {
  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        // Aquí puedes utilizar la información de latitud y longitud como necesites
        console.log('Latitud:', lat);
        console.log('Longitud:', lon);
      }, function (error) {
        alert('No se pudo obtener la ubicación: ' + error.message);
      });
    } else {
      alert('Geolocalización no es soportada por este navegador.');
    }
  }

  return (
    <div className="locationContainer">
      <button className="locationButton" onClick={locateUser}>Mi Ubicación</button>
    </div>
  );
}
