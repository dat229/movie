import './App.scss';

import {BrowserRouter} from 'react-router-dom';
import Header from './component/header/Header';
import Router from './router/Router';
import Footer from './component/footer/Footer';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Router />
        <Footer />
    </BrowserRouter>
  );
}

export default App;
