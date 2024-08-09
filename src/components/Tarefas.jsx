import { useEffect, useState } from 'react';
import { getTarefas, addTarefa, deleteTarefa } from '../api/tarefas';
import { getProjetos } from '../api/projetos';
import { Button, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [dataCriacao, setDataCriacao] = useState('');
  const [dataConclusao, setDataConclusao] = useState('');
  const [projetoSelecionado, setProjetoSelecionado] = useState('');
  const [nomeProjeto, setNomeProjeto] = useState('');

  async function carregarTarefas() {
    try {
      const dados = await getTarefas();
      setTarefas(dados);
    } catch (error) {
      toast.error("Erro ao carregar tarefas");
      console.error("Erro ao carregar tarefas", error);
    }
  }

  async function carregarProjetos() {
    try {
      const dados = await getProjetos();
      setProjetos(dados);
    } catch (error) {
      toast.error("Erro ao carregar projetos");
      console.error("Erro ao carregar projetos", error);
    }
  }

  async function criarTarefa(event) {
    event.preventDefault();
    if (!titulo || !descricao || !dataCriacao) {
      toast.error("Todos os campos obrigatórios devem ser preenchidos!");
      return;
    }
    try {
      const novaTarefa = { 
        titulo, 
        descricao, 
        status, 
        data_criacao: dataCriacao, 
        data_conclusao: dataConclusao,
        projetoId: projetoSelecionado,
        nomeProjeto
      };
      await addTarefa(novaTarefa);
      setTitulo('');
      setDescricao('');
      setStatus('Pendente');
      setDataCriacao('');
      setDataConclusao('');
      setProjetoSelecionado('');
      setNomeProjeto('');
      carregarTarefas();
      toast.success("Tarefa criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao adicionar tarefa.");
      console.error("Erro ao adicionar tarefa", error);
    }
  }

  async function deletarTarefa(id) {
    const deletar = window.confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      try {
        await deleteTarefa(id);
        carregarTarefas();
        toast.success("Tarefa deletada com sucesso!");
      } catch (error) {
        toast.error("Erro ao deletar tarefa.");
        console.error("Erro ao deletar tarefa", error);
      }
    }
  }

  useEffect(() => {
    console.log(`Projeto selecionado: ${projetoSelecionado}`);
    const projeto = projetos.find(p => p.id === projetoSelecionado);
    if (projeto) {
      setNomeProjeto(projeto.nome);
    } else {
      setNomeProjeto('');
    }
  }, [projetoSelecionado, projetos]);

  useEffect(() => {
    carregarProjetos();
    carregarTarefas();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Gerenciar Tarefas</h2>
        <Form onSubmit={criarTarefa}>
          <Form.Group controlId="formTitulo" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700">Título</Form.Label>
            <Form.Control 
              type="text" 
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)} 
              placeholder="Digite o título da tarefa" 
              required 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            />
          </Form.Group>
          <Form.Group controlId="formDescricao" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700">Descrição</Form.Label>
            <Form.Control 
              type="text" 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              placeholder="Digite a descrição da tarefa" 
              required 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            />
          </Form.Group>
          <Form.Group controlId="formStatus" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700">Status</Form.Label>
            <Form.Control 
              as="select" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              required 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            >
              <option value="Pendente">Pendente</option>
              <option value="Em progresso">Em progresso</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDataCriacao" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700">Data de Criação</Form.Label>
            <Form.Control 
              type="date" 
              value={dataCriacao} 
              onChange={(e) => setDataCriacao(e.target.value)} 
              required 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            />
          </Form.Group>
          <Form.Group controlId="formDataConclusao" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700">Data de Conclusão</Form.Label>
            <Form.Control 
              type="date" 
              value={dataConclusao} 
              onChange={(e) => setDataConclusao(e.target.value)} 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            />
          </Form.Group>
          <Form.Group controlId="formProjeto" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700">Projeto</Form.Label>
            <Form.Control 
              as="select" 
              value={projetoSelecionado} 
              onChange={(e) => setProjetoSelecionado(e.target.value)} 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            >
              <option value="">Selecione um projeto</option>
              {projetos.map((projeto) => (
                <option key={projeto.id} value={projeto.id}>
                  {projeto.nome}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button 
            type="submit" 
            className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Criar Tarefa
          </Button>
        </Form>
      </div>
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Lista de Tarefas</h3>
        <ul>
          {tarefas.map((tarefa) => {
            const projeto = projetos.find(p => p.id === tarefa.projetoId);
            return (
              <li key={tarefa.id} className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-bold">{tarefa.titulo}</h4>
                  <p className="text-gray-600">{tarefa.descricao}</p>
                  <p className="text-gray-600">Status: {tarefa.status}</p>
                  <p className="text-gray-600">Criação: {tarefa.data_criacao}</p>
                  <p className="text-gray-600">Conclusão: {tarefa.data_conclusao}</p>
                  <p className="text-gray-600">Projeto: {projeto ? projeto.nome : 'Sem projeto'}</p>
                </div>
                <Button 
                  onClick={() => deletarTarefa(tarefa.id)} 
                  className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Deletar
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Tarefas;
