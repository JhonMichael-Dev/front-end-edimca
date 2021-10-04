import axios from "axios";

const PRODUCTOS_API_BASE_URL = "http://localhost:8080/api/productos";

class ProductoServicios{

    getProductos(){
        return axios.get(PRODUCTOS_API_BASE_URL)
    }

    crearProducto(producto){
        return axios.post(PRODUCTOS_API_BASE_URL, producto);
    }

    getProductoPorId(idProducto){
        return axios.get(PRODUCTOS_API_BASE_URL + '/' + idProducto);
    }

    actualizarProducto(producto, idProducto){
        return axios.put(PRODUCTOS_API_BASE_URL + '/' + idProducto, producto);
    }

    borrarProducto(idProducto){
        return axios.delete(PRODUCTOS_API_BASE_URL+ '/' + idProducto)
    }
}

export default new ProductoServicios()