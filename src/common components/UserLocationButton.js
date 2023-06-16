const userLocation = (props) =>{
  return(
    <div>
    <button onClick={redirectToUserLocation}>Ir a mi ubicación</button>
    <MapContainer center={props.initialPosition} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
    </MapContainer>
  </div>
  )
}

export default userLocation;