import './App.css';
import CabeceraComponente from './componentes/CabeceraComponente';
import PiePaginaComponente from './componentes/PiePaginaComponente';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CrearMotocicletaComponente from './componentes/CrearMotocicletaComponente';
import ListaProductosComponente from './componentes/ListaProductosComponente';
import HomeComponente from './componentes/HomeComponente';
import Registrarse from './componentes/Registrarse';
import Login from './componentes/Login';
import OrdenesComponente from './componentes/OrdenesComponente';


function App() {
  return (
    <div>
      <Router>
        <CabeceraComponente />
        <div className="container">
          <Switch>
            <Route path="/" exact component={HomeComponente}></Route>
            <Route path="/motocicletas" component={ListaProductosComponente}></Route>
            <Route path="/agregarmotocicleta/:id" component={CrearMotocicletaComponente}></Route>
            <Route path="/ordencompra" component={OrdenesComponente}></Route>
            <Route path="/registrarse" component={Registrarse}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </div>
        <PiePaginaComponente />
      </Router>
    </div>
  );
}

export default App;
