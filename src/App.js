import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo repositório ${Date.now()}`,
      url: "https://github.com/Dikizeko-Oliveira/desafio-frontend-reactjs",
      techs: ["React", "Node.js"],
    });
    //adiciona o novo repositório no final, mantendo os repositórios que já estavam no array
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    //retorna todos os repositórios com id diferente do id recebido como parámetro.
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
