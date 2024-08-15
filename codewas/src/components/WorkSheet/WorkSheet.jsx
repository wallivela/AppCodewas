import React, { useState, useEffect } from 'react';
import { fetchUsers } from '/Users/walte/Desktop/EMPRESA/desarrolplanilladecuadre/AppCodewas/codewas/src/service/api';
import './WorkSheet.css';

const WorkSheet = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(['', '', '']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los usuarios. Por favor, intente de nuevo más tarde.');
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleUserSelect = (index, userId) => {
    setSelectedUsers(prev => {
      const newSelected = [...prev];
      newSelected[index] = userId;
      return newSelected;
    });
  };

  const getAvailableUsers = (currentIndex) => {
    return users.filter(user => 
      !selectedUsers.includes(user.id) || selectedUsers[currentIndex] === user.id
    );
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="worksheet-container">
      <h2>COLABORADORES</h2>
      {[0, 1, 2].map((index) => (
        <div key={index} className="user-select">
          <label htmlFor={`user-${index}`}>Usuario {index + 1}:</label>
          <select
            id={`user-${index}`}
            value={selectedUsers[index]}
            onChange={(e) => handleUserSelect(index, e.target.value)}
          >
            <option value="">Seleccione un usuario</option>
            {getAvailableUsers(index).map((user) => (
              <option key={user.id} value={user.id}>
                {user.nombre}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default WorkSheet;