import React from 'react';
import { Layout } from '../components/Layout';

export const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Tracks</h3>
            <p>Manage the global track database</p>
            <a href="/tracks" className="card-link">
              Go to Tracks
            </a>
          </div>
          <div className="card">
            <h3>Tags</h3>
            <p>Manage track categories and genres</p>
            <a href="/tags" className="card-link">
              Go to Tags
            </a>
          </div>
          <div className="card">
            <h3>Import Tracks</h3>
            <p>Bulk import from CSV, JSON, or Spotify</p>
            <a href="/import" className="card-link">
              Start Import
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard {
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard h2 {
          color: #1e1e1e;
          margin-bottom: 2rem;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .card h3 {
          margin: 0 0 0.5rem 0;
          color: #1e1e1e;
        }

        .card p {
          color: #666;
          margin: 0 0 1rem 0;
        }

        .card-link {
          display: inline-block;
          background-color: #3b82f6;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .card-link:hover {
          background-color: #2563eb;
        }
      `}</style>
    </Layout>
  );
};
