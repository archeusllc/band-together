import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { apiClient, updateApiClientBaseUrl } from '../services/apiClient';

interface Tag {
  tagId: string;
  category: string;
  value: string;
}

export const Tags: React.FC = () => {
  const [tags, setTags] = useState<Record<string, Tag[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTag, setNewTag] = useState({ category: '', value: '' });

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      updateApiClientBaseUrl();
      const data = await apiClient.tags.list();

      // Group tags by category
      const groupedTags: Record<string, Tag[]> = {};
      data.tags.forEach((tag) => {
        const category = tag.category || 'Uncategorized';
        if (!groupedTags[category]) {
          groupedTags[category] = [];
        }
        groupedTags[category].push({
          tagId: tag.tagId,
          category: category,
          value: tag.name,
        });
      });

      setTags(groupedTags);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tags');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTag.category.trim() || !newTag.value.trim()) {
      setError('Category and value are required');
      return;
    }

    try {
      updateApiClientBaseUrl();
      await apiClient.tags.create({
        name: newTag.value,
        category: newTag.category,
      });
      setNewTag({ category: '', value: '' });
      fetchTags();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create tag');
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    if (!window.confirm('Are you sure you want to delete this tag?')) {
      return;
    }

    try {
      updateApiClientBaseUrl();
      await apiClient.tags.delete(tagId);
      fetchTags();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete tag');
    }
  };

  return (
    <Layout>
      <div className="tags-page">
        <h2>Tags Management</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="create-tag-form">
          <h3>Add New Tag</h3>
          <form onSubmit={handleCreateTag}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Category (e.g., Genre)"
                value={newTag.category}
                onChange={(e) => setNewTag({ ...newTag, category: e.target.value })}
              />
              <input
                type="text"
                placeholder="Value (e.g., Rock)"
                value={newTag.value}
                onChange={(e) => setNewTag({ ...newTag, value: e.target.value })}
              />
              <button type="submit">Add Tag</button>
            </div>
          </form>
        </div>

        {loading ? (
          <p>Loading tags...</p>
        ) : Object.keys(tags).length === 0 ? (
          <p>No tags found</p>
        ) : (
          <div className="tags-grid">
            {Object.entries(tags).map(([category, categoryTags]) => (
              <div key={category} className="tag-category">
                <h4>{category}</h4>
                <div className="tags-list">
                  {categoryTags.map((tag) => (
                    <div key={tag.tagId} className="tag-item">
                      <span>{tag.value}</span>
                      <button onClick={() => handleDeleteTag(tag.tagId)} className="delete-btn">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .tags-page {
          max-width: 1200px;
          margin: 0 auto;
        }

        .tags-page h2 {
          color: #1e1e1e;
          margin-bottom: 1.5rem;
        }

        .create-tag-form {
          background: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }

        .create-tag-form h3 {
          margin-top: 0;
          color: #1e1e1e;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 0.75rem;
        }

        .create-tag-form input {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 0.25rem;
          font-size: 0.95rem;
        }

        .create-tag-form input:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .create-tag-form button {
          background-color: #16a34a;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 0.95rem;
          transition: background-color 0.2s;
        }

        .create-tag-form button:hover {
          background-color: #15803d;
        }

        .tags-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .tag-category {
          background: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .tag-category h4 {
          margin-top: 0;
          color: #1e1e1e;
          border-bottom: 2px solid #3b82f6;
          padding-bottom: 0.5rem;
        }

        .tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #e0e7ff;
          color: #3730a3;
          padding: 0.5rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.9rem;
        }

        .delete-btn {
          background: none;
          border: none;
          color: #3730a3;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0;
          line-height: 1;
          transition: color 0.2s;
        }

        .delete-btn:hover {
          color: #dc2626;
        }

        .error-message {
          background-color: #fee;
          border: 1px solid #fcc;
          color: #c00;
          padding: 0.75rem;
          border-radius: 0.25rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
};
