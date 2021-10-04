import React, { Component } from 'react';
import ProductosServicios from '../servicios/ProductosServicios';

class CrearMotocicletaComponente extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nombre: '',
            descripcion: '',
            precio: ''
        }

        this.changeNombreHandler = this.changeNombreHandler.bind(this);
        this.changeDescripcionHandler = this.changeDescripcionHandler.bind(this);
        this.changePrecioHandler = this.changePrecioHandler.bind(this);
        this.guardarOrActualizarProducto = this.guardarOrActualizarProducto.bind(this);
    }

    componentDidMount() {
        if (this.state.id === '_add') {
            return
        } else {
            ProductosServicios.getProductoPorId(this.state.id).then((res) => {
                let producto = res.data;
                this.setState({
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    precio: producto.precio
                });
            });
        }
    }

    guardarOrActualizarProducto = (e) => {
        e.preventDefault();
        let producto = { nombre: this.state.nombre, descripcion: this.state.descripcion, precio: this.state.precio };
        console.log('producto => ' + JSON.stringify(producto));

        if (this.state.id === '_add') {
            ProductosServicios.crearProducto(producto).then(res => {
                this.props.history.push('/motocicletas');
            });
        } else {
            ProductosServicios.actualizarProducto(producto, this.state.id).then(res => {
                this.props.history.push('/motocicletas');
            });
        }

    }

    changeNombreHandler = (event) => {
        this.setState({ nombre: event.target.value })
    }

    changeDescripcionHandler = (event) => {
        this.setState({ descripcion: event.target.value })
    }

    changePrecioHandler = (event) => {
        this.setState({ precio: event.target.value })
    }

    cancel() {
        this.props.history.push('/motocicletas');
    }

    getTitulo() {
        if (this.state.id === '_add') {
            return <h3 className="text-center"> Agregar Motocicleta</h3>
        } else {
            return <h3 className="text-center"> Actualizar Motocicleta</h3>
        }
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{ marginTop: "2%" }}>
                            {this.getTitulo()}
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Nombre:</label>
                                        <input placeholder="Modelo" name="nombre" className="form-control"
                                            value={this.state.nombre} onChange={this.changeNombreHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Descripcion:</label>
                                        <input placeholder="Marca" name="descripcion" className="form-control"
                                            value={this.state.descripcion} onChange={this.changeDescripcionHandler} />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: "2%" }}>
                                        <label>Precio:</label>
                                        <input placeholder="Precio" name="precio" className="form-control"
                                            value={this.state.precio} onChange={this.changePrecioHandler} />
                                    </div>
                                    <button className="btn btn-success" onClick={this.guardarOrActualizarProducto}>Guardar</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancelar</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default CrearMotocicletaComponente;