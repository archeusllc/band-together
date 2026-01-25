import React, { createContext, useContext, useState, ReactNode } from 'react';
import { feedService } from '@services';
import type { CalendarEvent, Act, Venue } from '@band-together/types';

type FeedEvent = CalendarEvent & {
  venue?: Venue;
  acts?: Act[];
};

interface FeedContextType {
  events: FeedEvent[];
  loading: boolean;
  refreshing: boolean;
  hasMore: boolean;
  error: string | null;
  fetchFeed: (pageNum?: number) => Promise<void>;
  refreshFeed: () => Promise<void>;
  loadMore: () => Promise<void>;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const useFeed = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error('useFeed must be used within a FeedProvider');
  }
  return context;
};

export const FeedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = async (pageNum: number = 1) => {
    if (pageNum === 1) {
      setLoading(true);
    }
    setError(null);

    try {
      const { data, error: err } = await feedService.getFeed(pageNum, 20);

      if (err || !data) {
        setError('Failed to load feed');
        return;
      }

      if (pageNum === 1) {
        setEvents(data.events);
      } else {
        setEvents(prev => [...prev, ...data.events]);
      }

      setHasMore(data.events.length === 20);
      setPage(pageNum);
    } catch (err) {
      setError('Failed to load feed');
      console.error('Feed fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshFeed = async () => {
    setRefreshing(true);
    await fetchFeed(1);
  };

  const loadMore = async () => {
    if (!loading && !refreshing && hasMore) {
      await fetchFeed(page + 1);
    }
  };

  return (
    <FeedContext.Provider
      value={{
        events,
        loading,
        refreshing,
        hasMore,
        error,
        fetchFeed,
        refreshFeed,
        loadMore,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};
