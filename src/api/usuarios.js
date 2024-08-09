import axios from 'axios';

export async function getUsuarios() {
  try {
    const response = await axios.get('http://localhost:3000/usuarios');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter usuários', error);
    throw error;
  }
}

export async function addUsuario(data) {
  try {
    const response = await axios.post('http://localhost:3000/usuario', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar usuário', error);
    throw error;
  }
}

export async function deleteUsuario(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar usuário', error);
    throw error;
  }
}
