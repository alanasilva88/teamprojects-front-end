import axios from "axios";

export async function getEquipes() {
  try {
    const response = await axios.get("http://localhost:3000/equipes");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter equipes", error);
    throw error;
  }
}

export async function addEquipes(data) {
  try {
    const response = await axios.post("http://localhost:3000/equipes", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar equipe", error);
    throw error;
  }
}

export async function deleteEquipes(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/equipes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar equipe", error);
    throw error;
  }
}