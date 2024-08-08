import axios from "axios";

// Função para retornar os Tarefas
export async function getTarefas() {
  try {
    const response = await axios.get("http://localhost:3000/tarefas");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter Tarefas", error);
    throw error;
  }
}
// Função para retornar uma tarefa especifico
export async function getTarefa(id) {
  try {
    const response = await axios.get(`http://localhost:3000/tarefas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter Tarefa", error);
    throw error;
  }
}

// Função para Adicionar Tarefa
export async function addTarefa(data) {
  try {
    const response = await axios.post("http://localhost:3000/tarefas", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar Tarefa", error);
    throw error;
  }
}

// Função para Atualizar Tarefa
export async function updateTarefa(id, data) {
  try {
    const response = await axios.put(
      `http://localhost:3000/tarefas/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao tentar atualizar Tarefa", error);
    throw error;
  }
}

// Função para Deletar Tarefa
export async function deleteTarefa(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/tarefas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar Tarefa", error);
    throw error;
  }
}
