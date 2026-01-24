/**
 * Setlist WebSocket Service Types
 *
 * Type definitions for real-time collaboration features via WebSocket
 */

export interface UserPresence {
  connectionId: string;
  userId: string | null;
  userName: string;
  isAuthenticated: boolean;
  isEditing: boolean;
  joinedAt: string;
}

export interface BroadcastEvent {
  type: 'item-added' | 'item-updated' | 'item-deleted' | 'reordered' | 'section-added' | 'section-updated' | 'section-deleted' | 'setlist-updated' | 'presence-update';
  setlistId: string;
  data?: any;
  presence?: UserPresence[];
  userId?: string;
  userName?: string;
  timestamp?: string;
}
