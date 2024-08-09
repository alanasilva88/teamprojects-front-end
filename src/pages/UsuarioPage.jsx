import React, { useState, useEffect } from 'react';
import { addUsuario, getUsuarios, deleteUsuario } from '../api/usuarios';
import toast from 'react-hot-toast';

function UsuarioPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error('Erro ao obter usuários', error);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !email) {
      toast.error('Nome e email são obrigatórios!');
      return;
    }
    try {
      await addUsuario({ nome, email });
      setNome('');
      setEmail('');
      toast.success('Usuário criado com sucesso!');
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      toast.error('Erro ao criar usuário.');
      console.error('Erro ao criar usuário', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Você tem certeza que deseja deletar este usuário?')) {
      try {
        await deleteUsuario(id);
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        toast.success('Usuário deletado com sucesso!');
      } catch (error) {
        toast.error('Erro ao deletar usuário.');
        console.error('Erro ao deletar usuário', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 m-36">
      <div className="flex justify-center space-x-4">
        <div className="max-w-md w-full bg-white p-8 rounded shadow">
          <h2 className="text-2xl mb-4 text-center">Criar Usuário</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Criar
            </button>
          </form>
        </div>
        <div className="max-w-md w-full bg-white p-8 rounded shadow">
          <h2 className="text-2xl mb-4 text-center">Lista de Usuários</h2>
          <ul>
            {usuarios.map(usuario => (
              <li key={usuario.id} className="flex justify-between items-center mb-2">
                <span>{usuario.nome} ({usuario.email})</span>
                <button
                  onClick={() => handleDelete(usuario.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UsuarioPage;
