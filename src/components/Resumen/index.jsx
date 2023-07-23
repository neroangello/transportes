import React, { useState, useEffect } from "react";
import axios from "axios";
import './resumen.scss'

class Linea{
    constructor(Id, Name, Issues, Closed){
        this.id = Id;
        this.name = Name;
        this.issues = Issues;
        this.closed = Closed;
    }
  
    /* Getters */
    get getName() {
      return this.name;
    }
  
    get getId() {
        return this.id;
    }
  
    get getIssues() {
        return this.issues;
    }
  
    get getClosed() {
        return this.closed;
    }
  
    /* Setters */
    /**
     * @param {any} name
     */
    set setName(name) {
      this.name = name;
    }
  
    /**
     * @param {any} id
     */
    set setId(id) {
        this.id = id;
    }
  
    /**
     * @param {any} issues
     */
    set setIssues(issues) {
        this.issues = issues;
    }
  
    /**
     * @param {any} closed
     */
    set setClosed(closed) {
        this.closed = closed;
    }
  
  }


  export const Resumen = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");


  useEffect(() => {
    axios.get("https://api.xor.cl/red/metro-network").then((response) => {
    
    const lineas = [];
    const lines = response.data.lines;
    

    lines.forEach(elemento => {
        let estado = "0";
        console.log(elemento.issues);
        if(elemento.issues == true){
            estado = "1";
        }else{
            estado = "0";
        }
        const linea = new Linea(elemento.id, elemento.name, estado, elemento.stations_closed_by_schedule);
        lineas.push(linea);
    });
    setTodos(lineas);
    //console.log(setTodos);
    });
  }, []);

  return (
    <div>
        <h3>Estado de la red Metro</h3>
        <div className="cards">
            {todos.map((todo) => (
            <div key={todo.id} id={todo.id} className="card" >
                
                <div className="card-superior" >
                    {todo.id}
                </div>
                
                <div className="card-inferior">
                    
                {(() => {
                    if (todo.issues == 0) {
                    return (
                        <div className="luz luz-verde"></div>
                    )
                    } else {
                    return (
                        <div className="luz luz-roja"></div>
                    )
                    }
                })()}
                    
                </div>          
            </div>
            ))}        
        </div>
    </div>
   );
  
}