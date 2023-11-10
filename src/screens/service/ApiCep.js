import axios from 'axios'

// Exemplo de pesquisa por CEP:
// viacep.com.br/ws/01001000/json/

const ApiCep = axios.create({
    baseURL: "https://viacep.com.br/ws/"

})

export default ApiCep;
