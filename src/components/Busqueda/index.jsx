import React, { useState, useEffect } from "react";
import axios from "axios";
import './busqueda.scss';

import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import imgParadero from './imgs/bus-stop.png';
import imgBus from './imgs/bus.png';
import imgEmail from './imgs/email.png';
import imgSms from './imgs/sms.png';
import imgNotify from './imgs/notification.png';


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
    const [paradero, setParadero] = useState([]);


    function handleClick() {

 
            axios.get("https://api.xor.cl/red/bus-stop/" + value).then((response) => {

                const resultado = response.data;
                
                const informaciones = [];
                const encabezado = []
                let elemento = 0;

                response.data.services.forEach(srv => {

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
                        if(elemento == 0){
                            encabezado.push(info);
                            console.log(info);
                        }
                        elemento++;

                    });
                    //const serv = new Servicio(srv.id, srv.valid, srv.status_description, buses);
                    //servicios.push(serv);
                    
                });

                //const paradero = new Paradero(resultado.id, resultado.name, resultado.status_code, resultado.status_description, servicios);

                console.log(informaciones);
                setResultados(informaciones);
                setParadero(encabezado);

            }, [value])
            .catch(
                error => {
                    const informaciones = [];
                    console.log(informaciones);
                    setResultados(informaciones);
                    console.log("Error detectado: " + error)
                 }
            );


      }

    return (
        <div>
            <h3>Locomoción disponible por paradero</h3>
            <div className="div-busqueda">
                <div><input className="campo-busqueda" type="text" placeholder="Ingrese paradero (Ejemplo: PA443)" 
                    value={value} onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    required
                    />
                </div>
                <div>
                    <button className="button" onClick={handleClick}>Buscar Paradero</button>
                </div>
            </div>
            <div>      
                <If condition={(Object.keys(resultados).length != 0) }>
                    <Then>
                        {paradero.map((par) => (
                            <div className="datos-paradero" key={par.busId}>
                                <img className="img-icono" src={imgParadero} ></img>
                                <span>Paradero: {par.paradId} : {par.paradDesc}</span>
                            </div>                           
                                                      
                        ))}
                        <table className="tabla-recorridos">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Línea</th>
                                    <th>Bus</th>
                                    <th>Distancia (Mts.)</th>
                                    <th>Tiempo llegada (Mins) </th>
                                    <th>Notificación Diaria</th>
                                </tr>
                            </thead>                            
                            <tbody>
                            {resultados.map((serv) => (
                                <tr key={serv.busId}>
                                    <td><img className="img-bus" src={imgBus}></img></td>
                                    <td>{serv.servId}</td>
                                    <td>{serv.busId}</td>
                                    <td>{serv.busDistancia}</td>
                                    <td>{serv.busTpoMin} | {serv.busTpoMax}</td>
                                    <td><img className="img-action" src={imgEmail} title="Activar notificación por email."></img>
                                        <img className="img-action" src={imgSms} title="Activar notificación por sms."></img>
                                        <img className="img-action" src={imgNotify} title="Activar notificaciones en la aplicación."></img></td>
                                </tr>    
                            ))}
                            </tbody>
                        </table>
                    </Then>
                    <Else>
                        <table className="tabla-recorridos">
                            
                            <tbody>
                                <tr>
                                    <td>Ingrese un paradero para obtener su información.</td>
                                </tr>
                            </tbody>    
                        </table>    
                    </Else>
                </If>
            </div>       
        </div>                    
    );

};
