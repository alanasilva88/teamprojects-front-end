import React from 'react';

function Tarefas() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/3">
      <h2 className="text-2xl font-bold mb-4">Tarefas</h2>
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-lg">Tarefa 1</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-lg">Tarefa 2</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-lg">Tarefa 3</p>
        </div>
      </div>
    </div>
  );
}

export default Tarefas;
