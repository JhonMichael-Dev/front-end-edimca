import React, { Component } from 'react';
import UsuariosServicios from '../servicios/UsuariosServicios';
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import ProductosServicios from '../servicios/ProductosServicios';
import EncabezadoServicios from '../servicios/EncabezadoServicios';
import DetallesServicios from '../servicios/DetallesServicios';

class OrdenesComponente extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            nombre: '',
            apellido: '',
            usuario: [],
            productos: [],
            detalles: [],
            encabezado: [],
            selectedDate: new Date()
        }
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(date) {
        this.setState({
            selectedDate: date
        });
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value })
    };

    validateUser = (e) => {
        e.preventDefault();
        UsuariosServicios.getUsuariosPorCorreo(this.state.email).then((res) => {
            let usuarioConsultado = res.data
            console.log('usuario => ' + JSON.stringify(usuarioConsultado));
            this.setState({
                nombre: usuarioConsultado.nombre,
                apellido: usuarioConsultado.apellido,
                usuario: usuarioConsultado
            });
        });
    }

    cargarProducto(productos) {
        this.setState(previousState => ({
            detalles: [...previousState.detalles, productos]
        }));
    }

    componentDidMount() {
        ProductosServicios.getProductos().then((res) => {
            this.setState({ productos: res.data })
        });
    }

    guardarOrden = (e) => {
        e.preventDefault();
        let encabeza = { fechaCreacion: this.state.selectedDate, usuarios: this.state.usuario };
        EncabezadoServicios.crearEncabezado(encabeza).then((res) => {
            this.setState({ encabezado: res.data })
            this.guardarDetalle();
        });
    }

    guardarDetalle = (e) => {
        var i;
        for (i = 0; i < this.state.detalles.length; i++) {
            var produ = this.state.detalles[i];
            let detalle = { encabezado: this.state.encabezado, productos: produ, fechaCreacion: this.state.selectedDate }
            console.log('detalle: ' + JSON.stringify(detalle));
            DetallesServicios.crearDetalle(detalle).then((res) => {
                this.setState({ email: '' });
                this.setState({ nombre: '' });
                this.setState({ apellido: '' })
                this.setState({ usuario: [] });
                this.setState({ detalles: [] });
                this.setState({ encabezado: [] });
                this.setState({ selectedDate: new Date() });
            });
        }
    }

    render() {
        return (
            <div>
                <div className="container" style={{ marginBottom: "5%" }}>
                    <div className="row">
                        <div className="card col-md-10 offset-md-1 offset-md-1" style={{ marginTop: "2%", backgroundColor: "whitesmoke" }}>
                            <h2 className="text-center">Orden de Compra</h2>
                            <div className="card card-body">
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <h3 className="text-right">Datos Cliente</h3>
                                        <form>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Correo:</label>
                                                <div className="col-sm-8">
                                                    <input placeholder="info@gmail.com" name="email" className="form-control"
                                                        value={this.state.email} onChange={this.changeEmailHandler} />
                                                </div>
                                                <div className="col-sm-2">
                                                    <button className="btn btn-primary" onClick={this.validateUser}
                                                        disabled={this.state.email.length === 0}>
                                                        Buscar
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Nombre:</label>
                                                <input name="nombre" className="col-sm-4" style={{ border: "none", backgroundColor: "transparent" }} disabled={true}
                                                    value={this.state.nombre} />
                                                <label className="col-sm-2 col-form-label">Apellido:</label>
                                                <input name="nombre" className="col-sm-4" style={{ border: "none", backgroundColor: "transparent" }} disabled={true}
                                                    value={this.state.apellido} />
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Fecha:</label>
                                                <DatePickerInput
                                                    onChange={this.onChange}
                                                    value={this.state.selectedDate}
                                                    className="my-custom-datepicker-component col-sm-2 col-form-label"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-sm-6" style={{ paddingInline: "3%" }}>
                                        <h3 className="text-right">Productos</h3>
                                        <div className="row">
                                            <table className="table table-striped table-bordered table-sm"
                                                style={{ overflow: "scroll", height: "150px", display: "block", overflowX: "hidden" }}>
                                                <thead>
                                                    <tr style={{ textAlign: "center" }}>
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
                                                                    <td>{productos.nombre}</td>
                                                                    <td>{productos.descripcion}</td>
                                                                    <td>{productos.precio}</td>
                                                                    <td style={{ textAlign: "center" }}>
                                                                        <button className="btn btn-info text-white" onClick={() => this.cargarProducto(productos)}>+</button>
                                                                    </td>
                                                                </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <h3 className="text-right">Detalles de Compra</h3>
                                <form>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="card col-md-10 offset-md-1 offset-md-1" style={{ backgroundColor: "whitesmoke", border: "none" }}>
                                                <table className="table table-striped table-bordered">
                                                    <thead>
                                                        <tr style={{ textAlign: "center" }}>
                                                            <th>NOMBRE</th>
                                                            <th>DESCRIPCION</th>
                                                            <th>PRECIO</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.detalles.map(
                                                                detalles =>
                                                                    <tr key={detalles.idProducto}>
                                                                        <td>{detalles.nombre}</td>
                                                                        <td>{detalles.descripcion}</td>
                                                                        <td>{detalles.precio}</td>
                                                                    </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ justifyContent: "center" }}>
                        <button className="btn btn-success" style={{ width: "10%", marginTop: "1%" }} onClick={this.guardarOrden}
                            disabled={this.state.nombre.length === 0 || this.state.detalles.length === 0}>
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrdenesComponente;