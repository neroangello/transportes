/*import React, { useState, useEffect } from "react";
import axios from "axios";*/
import './App.css'
import { Busqueda } from './components/Busqueda';

import { Resumen } from "./components/Resumen";

function App() {
 /*const [todos, setTodos] = useState([]);
 const [input, setInput] = useState("");*/


return (
  <div>
    <h1>Datos de transportes</h1>
    <Resumen></Resumen>
    <Busqueda></Busqueda>
  </div>
 );

}


export default App;