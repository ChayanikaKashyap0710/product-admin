import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvier } from './Cart/context/cart_context';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

//store.subscribe(() => console.log(store.getState()));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <CartProvier>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
      </CartProvier>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
