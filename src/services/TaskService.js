// Arquivo (camada de serviço) para fazer a requisição com a API

// API HELPER:
// export const Api = {
//     baseURL: "http://localhost:8000/",
//     taskEndPoint: () => `${Api.baseURL}/alltodo`,
//     AllTasks: () => TaskContest.taskEndPoint(), 
//     TaskById: (id) => `${TaskContest.taskEndPoint()}/${id}`
// }

import { Api } from "../helpers/Api"

const parseResponse = (response) => response.json() // recebe a resposta e transforma em json

export const TaskService = {
    getList: () => fetch(Api.AllTasks(), {method: "GET"}).then(parseResponse),          // method é o objeto de configuração
    getById: (id) => fetch(Api.TaskById(id), {method: "GET"}).then(parseResponse),
    create: (task) => fetch(Api.AllTasks(), {method: 'post',                              // method, headers, mode e body é o objeto de configuração, para criar e editar é necessário ter esse tipo de objeto
    headers: {
    'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(task), 
    }).then(parseResponse),
    updateById: (id, editedTask) => fetch(Api.TaskById(id), {method: 'put',                                     // mandar o objeto de configuração para ser atualizado
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(editedTask),
    }).then(parseResponse),
    deleteById: (id) => fetch(Api.TaskById(id), {method: "DELETE"}).then(parseResponse),
};