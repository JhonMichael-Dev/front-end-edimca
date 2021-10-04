import React, { Component } from 'react';

class PiePaginaComponente extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }
    render() {
        return (
            <div>
                <footer className="footer" style={{ position: "fixed" }}>
                    <span className="text-muted">All Rights Reserved 2021</span>
                </footer>
            </div>
        );
    }
}

export default PiePaginaComponente;