import axios from "axios";

export async function getProjetos() {
  try {
    const response = await axios.get("http://localhost:3000/projetos");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter projetos", error);
    throw error;
  }
}

export async function addProjeto(data) {
  try {
    const response = await axios.post("http://localhost:3000/projetos", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar projeto", error);
    throw error;
  }
}

export async function deleteProjeto(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/projetos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar projeto", error);
    throw error;
  }
}
