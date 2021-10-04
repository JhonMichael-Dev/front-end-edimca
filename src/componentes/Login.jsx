import React, { Component } from 'react';
import UsuariosServicios from '../servicios/UsuariosServicios'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            pass: '',
            usuario: []
        }

        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePassHandler = this.changePassHandler.bind(this);
        this.validateUser = this.validateUser.bind(this);
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value })
    };

    changePassHandler = (event) => {
        this.setState({ pass: event.target.value })
    };

    resetValues(){
        this.setState({email: '', pass: ''});
    };

    validateUser() {
        UsuariosServicios.getUsuariosPorCorreo(this.state.email).then((res) => {
            this.setState({ usuario: res.data })
            console.log('usuario => ' + JSON.stringify(this.state.usuario));
            if (this.state.usuario.pass === this.state.pass && this.state.usuario.correo === this.state.email) {
                this.props.history.push("/motocicletas")
            } else {
                this.resetValues();
                this.props.history.push("/login")
            }
        });
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-4 offset-md-4 offset-md-4" style={{ marginTop: "2%" }}>
                            Login
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Correo Electronico:</label>
                                        <input name="correo" className="form-control"
                                            value={this.state.email} onChange={this.changeEmailHandler} />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: "2%" }}>
                                        <label>Contraseña:</label>
                                        <input name="pass" className="form-control" type="password"
                                            value={this.state.pass} onChange={this.changePassHandler} />
                                    </div>
                                </form>
                                <button className="btn btn-success" onClick={this.validateUser}
                                    disabled={this.state.email.length === 0 || this.state.pass.length === 0}>
                                    Ingresar
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Login;