import axios from "axios";


// Função para retornar os Projetos
export async function getProjetos() {
  try {
    const response = await axios.get("http://localhost:3000/projetos");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter Projeto", error);
    throw error;
  }
}
// Função para retornar um projeto especifico
export async function getProjeto(id) {
  try {
    const response = await axios.get(`http://localhost:3000/projetos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter Projeto", error);
    throw error;
  }
}

// Função para Adicionar Projeto
export async function addProjeto(data) {
  try {
    const response = await axios.post("http://localhost:3000/projetos", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar Projeto", error);
    throw error;
  }
}

// Função para Atualizar Projeto
export async function updateProjeto(id, data) {
  try {
    const response = await axios.put(
      `http://localhost:3000/projetos/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao tentar atualizar Projeto", error);
    throw error;
  }
}

// Função para Deletar Projeto
export async function deleteProjeto(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/projetos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar Projeto", error);
    throw error;
  }
}
