import { useEffect, useState } from 'react';
import { getProjetos, addProjeto, deleteProjeto } from '../api/projetos';
import { getEquipes } from '../api/equipes';
import { Button, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';

function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [equipeId, setEquipeId] = useState('');

  async function carregarProjetos() {
    try {
      const dados = await getProjetos();
      console.log("Dados dos projetos:", dados);
      setProjetos(dados);
    } catch (error) {
      toast.error("Erro ao carregar projetos");
      console.error("Erro ao carregar projetos", error);
    }
  }

  async function carregarEquipes() {
    try {
      const dados = await getEquipes();
      setEquipes(dados);
    } catch (error) {
      toast.error("Erro ao carregar equipes");
      console.error("Erro ao carregar equipes", error);
    }
  }

  async function criarProjeto(event) {
    event.preventDefault();
    try {
      const novoProjeto = { nome, descricao, data_inicio: dataInicio, data_final: dataFinal, equipeId };
      await addProjeto(novoProjeto);
      setNome('');
      setDescricao('');
      setDataInicio('');
      setDataFinal('');
      setEquipeId('');
      carregarProjetos();
      toast.success("Projeto criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao adicionar projeto.");
      console.error("Erro ao adicionar projeto", error);
    }
  }

  async function deletarProjeto(id) {
    const deletar = window.confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      try {
        await deleteProjeto(id);
        carregarProjetos();
        toast.success("Projeto deletado com sucesso!");
      } catch (error) {
        toast.error("Erro ao deletar projeto.");
        console.error("Erro ao deletar projeto", error);
      }
    }
  }

  useEffect(() => {
    carregarProjetos();
    carregarEquipes();
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
              value={dataInicio} 
              onChange={(e) => setDataInicio(e.target.value)} 
              required 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            />
          </Form.Group>
          <Form.Group controlId="formDataFinal" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700 w-full">Data de Término</Form.Label>
            <Form.Control 
              type="date" 
              value={dataFinal} 
              onChange={(e) => setDataFinal(e.target.value)} 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            />
          </Form.Group>
          <Form.Group controlId="formEquipe" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700 w-full">Equipe</Form.Label>
            <Form.Control 
              as="select" 
              value={equipeId} 
              onChange={(e) => setEquipeId(e.target.value)} 
              required 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            >
              <option value="">Selecione uma equipe</option>
              {equipes.map((equipe) => (
                <option key={equipe.id} value={equipe.id}>{equipe.nome}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button 
            type="submit" 
            className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Criar Projeto
          </Button>
        </Form>
      </div>
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Lista de Projetos</h3>
        <ul>
          {projetos.map((projeto) => (
            <li key={projeto.id} className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
              <div>
                <h4 className="text-xl font-bold">{projeto.nome}</h4>
                <p className="text-gray-600">{projeto.descricao}</p>
                <p className="text-gray-600">Equipe: {projeto.equipe ? projeto.equipe.nome : "Sem equipe"}</p>
                <p className="text-gray-600">Início: {projeto.data_inicio}</p>
                <p className="text-gray-600">Término: {projeto.data_final}</p>
              </div>
              <Button 
                onClick={() => deletarProjeto(projeto.id)} 
                className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Excluir
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Projetos;
