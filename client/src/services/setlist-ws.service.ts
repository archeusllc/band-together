import { apiBaseUrl } from './api';

/**
 * Setlist WebSocket presence data
 */
export interface UserPresence {
  connectionId: string;
  userId: string | null;
  userName: string;
  isAuthenticated: boolean;
  isEditing: boolean;
  joinedAt: string;
}

/**
 * Broadcast events from server
 */
export type BroadcastEvent =
  | {
      type: 'item-added' | 'item-updated';
      setlistId: string;
      data: any;
      userId: string;
      userName: string;
      timestamp: string;
    }
  | {
      type: 'item-deleted';
      setlistId: string;
      data: { setItemId: string };
      userId: string;
      userName: string;
      timestamp: string;
    }
  | {
      type: 'reordered' | 'section-added' | 'section-updated';
      setlistId: string;
      data: any;
      userId: string;
      userName: string;
      timestamp: string;
    }
  | {
      type: 'section-deleted';
      setlistId: string;
      data: { sectionId: string };
      userId: string;
      userName: string;
      timestamp: string;
    }
  | {
      type: 'presence-update';
      presence: UserPresence[];
      timestamp: string;
    };

/**
 * Event handler types
 */
type EventHandler<T extends BroadcastEvent = BroadcastEvent> = (event: T) => void;

interface EventHandlers {
  'item-added': EventHandler<Extract<BroadcastEvent, { type: 'item-added' }>>;
  'item-updated': EventHandler<Extract<BroadcastEvent, { type: 'item-updated' }>>;
  'item-deleted': EventHandler<Extract<BroadcastEvent, { type: 'item-deleted' }>>;
  'reordered': EventHandler<Extract<BroadcastEvent, { type: 'reordered' }>>;
  'section-added': EventHandler<Extract<BroadcastEvent, { type: 'section-added' }>>;
  'section-updated': EventHandler<Extract<BroadcastEvent, { type: 'section-updated' }>>;
  'section-deleted': EventHandler<Extract<BroadcastEvent, { type: 'section-deleted' }>>;
  'presence-update': EventHandler<Extract<BroadcastEvent, { type: 'presence-update' }>>;
}

/**
 * WebSocket service for setlist real-time collaboration
 */
class SetlistWebSocketService {
  private ws: WebSocket | null = null;
  private setlistId: string | null = null;
  private handlers: Map<keyof EventHandlers, Set<Function>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private userId: string | null = null;
  private userName: string = 'Guest';
  private currentPresence: UserPresence[] = [];

  /**
   * Connect to WebSocket for a setlist
   */
  connect(setlistId: string, userId?: string, userName?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.setlistId = setlistId;
        this.userId = userId || null;
        this.userName = userName || 'Guest';

        const wsUrl = this.getWebSocketUrl(setlistId);

        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log(`[WebSocket] Connected to setlist ${setlistId}`);
          this.reconnectAttempts = 0;
          this.reconnectDelay = 1000;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('[WebSocket] Failed to parse message:', error);
          }
        };

        this.ws.onerror = (error) => {
          console.error('[WebSocket] Connection error:', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('[WebSocket] Connection closed');
          this.ws = null;
          this.attemptReconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Disconnect WebSocket
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.setlistId = null;
  }

  /**
   * Send start-editing message
   */
  startEditing(): void {
    this.sendMessage({
      type: 'start-editing',
    });
  }

  /**
   * Send stop-editing message
   */
  stopEditing(): void {
    this.sendMessage({
      type: 'stop-editing',
    });
  }

  /**
   * Request current presence from server
   */
  requestPresence(): void {
    this.sendMessage({
      type: 'request-presence',
    });
  }

  /**
   * Subscribe to event
   */
  on<T extends keyof EventHandlers>(event: T, handler: EventHandlers[T]): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);

    // Return unsubscribe function
    return () => {
      this.handlers.get(event)?.delete(handler);
    };
  }

  /**
   * Unsubscribe from event
   */
  off<T extends keyof EventHandlers>(event: T, handler: EventHandlers[T]): void {
    this.handlers.get(event)?.delete(handler);
  }

  /**
   * Get current presence list
   */
  getPresence(): UserPresence[] {
    return this.currentPresence;
  }

  /**
   * Get WebSocket URL with query parameters
   */
  private getWebSocketUrl(setlistId: string): string {
    const baseUrl = apiBaseUrl.replace(/^http/, 'ws');
    const query = new URLSearchParams();

    if (this.userId) {
      query.append('userId', this.userId);
    }
    query.append('userName', this.userName);

    const queryString = query.toString();
    return `${baseUrl}/setlist/${setlistId}/ws${queryString ? `?${queryString}` : ''}`;
  }

  /**
   * Send message via WebSocket
   */
  private sendMessage(message: Record<string, any>): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('[WebSocket] Not connected, cannot send message');
      return;
    }

    try {
      this.ws.send(JSON.stringify(message));
    } catch (error) {
      console.error('[WebSocket] Failed to send message:', error);
    }
  }

  /**
   * Handle incoming message
   */
  private handleMessage(message: BroadcastEvent): void {
    // Update current presence if this is a presence-update event
    if (message.type === 'presence-update') {
      this.currentPresence = message.presence;
    }

    const handlers = this.handlers.get(message.type);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(message);
        } catch (error) {
          console.error(`[WebSocket] Error in ${message.type} handler:`, error);
        }
      });
    }
  }

  /**
   * Attempt to reconnect with exponential backoff
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('[WebSocket] Max reconnect attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(`[WebSocket] Attempting reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    setTimeout(() => {
      if (this.setlistId) {
        this.connect(this.setlistId, this.userId || undefined, this.userName).catch((error) => {
          console.error('[WebSocket] Reconnect failed:', error);
        });
      }
    }, delay);
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

/**
 * Singleton instance of WebSocket service
 */
export const setlistWSService = new SetlistWebSocketService();
