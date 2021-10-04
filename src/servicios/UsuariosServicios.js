import axios from "axios";

const USUARIOS_API_BASE_URL = "http://localhost:8080/api/usuarios";

class UsuariosServicios{
    getUsuarios(){
        return axios.get(USUARIOS_API_BASE_URL);
    }

    getUsuariosPorCorreo(correo){
        return axios.get(USUARIOS_API_BASE_URL + "/" + correo);
    }
}

export default new UsuariosServicios()