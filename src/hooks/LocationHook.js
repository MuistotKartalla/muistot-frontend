// By: Niklas Impiö
import {useState, useEffect} from "react"


//https://itnext.io/creating-react-useposition-hook-for-getting-browsers-geolocation-2f27fc1d96de
export const usePosition = (refreshTime) => {
    //Tries to query user location on specified intervals.
    const [userLocation, setUserLocation] = useState(null)
    const [lastLocationRefresh, setLastLocationRefresh] = useState(0)
    const [error, setError] = useState(null)

    const onError = (error) => {
        setError(error.message)
    }

    useEffect(() => {
        const onChange = ({coords}) => {
            //if location has changed and current time > lastRefreshTime + refreshInterval: update location.
            if (lastLocationRefresh < new Date().getTime() - refreshTime * 1000) {
                setLastLocationRefresh(new Date().getTime())
                setUserLocation({lat: coords.latitude, lng: coords.longitude, heading: coords.heading})
                // update to state so the component that calls the hook can access.
            }
        }

        const geo = navigator.geolocation
        if (!geo) {
            setError("Geolocation is not supported")
            return
        }
        try {
            const watcher = geo.watchPosition(onChange, onError);
            return () => geo.clearWatch(watcher)
        } catch {
            return () => setError("Failed geoloc init")
        }
    }, [refreshTime, lastLocationRefresh])


    return {userLocation, error}
}

