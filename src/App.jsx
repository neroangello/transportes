import './App.css'
import { Busqueda } from './components/Busqueda';

import { Resumen } from "./components/Resumen";

function App() {

return (
  <div>
    <h1>Datos de transportes</h1>
    <Resumen></Resumen>
    <Busqueda></Busqueda>
  </div>
 );

}


export default App;