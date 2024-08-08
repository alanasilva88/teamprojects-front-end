import React from 'react';

function Projetos() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/3">
      <h2 className="text-2xl font-bold mb-4">Projetos</h2>
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-lg">Projeto 1</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-lg">Projeto 2</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-lg">Projeto 3</p>
        </div>
      </div>
    </div>
  );
}

export default Projetos;
