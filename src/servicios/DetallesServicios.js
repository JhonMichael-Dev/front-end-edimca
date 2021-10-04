import axios from "axios";

const DETALLES_API_BASE_URL = "http://localhost:8080/api/detalles";

class DetallesServicios{

    crearDetalle(detalle){
        return axios.post(DETALLES_API_BASE_URL, detalle);
    }

}

export default new DetallesServicios()