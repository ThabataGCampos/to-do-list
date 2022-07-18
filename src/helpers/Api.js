// Esse arquivo (helper) é para guardar todas as url's
const TaskContest = {
    taskEndPoint: () => `${Api.baseURL}/alltodo`,
    AllTasks: () => TaskContest.taskEndPoint(), // mesma url de cima, para buscar todas as tarefas ou criar uma nova
    TaskById: (id) => `${TaskContest.taskEndPoint()}/${id}` // url /id para editar, pesquisar por id ou deletar tarefas
}

// const urls = {
//     development: "http://localhost:8000",
//     production: "https://taskapitodolist.herokuapp.com"
//   };
  
  export const Api = {
    // baseURL: "http://localhost:8000", //development
    baseURL: "https://taskapitodolist.herokuapp.com", //production
    // baseURL: urls[process.env.NODE_ENV],
    ...TaskContest
  };
  
