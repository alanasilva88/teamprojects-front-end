import React from 'react';
import Projetos from '../components/Projetos';
import Equipes from '../components/Equipes';
import Tarefas from '../components/Tarefas';

function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-8">Dashboard</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        <Equipes />
        <Projetos />
        <Tarefas />
      </div>
    </div>
  );
}

export default Home;
