// By: Niklas Impiö
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import store, { Persistor } from "./store"
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={Persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
)