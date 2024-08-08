import { useEffect, useState } from 'react';
import { getTarefas, addTarefa, deleteTarefa } from '../api/tarefa'; 
import { getProjetos } from '../api/projetos';
import { getUsuarios } from '../api/usuarios';
import { Button, Form } from 'react-bootstrap';

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [dataCriacao, setDataCriacao] = useState('');
  const [dataConclusao, setDataConclusao] = useState('');
  const [projetoSelecionado, setProjetoSelecionado] = useState('');
  const [usuariosSelecionados, setUsuariosSelecionados] = useState([]);

  async function carregarTarefas() {
    try {
      const dados = await getTarefas();
      setTarefas(dados);
    } catch (error) {
      console.error("Erro ao carregar tarefas", error);
    }
  }

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

  async function criarTarefa(event) {
    event.preventDefault();
    try {
      const novaTarefa = { 
        titulo, descricao, status, data_criacao: dataCriacao, data_conclusao: dataConclusao, 
        projeto: projetoSelecionado, usuarios: usuariosSelecionados 
      };
      await addTarefa(novaTarefa);
      setTitulo('');
      setDescricao('');
      setStatus('Pendente');
      setDataCriacao('');
      setDataConclusao('');
      setProjetoSelecionado('');
      setUsuariosSelecionados([]);
      carregarTarefas();
    } catch (error) {
      console.error("Erro ao adicionar tarefa", error);
    }
  }

  async function deletarTarefa(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      try {
        await deleteTarefa(id);
        carregarTarefas();
      } catch (error) {
        console.error("Erro ao deletar tarefa", error);
      }
    }
  }

  useEffect(() => {
    carregarTarefas();
    carregarProjetos();
    carregarUsuarios();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Gerenciar Tarefas</h2>
        <Form onSubmit={criarTarefa}>
          <Form.Group controlId="formTitulo" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700 w-full">Título</Form.Label>
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
            <Form.Label className="text-lg font-medium text-gray-700 w-full">Descrição</Form.Label>
            <Form.Control 
              type="text" 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              placeholder="Digite a descrição da tarefa" 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            />
          </Form.Group>
          <Form.Group controlId="formStatus" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700 w-full">Status</Form.Label>
            <Form.Control 
              as="select" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            >
              <option value="Pendente">Pendente</option>
              <option value="Em progresso">Em progresso</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDataCriacao" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700 w-full">Data de Criação</Form.Label>
            <Form.Control 
              type="date" 
              value={dataCriacao} 
              onChange={(e) => setDataCriacao(e.target.value)} 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            />
          </Form.Group>
          <Form.Group controlId="formDataConclusao" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700 w-full">Data de Conclusão</Form.Label>
            <Form.Control 
              type="date" 
              value={dataConclusao} 
              onChange={(e) => setDataConclusao(e.target.value)} 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            />
          </Form.Group>
          <Form.Group controlId="formProjeto" className="mb-5">
            <Form.Label className="text-lg font-medium text-gray-700 w-full">Projeto</Form.Label>
            <Form.Control 
              as="select" 
              value={projetoSelecionado} 
              onChange={(e) => setProjetoSelecionado(e.target.value)} 
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none"
            >
              {projetos.map(projeto => (
                <option key={projeto.id} value={projeto.id}>
                  {projeto.nome}
                </option>
              ))}
            </Form.Control>
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
            Adicionar Tarefa
          </Button>
        </Form>
        <div className="space-y-6 mt-8">
          {tarefas.map(tarefa => (
            <div key={tarefa.id} className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">{tarefa.titulo}</h3>
              <p className="text-gray-700 mt-2">{tarefa.descricao}</p>
              <p className="text-gray-600 mt-2">Status: {tarefa.status}</p>
              <p className="text-gray-600 mt-2">Data de Criação: {tarefa.data_criacao}</p>
              <p className="text-gray-600 mt-2">Data de Conclusão: {tarefa.data_conclusao}</p>
              <div className="mt-4">
                <h4 className="font-medium text-gray-800">Usuários associados:</h4>
                {tarefa.usuarios && tarefa.usuarios.length > 0 ? (
                  <ul className="list-disc list-inside ml-5 text-gray-700">
                    {tarefa.usuarios.map(usuario => (
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
              <Button variant="danger" onClick={() => deletarTarefa(tarefa.id)} className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg">
                Excluir
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tarefas;
