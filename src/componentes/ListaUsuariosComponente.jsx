import React, { Component } from 'react';
import UsuariosServicios from '../servicios/UsuariosServicios';

class ListaUsuariosComponente extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usuarios: []
        }
    }
    componentDidMount() {
        UsuariosServicios.getUsuarios().then((res) => {
            this.setState({ usuarios: res.data })
        });
    }
    render() {
        return (
            <div>
                <h2 className="text-center">Lista de Usuarios</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.usuarios.map(
                                    usuarios =>
                                        <tr key={usuarios.id}>
                                            <td>{usuarios.nombre}</td>
                                            <td>{usuarios.apellido}</td>
                                            <td>{usuarios.correo}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListaUsuariosComponente;