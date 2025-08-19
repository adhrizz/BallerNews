import React, { useState, useEffect } from 'react';
import './Updates.css';

const Updates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });

  const categories = [
    'Premier League',
    'Champions League',
    'La Liga',
    'Bundesliga',
    'Serie A',
    'Transfer News',
    'International',
    'Other'
  ];

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/updates');
      const data = await response.json();
      setUpdates(data);
    } catch (error) {
      console.error('Error fetching updates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ title: '', content: '', category: '' });
        fetchUpdates();
      } else {
        const error = await response.json();
        alert(error.error || 'Error adding update');
      }
    } catch (error) {
      alert('Error adding update');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this update?')) {
      return;
    }

    try {
      const response = await fetch(`/api/updates/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchUpdates();
      } else {
        alert('Error deleting update');
      }
    } catch (error) {
      alert('Error deleting update');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="updates-container">
      <div className="section-header">
        <h3>Football Updates</h3>
      </div>

      <div className="updates-content">
        <div className="add-update-section">
          <h4>Add New Update</h4>
          <form onSubmit={handleSubmit} className="update-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter update title"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Enter update content"
                className="form-textarea"
              />
            </div>
            <button type="submit" className="submit-btn">
              Add Update
            </button>
          </form>
        </div>

        <div className="updates-list-section">
          <h4>Recent Updates</h4>
          {loading ? (
            <div className="loading-updates">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="update-card-skeleton">
                  <div className="skeleton-header">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-category"></div>
                  </div>
                  <div className="skeleton-content"></div>
                </div>
              ))}
            </div>
          ) : updates.length > 0 ? (
            <div className="updates-list">
              {updates.map(update => (
                <div key={update.id} className="update-card">
                  <div className="update-header">
                    <div className="update-info">
                      <h5 className="update-title">{update.title}</h5>
                      <span className="update-date">{update.date}</span>
                    </div>
                    <div className="update-category">{update.category}</div>
                  </div>
                  <div className="update-content">
                    <p>{update.content}</p>
                  </div>
                  <div className="update-actions">
                    <button
                      onClick={() => handleDelete(update.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-updates">
              <p>No updates yet. Be the first to add one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Updates; 