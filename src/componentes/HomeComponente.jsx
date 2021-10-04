import React, { Component } from 'react';
import bienvenido from '../imagenes/bienvenido.png';

class HomeComponente extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{ marginBlock: "12%", border: "none" }}>
                            <div className="card-body">
                                <img src={bienvenido} style={{ width: "100%", height: "300px" }} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeComponente;