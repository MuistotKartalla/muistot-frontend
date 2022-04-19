// By: Niklas Impiö
import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import storage from 'redux-persist/lib/storage';
import {persistReducer,persistStore} from 'redux-persist';
//import reducers here
import notificationReducer from "./reducers/notificationReducer"
import postReducer from "./reducers/postReducer"
import loginReducer from "./reducers/loginReducer"
import userLocationReducer from "./reducers/userLocationReducer"
import tempPostReducer from "./reducers/tempPostReducer"
import tempSiteReducer from "./reducers/tempSiteReducer"
import projectReducer from "./reducers/projectReducer"
import settingsReducer from "./reducers/settingsReducer"
import mapLocationReducer from "./reducers/mapLocationReducer"

const persistConfig = {
    key: 'main-root',
    storage,
    blacklist: ['tempPost','tempSite', 'mapLocation', 'notification', 'userLocation', 'user'] 
};

const reducer = combineReducers({
    //combine reducers here
    //user: userReducer (for example)
    notification: notificationReducer,
    posts: postReducer,
    user: loginReducer,
    userLocation: userLocationReducer,
    tempPost: tempPostReducer,
    tempSite: tempSiteReducer,
    projects: projectReducer,
    settings: settingsReducer,
    mapLocation: mapLocationReducer

})
const persistedReducer = persistReducer(persistConfig, reducer);
//create store
const store = createStore(persistedReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)
const Persistor = persistStore(store);


export{Persistor};
export default store
