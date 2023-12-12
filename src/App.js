import logo from './logo.svg';
import './App.css';
import YourLoginComponent from './components/YourLoginComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerHome from './components/CustomerHome';
import RegistrazioneForm from './components/RegistrazioneForm';
import ApriConto from './components/ApriConto';
import AdminHome from './components/AdminHome';
import ListaTransazioni from './components/ListaTransazioni';
import OperazioniCliente from './components/OperazioniCliente';
import TransazioniCliente from './components/TransazioniCliente';
import Navbar from './components/Navbar';
import DettagliUtente from './components/DettagliUtente';
import CreditCard from './components/CreditCard';
import { LANDING_ADMIN } from './utility/Rotte';
import LandingAdmin from './components/LandingAdmin';
import FiltroTransazioni from './components/FiltroTransazioni';
function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={YourLoginComponent} />
          <Route path="/CustomerHome" component={CustomerHome} />
          <Route path="/RegistrazioneForm" component={RegistrazioneForm} />
          <Route path="/ApriConto" component={ApriConto} />
          <Route path ="/AdminHome" component= {AdminHome}/>
          <Route path="/ListaTransazioni" component ={ListaTransazioni}/>
          <Route path ="/OperazioniCliente" component ={OperazioniCliente}/>
          <Route path= "/TransazioniCliente" component={TransazioniCliente}/>
          <Route path= "/DettagliUtente" component ={DettagliUtente}/>
          <Route path="/CreditCard" component={CreditCard}/>
          <Route path = "/LandingAdmin" component={LandingAdmin}/>
          <Route path= "/FiltroTransazioni" component={FiltroTransazioni}/>

        </Switch>
      </div>
    </Router>
  );
};

export default App;
