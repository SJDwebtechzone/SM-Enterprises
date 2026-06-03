import React, { useEffect, useState } from 'react';

const PromoAdmin = () => {
  const [promos, setPromos] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchPromos = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/promos`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => setPromos(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Failed to fetch promos:', err);
        setPromos([]);
      });
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const addPromo = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/promos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newMessage, active: true }),
    }).then(() => {
      setNewMessage('');
      fetchPromos();
    });
  };

  const togglePromo = (id) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/promos/${id}/toggle`, {
      method: 'PUT',
    }).then(fetchPromos);
  };

  const deletePromo = (id) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/promos/${id}`, {
      method: 'DELETE',
    }).then(fetchPromos);
  };

  return (
    <div className="container mt-4">
      <h4>Promo Admin Panel</h4>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New promo message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={addPromo}>
          Add Promo
        </button>
      </div>

      <ul className="list-group">
        {Array.isArray(promos) && promos.map((promo) => (
          <li key={promo._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{promo.message}</span>
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => togglePromo(promo._id)}>
                {promo.active ? 'Deactivate' : 'Activate'}
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => deletePromo(promo._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromoAdmin;