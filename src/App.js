import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repo = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    const response = await api.post("repositories", repo);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete("repositories/" + id);

    if (response.status === 204) {
      const repoIdx = repositories.findIndex((repo) => repo.id === id);
      const newRepo = [...repositories];
      newRepo.splice(repoIdx, 1);
      setRepositories(newRepo);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button
              key={repo.id}
              onClick={() => handleRemoveRepository(repo.id)}
            >
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
