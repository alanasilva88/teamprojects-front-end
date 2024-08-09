import axios from 'axios';

export async function getTarefas() {
  try {
    const response = await axios.get("http://localhost:3000/tarefas");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter tarefas", error);
    throw error;
  }
}

export async function addTarefa(data) {
  try {
    const response = await axios.post("http://localhost:3000/tarefas", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar tarefa", error);
    throw error;
  }
}

export async function deleteTarefa(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/tarefas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar tarefa", error);
    throw error;
  }
}
