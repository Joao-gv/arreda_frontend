import { API_BASE_URL } from "@/environments/environments";
import axios from "axios";


const api = axios.create({ baseURL: `${API_BASE_URL}/caronas`});

export const caronasService = {
    checkBuscarCaronas: (origem, destino, data) => api.get("", {
        params: {
            origem: origem,
            destino: destino,
            data: data,
        }
    }),

    checkPublicarCarona: () => api.post("/publicar")
}



export async function buscarCaronas (origem, destino, data){
    try{
        const response = await caronasService.checkBuscarCaronas(origem, destino, data);
    
        return{... response.data, statusCode: response.status}
    } catch(error){
        if(error.response){
            return{
                statusCode: error.response.status,
                message: error.response.data.message,
                ...error.response.data
            }
        }

        return{statusCode: 500, message: "Falha crítica de conexão"};
    }
}



