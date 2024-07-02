import {BrowserRouter } from 'react-router-dom';
import PageRoute from './Routes/Route';
import TopNav from './TopNavigtion/Navigation';
function App(){
  return (
    <div className="app">

    <BrowserRouter>
      {window.location.pathname === "/category/:cat_id" && <PageRoute/>}
          <PageRoute />
          <TopNav/>
      </BrowserRouter>
    </div>
  );
};

export default App;
