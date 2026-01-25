import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useEnvironment } from '../contexts/EnvironmentContext';
import { apiClient, updateApiClientBaseUrl } from '../services/apiClient';

interface Track {
  trackId: string;
  title: string;
  artist: string;
  type: string;
  duration?: number;
  tuning?: string;
  isActive: boolean;
  createdAt: string;
}

export const Tracks: React.FC = () => {
  const { environment } = useEnvironment();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterActive, setFilterActive] = useState<string>('');

  useEffect(() => {
    fetchTracks();
  }, [searchQuery, filterType, filterActive]);

  const fetchTracks = async () => {
    try {
      setLoading(true);
      updateApiClientBaseUrl();
      const params: { q?: string; type?: string; active?: string } = {};
      if (searchQuery) params.q = searchQuery;
      if (filterType) params.type = filterType;
      if (filterActive !== '') params.active = filterActive === 'true' ? 'true' : 'false';

      const data = await apiClient.tracks.list(params);
      setTracks(data.tracks);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tracks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (trackId: string) => {
    // Only show confirmation dialog for Production environment
    if (environment === 'production') {
      if (!window.confirm('Are you sure you want to delete this track?')) {
        return;
      }
    }

    try {
      updateApiClientBaseUrl();
      await apiClient.tracks.delete(trackId);
      // Update the track's isActive status without reordering the list
      setTracks(tracks.map((t) => (t.trackId === trackId ? { ...t, isActive: false } : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete track');
    }
  };

  const handleRestore = async (trackId: string) => {
    try {
      updateApiClientBaseUrl();
      await apiClient.tracks.restore(trackId);
      fetchTracks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to restore track');
    }
  };

  return (
    <Layout>
      <div className="tracks-page">
        <h2>Tracks Management</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="filters">
          <input
            type="text"
            placeholder="Search tracks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-input"
          />

          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
            <option value="">All Types</option>
            <option value="SONG">Song</option>
            <option value="BACKING_TRACK">Backing Track</option>
            <option value="INSTRUMENTAL">Instrumental</option>
            <option value="DEMO">Demo</option>
          </select>

          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {loading ? (
          <p>Loading tracks...</p>
        ) : tracks.length === 0 ? (
          <p>No tracks found</p>
        ) : (
          <table className="tracks-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track) => (
                <tr key={track.trackId}>
                  <td>{track.title}</td>
                  <td>{track.artist}</td>
                  <td>{track.type}</td>
                  <td>{track.duration ? `${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, '0')}` : '-'}</td>
                  <td>
                    <span className={`status-badge ${track.isActive ? 'active' : 'inactive'}`}>
                      {track.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    {track.isActive ? (
                      <button onClick={() => handleDelete(track.trackId)} className="btn-danger">
                        Delete
                      </button>
                    ) : (
                      <button onClick={() => handleRestore(track.trackId)} className="btn-success">
                        Restore
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .tracks-page {
          max-width: 1200px;
          margin: 0 auto;
        }

        .tracks-page h2 {
          color: #1e1e1e;
          margin-bottom: 1.5rem;
        }

        .filters {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .filter-input,
        .filter-select {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 0.25rem;
          font-size: 0.95rem;
        }

        .filter-input:focus,
        .filter-select:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .tracks-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .tracks-table th {
          background-color: #f5f5f5;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          border-bottom: 1px solid #ddd;
        }

        .tracks-table td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }

        .tracks-table tbody tr:hover {
          background-color: #f9f9f9;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 0.25rem;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .status-badge.active {
          background-color: #d4edda;
          color: #155724;
        }

        .status-badge.inactive {
          background-color: #f8d7da;
          color: #721c24;
        }

        .btn-danger,
        .btn-success {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.2s;
        }

        .btn-danger {
          background-color: #dc2626;
          color: white;
        }

        .btn-danger:hover {
          background-color: #b91c1c;
        }

        .btn-success {
          background-color: #16a34a;
          color: white;
        }

        .btn-success:hover {
          background-color: #15803d;
        }

        .error-message {
          background-color: #fee;
          border: 1px solid #fcc;
          color: #c00;
          padding: 0.75rem;
          border-radius: 0.25rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </Layout>
  );
};
