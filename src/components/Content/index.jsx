import './content.scss';
import React from 'react';
 import axios from 'axios';

const urlMetro = "https://api.xor.cl/red/metro-network";
const urlParaderos = "https://api.xor.cl/red/bus-stop/";


export const getParadero = async (paradero) => {
  return (await axios.get(urlParaderos, paradero)).data;
}
const getRedMetro = () => {
    axios
    .get(urlMetro)
    .then(data => console.log(data.data))
    .catch(error => console.log(error));
    };

   
export const Content = () => {

    return(
        <footer>
            Footer Ipsum - Footer companies 2023
        </footer>
    )
  
}

export default class content extends React.Component{
    state = {
        info: ""
    }

    obtenerRedMetro(){
        axios.get(urlMetro)
        .then(response => {
            const informacion = response.data;
            this.setState = ({informacion});
        })
    }

    render(){
        return(
            <main className="layout__main">
                {this.state.info} ****
            </main>
        )
    }

}

