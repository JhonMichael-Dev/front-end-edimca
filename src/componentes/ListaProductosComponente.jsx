import React, { Component } from 'react';
import ProductosServicios from '../servicios/ProductosServicios';

class ListaProductosComponente extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productos: []
        }
        this.agregarProducto = this.agregarProducto.bind(this);
        this.editarProducto = this.editarProducto.bind(this);
        this.borrarProducto = this.borrarProducto.bind(this);
    }

    editarProducto(id) {
        this.props.history.push(`/agregarmotocicleta/${id}`);
    }

    componentDidMount() {
        ProductosServicios.getProductos().then((res) => {
            this.setState({ productos: res.data })
        });
    }

    agregarProducto() {
        this.props.history.push('/agregarmotocicleta/_add');
    }

    borrarProducto(id) {
        ProductosServicios.borrarProducto(id).then(res => {
            this.setState({ productos: this.state.productos.filter(productos => productos.idProducto !== id) });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center" style={{ marginTop: "2%" }}>Lista de Motocicletas</h2>
                <div className="row">
                    <button className="btn btn-primary" style={{ width: "10%", marginBottom: "1%" }} onClick={this.agregarProducto}>Agregar Moto</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr style={{ textAlign: "center" }}>
                                <th>ID</th>
                                <th>NOMBRE</th>
                                <th>DESCRIPCION</th>
                                <th>PRECIO</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.productos.map(
                                    productos =>
                                        <tr key={productos.idProducto}>
                                            <td>{productos.idProducto}</td>
                                            <td>{productos.nombre}</td>
                                            <td>{productos.descripcion}</td>
                                            <td>{productos.precio}</td>
                                            <td style={{ textAlign: "center" }}>
                                                <button className="btn btn-info text-white" onClick={() => this.editarProducto(productos.idProducto)}>Actualizar</button>
                                                <button className="btn btn-danger text-white" style={{ marginLeft: "1%", width: "23%" }} onClick={() => this.borrarProducto(productos.idProducto)}>Borrar</button>
                                            </td>
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

export default ListaProductosComponente;