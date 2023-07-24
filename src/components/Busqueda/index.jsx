import React, { useState, useEffect } from "react";
import axios from "axios";
import './busqueda.scss';

import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';


class Informacion{
    constructor(
        paradId,
        paradDesc,
        paradEstado,
        paradDetalle,
        servId,
        servValido,
        servEstado,
        busId,
        busDistancia,
        busTpoMin,
        busTpoMax
    ){
        this.paradId = paradId;
        this.paradDesc = paradDesc;
        this.paradEstado = paradEstado;
        this.paradDetalle = paradDetalle;
        this.servId = servId;
        this.servValido = servValido;
        this.servEstado = servEstado;
        this.busId = busId;
        this.busDistancia = busDistancia;
        this.busTpoMin = busTpoMin;
        this.busTpoMax = busTpoMax;
    }

    /* Getters */
    get getParadId() {
        return this.paradId;
    }

    get getParadDesc() {
        return this.paradDesc;
    }

    get getParadEstado() {
        return this.paradEstado;
    }

    get getParadDetalle() {
        return this.paradDetalle;
    }

    get getServId() {
        return this.servId;
    }

    get getServValido() {
        return this.servValido;
    }

    get getServEstado() {
        return this.servEstado;
    }

    get getBusId() {
        return this.busId;
    }

    get getBusDistancia() {
        return this.busDistancia;
    }

    get getBusTpoMin() {
        return this.busTpoMin;
    }

    get getBusTpoMax() {
        return this.busTpoMax;
    }

}


export const Busqueda = () => {

    const [value, setValue] = useState('');
    const [resultados, setResultados] = useState([]);


    function handleClick() {
        axios.get("https://api.xor.cl/red/bus-stop/" + value).then((response) => {

        const resultado = response.data;
        
        const informaciones = [];

        response.data.services.forEach(srv => {
            
            //const buses = [];            

            srv.buses.forEach(micro => {

                const info = new Informacion(
                    resultado.id, 
                    resultado.name, 
                    resultado.status_code, 
                    resultado.status_description,
                    srv.id, 
                    srv.valid, 
                    srv.status_description,
                    micro.id, 
                    micro.meters_distance, 
                    micro.min_arrival_time, 
                    micro.max_arrival_time
                );


                //const microbus = new Bus(micro.id, micro.meters_distance, micro.min_arrival_time, micro.max_arrival_time);
                //buses.push(microbus);

                informaciones.push(info);

            });
            //const serv = new Servicio(srv.id, srv.valid, srv.status_description, buses);
            //servicios.push(serv);
            
        });

        //const paradero = new Paradero(resultado.id, resultado.name, resultado.status_code, resultado.status_description, servicios);

        console.log(informaciones);
        setResultados(informaciones);

        }, [value]);
      }

    return (
        <div>
            <div>
                <input type="text" placeholder="Ingrese paradero" 
                value={value} onChange={(e) => {
                    setValue(e.target.value);
                }}
                />
                <button onClick={handleClick}>Buscar Paradero</button>
            </div>
            <div>       
                       
                <If condition={(Object.keys(resultados).length != 0) }>
                    <Then>
                        <table>
                            <thead>
                                <tr>
                                    <th>Línea</th>
                                    <th>Bus</th>
                                    <th>Distancia (Mts.)</th>
                                    <th>Tpo. llegada Mínimo (Minutos)</th>
                                    <th>Tpo. llegada Máximo (Minutos)</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {resultados.map((serv) => (
                                <tr key={serv.busId}>
                                    <td>{serv.servId}</td>
                                    <td>{serv.busId}</td>
                                    <td>{serv.busDistancia}</td>
                                    <td>{serv.busTpoMin}</td>
                                    <td>{serv.busTpoMax}</td>
                                    <td>PEND</td>
                                </tr>    
                            ))}
                            </tbody>
                        </table>
                    </Then>
                    <Else>
                        <table>
                            <thead>
                                <tr>
                                    <td>Detalle de búsqueda</td>
                                </tr>    
                            </thead>
                            <tbody>
                                <tr>
                                    <td>No hay datos</td>
                                </tr>
                            </tbody>    
                        </table>    
                    </Else>
                </If>
            </div>       
        </div>                    
    );

};
