import React, { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class CabeceraComponente extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    homeRedireccion() {
        this.props.history.push('/');
    }

    motocicletasRedireccion() {
        this.props.history.push('/motocicletas');
    }

    render() {
        return (
            <div>
                <header>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand as={Link} to={"/"}>JhonDev</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/motocicletas">Motocicletas</Nav.Link>
                                <Nav.Link as={Link} to="/ordencompra">Ordenes</Nav.Link>
                            </Nav>
                            <Nav className="navbar-right">
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </header>
            </div>
        );
    }

}

export default CabeceraComponente;