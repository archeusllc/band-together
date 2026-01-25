import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { apiClient, updateApiClientBaseUrl } from '../services/apiClient';

interface ImportResult {
  success: number;
  failed: number;
  errors: Array<{ row: number; message: string }>;
}

export const Import: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'csv' | 'json' | 'spotify'>('csv');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ImportResult | null>(null);
  const [spotifyQuery, setSpotifyQuery] = useState('');
  const [spotifyResults, setSpotifyResults] = useState<any[]>([]);
  const [selectedSpotifyTracks, setSelectedSpotifyTracks] = useState<Set<string>>(new Set());

  const handleFileUpload = async (file: File, type: 'csv' | 'json') => {
    if (!file) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      updateApiClientBaseUrl();
      if (type === 'csv') {
        const data = await apiClient.import.csv(file);
        setResult({
          success: 1,
          failed: 0,
          errors: [],
        });
      } else {
        const fileContent = JSON.parse(await file.text());
        const data = await apiClient.import.json(fileContent);
        setResult({
          success: 1,
          failed: 0,
          errors: [],
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      updateApiClientBaseUrl();
      const blob = await apiClient.import.template();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tracks-template.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download template');
    }
  };

  const handleSpotifySearch = async () => {
    if (!spotifyQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      updateApiClientBaseUrl();
      const data = await apiClient.spotify.search(spotifyQuery);
      setSpotifyResults(data.tracks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Spotify search failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleSpotifyTrack = (trackId: string) => {
    const newSelected = new Set(selectedSpotifyTracks);
    if (newSelected.has(trackId)) {
      newSelected.delete(trackId);
    } else {
      newSelected.add(trackId);
    }
    setSelectedSpotifyTracks(newSelected);
  };

  return (
    <Layout>
      <div className="import-page">
        <h2>Bulk Import Tracks</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'csv' ? 'active' : ''}`}
            onClick={() => setActiveTab('csv')}
          >
            CSV Upload
          </button>
          <button
            className={`tab-button ${activeTab === 'json' ? 'active' : ''}`}
            onClick={() => setActiveTab('json')}
          >
            JSON Upload
          </button>
          <button
            className={`tab-button ${activeTab === 'spotify' ? 'active' : ''}`}
            onClick={() => setActiveTab('spotify')}
          >
            Spotify Search
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'csv' && (
            <div className="upload-section">
              <h3>Import from CSV</h3>
              <p>Upload a CSV file with columns: title, artist, type, duration, tuning</p>

              <div className="upload-area">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files[0], 'csv')}
                  disabled={loading}
                />
              </div>

              <button onClick={handleDownloadTemplate} className="btn-secondary">
                Download Template
              </button>

              {result && (
                <div className="import-result">
                  <h4>Import Result</h4>
                  <p>Success: {result.success}</p>
                  <p>Failed: {result.failed}</p>
                  {result.errors.length > 0 && (
                    <div className="errors-list">
                      <h5>Errors:</h5>
                      <ul>
                        {result.errors.slice(0, 10).map((err, idx) => (
                          <li key={idx}>
                            Row {err.row}: {err.message}
                          </li>
                        ))}
                        {result.errors.length > 10 && <li>... and {result.errors.length - 10} more errors</li>}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'json' && (
            <div className="upload-section">
              <h3>Import from JSON</h3>
              <p>Upload a JSON file with an array of track objects</p>

              <div className="upload-area">
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files[0], 'json')}
                  disabled={loading}
                />
              </div>

              {result && (
                <div className="import-result">
                  <h4>Import Result</h4>
                  <p>Success: {result.success}</p>
                  <p>Failed: {result.failed}</p>
                  {result.errors.length > 0 && (
                    <div className="errors-list">
                      <h5>Errors:</h5>
                      <ul>
                        {result.errors.slice(0, 10).map((err, idx) => (
                          <li key={idx}>
                            Row {err.row}: {err.message}
                          </li>
                        ))}
                        {result.errors.length > 10 && <li>... and {result.errors.length - 10} more errors</li>}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'spotify' && (
            <div className="upload-section">
              <h3>Import from Spotify</h3>
              <p>Search Spotify catalog and select tracks to import</p>

              <div className="search-section">
                <input
                  type="text"
                  placeholder="Search Spotify (e.g., 'Purple Haze')"
                  value={spotifyQuery}
                  onChange={(e) => setSpotifyQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSpotifySearch()}
                />
                <button onClick={handleSpotifySearch} disabled={loading} className="btn-primary">
                  Search
                </button>
              </div>

              {spotifyResults.length > 0 && (
                <div className="spotify-results">
                  <h4>Results ({spotifyResults.length})</h4>
                  <div className="results-list">
                    {spotifyResults.map((track, idx) => (
                      <div key={idx} className="spotify-track">
                        <input
                          type="checkbox"
                          checked={selectedSpotifyTracks.has(track.id)}
                          onChange={() => toggleSpotifyTrack(track.id)}
                        />
                        <div className="track-info">
                          <strong>{track.name}</strong>
                          <p>{track.artists?.[0]?.name || 'Unknown Artist'}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedSpotifyTracks.size > 0 && (
                    <button className="btn-success">
                      Import {selectedSpotifyTracks.size} Track{selectedSpotifyTracks.size !== 1 ? 's' : ''}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {loading && <p className="loading-message">Processing... Please wait</p>}
      </div>

      <style>{`
        .import-page {
          max-width: 900px;
          margin: 0 auto;
        }

        .import-page h2 {
          color: #1e1e1e;
          margin-bottom: 1.5rem;
        }

        .tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #ddd;
        }

        .tab-button {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          font-size: 1rem;
          color: #666;
          transition: all 0.2s;
        }

        .tab-button.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
        }

        .tab-button:hover {
          color: #333;
        }

        .tab-content {
          background: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .upload-section h3 {
          margin-top: 0;
          color: #1e1e1e;
        }

        .upload-area {
          border: 2px dashed #ddd;
          padding: 2rem;
          text-align: center;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .upload-area input {
          display: block;
          margin: 0 auto;
        }

        .search-section {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .search-section input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 0.25rem;
        }

        .btn-primary,
        .btn-secondary,
        .btn-success {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 0.95rem;
          transition: background-color 0.2s;
        }

        .btn-primary {
          background-color: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background-color: #2563eb;
        }

        .btn-secondary {
          background-color: #6b7280;
          color: white;
        }

        .btn-secondary:hover {
          background-color: #4b5563;
        }

        .btn-success {
          background-color: #16a34a;
          color: white;
          width: 100%;
          margin-top: 1rem;
        }

        .btn-success:hover {
          background-color: #15803d;
        }

        .import-result {
          background-color: #f0f9ff;
          border: 1px solid #bae6fd;
          padding: 1rem;
          border-radius: 0.25rem;
          margin-top: 1rem;
        }

        .import-result h4 {
          margin: 0 0 0.5rem 0;
          color: #0369a1;
        }

        .errors-list {
          background-color: white;
          padding: 0.75rem;
          border-radius: 0.25rem;
          margin-top: 0.5rem;
        }

        .errors-list h5 {
          margin: 0 0 0.5rem 0;
        }

        .errors-list ul {
          margin: 0;
          padding-left: 1.5rem;
          font-size: 0.85rem;
          color: #dc2626;
        }

        .spotify-results {
          margin-top: 1.5rem;
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 400px;
          overflow-y: auto;
          margin-bottom: 1rem;
        }

        .spotify-track {
          display: flex;
          gap: 0.75rem;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 0.25rem;
          align-items: flex-start;
        }

        .spotify-track input {
          margin-top: 0.25rem;
        }

        .track-info {
          flex: 1;
        }

        .track-info strong {
          display: block;
          color: #1e1e1e;
        }

        .track-info p {
          margin: 0.25rem 0 0 0;
          color: #666;
          font-size: 0.9rem;
        }

        .error-message {
          background-color: #fee;
          border: 1px solid #fcc;
          color: #c00;
          padding: 0.75rem;
          border-radius: 0.25rem;
          margin-bottom: 1rem;
        }

        .loading-message {
          text-align: center;
          color: #666;
          padding: 1rem;
        }
      `}</style>
    </Layout>
  );
};
