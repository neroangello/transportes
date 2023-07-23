import React, { useState, useEffect } from "react";
import axios from "axios";
import './busqueda.scss';


export const Busqueda = () => {

    const [value, setValue] = useState('');
    const [resultados, setResultados] = useState([]);


    /*useEffect(() =>{        

        axios.get("https://api.xor.cl/red/bus-stop/" + value).then((response) => {

            console.log(response.data);
            setResultados(response.data);

        });

    }, [value]);*/

    function handleClick() {
        axios.get("https://api.xor.cl/red/bus-stop/" + value).then((response) => {

            console.log(response.data);
            setResultados(response.data);

        }, [value]);
      }

    return (
        <div>
            <input type="text" placeholder="Ingrese paradero" 
            value={value} onChange={(e) => {
                setValue(e.target.value);
            }}
            />
            <button onClick={handleClick}>Buscar Paradero</button>
        </div>
    );

};
