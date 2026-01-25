import React, { useState, useEffect } from 'react';
import { useEnvironment, Environment } from '../contexts/EnvironmentContext';
import { apiClient, updateApiClientBaseUrl } from '../services/apiClient';
import './EnvironmentBadge.css';

type HealthStatus = 'healthy' | 'degraded' | 'unhealthy' | 'loading';

export const EnvironmentBadge: React.FC = () => {
  const { environment, setEnvironment } = useEnvironment();
  const [isOpen, setIsOpen] = useState(false);
  const [healthStatus, setHealthStatus] = useState<HealthStatus>('loading');

  useEffect(() => {
    const checkHealth = async () => {
      setHealthStatus('loading');
      updateApiClientBaseUrl();
      const status = await apiClient.health.check();
      setHealthStatus(status);
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, [environment]);

  const getColorClass = (env: Environment): string => {
    switch (env) {
      case 'development':
        return 'badge-green';
      case 'staging':
        return 'badge-yellow';
      case 'production':
        return 'badge-red';
    }
  };

  const getHealthColor = (status: HealthStatus): string => {
    switch (status) {
      case 'healthy':
        return '#10b981';
      case 'degraded':
        return '#f59e0b';
      case 'unhealthy':
        return '#ef4444';
      case 'loading':
        return '#9ca3af';
    }
  };

  const handleSelect = (env: Environment) => {
    setEnvironment(env);
    setIsOpen(false);
  };

  return (
    <div className="environment-badge-container">
      <button
        className={`environment-badge ${getColorClass(environment)}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {environment.toUpperCase()}
        <span className="chevron">▼</span>
      </button>
      <div
        className="health-indicator"
        style={{ backgroundColor: getHealthColor(healthStatus) }}
        title={`Health: ${healthStatus}`}
      />
      {isOpen && (
        <div className="environment-dropdown">
          <button
            className={`dropdown-item ${environment === 'development' ? 'selected' : ''}`}
            onClick={() => handleSelect('development')}
          >
            🟢 Development (localhost:3001)
          </button>
          <button
            className={`dropdown-item ${environment === 'staging' ? 'selected' : ''}`}
            onClick={() => handleSelect('staging')}
          >
            🟡 Staging (fly.dev)
          </button>
          <button
            className={`dropdown-item ${environment === 'production' ? 'selected' : ''}`}
            onClick={() => handleSelect('production')}
          >
            🔴 Production (placeholder)
          </button>
        </div>
      )}
    </div>
  );
};
