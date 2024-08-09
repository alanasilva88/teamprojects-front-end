import axios from 'axios';

// Função para retornar os Usuarios
export async function getUsuarios() {
  try {
    const response = await axios.get('http://localhost:3000/usuarios');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter usuários', error);
    throw error;
  }
}
// Função para retornar um usuario especifico
export async function getUsuario(id) {
  try {
    const response = await axios.get(`http://localhost:3000/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter usuário", error);
    throw error;
  }
}

// Função para Adicionar Usuario
export async function addUsuario(data) {
  try {
    const response = await axios.post('http://localhost:3000/usuario', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar usuário', error);
    throw error;
  }
}

// Função para Atualizar Usuario
export async function updateUsuario(id, data) {
  try {
    const response = await axios.put(
      `http://localhost:3000/usuarios/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao tentar atualizar Usuario", error);
    throw error;
  }
}

// Função para Deletar Usuario
export async function deleteUsuario(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar usuário', error);
    throw error;
  }
}
