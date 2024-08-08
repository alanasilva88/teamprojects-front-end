import axios from "axios";

// Função para recuperar as requipes
export async function getEquipes() {
  try {
    const response = await axios.get("http://localhost:3000/equipes");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter equipes", error);
    throw error;
  }
}

// Função para recuperar apenas uma unica Equipe
export async function getEquipe(id) {
  try {
    const response = await axios.get(`http://localhost:3000/equipes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter equipe", error);
    throw error;
  }
}

// Função para Adicionar Equipes
export async function addEquipes(data) {
  try {
    const response = await axios.post("http://localhost:3000/equipes", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar equipe", error);
    throw error;
  }
}

// Função para atualizar Equipe
export async function updateEquipe(id, data) {
  try {
    const respose = await axios.put(`http://localhost:3000/equipes/${id}`);
    return respose.data;
  } catch (error) {
    console.error("Erro ao Atualizar Equipe", error);
    throw error;
  }
}

// Função para Deletar Equipe
export async function deleteEquipes(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/equipes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar equipe", error);
    throw error;
  }
}
