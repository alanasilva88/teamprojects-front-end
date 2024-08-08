import { useEffect, useState } from 'react';
import { getProjetos, addProjeto, deleteProjeto } from '../api/projetos';
import { getUsuarios } from '../api/usuarios';
import { Button, Form } from 'react-bootstrap';

function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data_inicio, setDataInicio] = useState('');
  const [data_final, setDataFinal] = useState('');
  const [usuariosSelecionados, setUsuariosSelecionados] = useState([]);

  async function carregarProjetos() {
    try {
      const dados = await getProjetos();
      setProjetos(dados);
    } catch (error) {
      console.error("Erro ao carregar projetos", error);
    }
  }

  async function carregarUsuarios() {
    try {
      const dados = await getUsuarios();
      setUsuarios(dados);
    } catch (error) {
      console.error("Erro ao carregar usuários", error);
    }
  }

  async function criarProjeto(event) {
    event.preventDefault();
    try {
      const novoProjeto = { nome, descricao, data_inicio, data_final, usuarios: usuariosSelecionados };
      await addProjeto(novoProjeto);
      setNome('');
      setDescricao('');
      setDataInicio('');
      setDataFinal('');
      setUsuariosSelecionados([]);
      carregarProjetos();
    } catch (error) {
      console.error("Erro ao adicionar projeto", error);
    }
  }

  async function deletarProjeto(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      try {
        await deleteProjeto(id);
        carregarProjetos();
      } catch (error) {
        console.error("Erro ao deletar projeto", error);
      }
    }
  }

  useEffect(() => {
    carregarProjetos();
    carregarUsuarios();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Gerenciar Projetos</h2>
        <Form onSubmit={criarProjeto}>
          <Form.Group controlId="formNome" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700 w-full">Nome</Form.Label>
            <Form.Control 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              placeholder="Digite o nome do projeto" 
              required 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            />
          </Form.Group>
          <Form.Group controlId="formDescricao" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700 w-full">Descrição</Form.Label>
            <Form.Control 
              type="text" 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              placeholder="Digite a descrição do projeto" 
              required 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            />
          </Form.Group>
          <Form.Group controlId="formDataInicio" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700 w-full">Data de Início</Form.Label>
            <Form.Control 
              type="date" 
              value={data_inicio} 
              onChange={(e) => setDataInicio(e.target.value)} 
              required 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            />
          </Form.Group>
          <Form.Group controlId="formDataFinal" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700 w-full">Data Final</Form.Label>
            <Form.Control 
              type="date" 
              value={data_final} 
              onChange={(e) => setDataFinal(e.target.value)} 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            />
          </Form.Group>
          <Form.Group controlId="formUsuarios" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700 w-full">Usuários</Form.Label>
            <Form.Control 
              as="select" 
              multiple 
              value={usuariosSelecionados} 
              onChange={(e) => setUsuariosSelecionados([...e.target.selectedOptions].map(option => option.value))}
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            >
              {usuarios.map(usuario => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            Adicionar Projeto
          </Button>
        </Form>
        <div className="space-y-6 mt-8">
          {projetos.map(projeto => (
            <div key={projeto.id} className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">{projeto.nome}</h3>
              <p className="text-gray-700 mt-2">{projeto.descricao}</p>
              <p className="text-gray-600 mt-2">Início: {projeto.dataInicio}</p>
              <p className="text-gray-600 mt-2">Final: {projeto.dataFinal || "Não definido"}</p>
              <div className="mt-4">
                <h4 className="font-medium text-gray-800">Usuários no projeto:</h4>
                {projeto.usuarios && projeto.usuarios.length > 0 ? (
                  <ul className="list-disc list-inside ml-5 text-gray-700">
                    {projeto.usuarios.map(usuario => (
                      <li key={usuario.id} className="flex items-center space-x-2">
                        <span className="flex-1">{usuario.nome}</span>
                        <span className="flex-1 text-gray-600">{usuario.email}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">Nenhum usuário associado</p>
                )}
              </div>
              <Button variant="danger" onClick={() => deletarProjeto(projeto.id)} className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg">
                Excluir
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projetos;
