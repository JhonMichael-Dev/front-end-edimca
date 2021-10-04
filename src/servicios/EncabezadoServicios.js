import axios from "axios";

const ENCABEZADO_API_BASE_URL = "http://localhost:8080/api/cabeceras";

class EncabezadoServicios{

    crearEncabezado(encabezado, detalle){
        return axios.post(ENCABEZADO_API_BASE_URL, encabezado);
    }
}

export default new EncabezadoServicios()