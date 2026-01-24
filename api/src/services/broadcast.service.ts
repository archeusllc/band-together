import type { Elysia } from 'elysia';
import type { SetItem, SetSection } from '@band-together/shared';

export interface BroadcastEvent {
  type: 'item-added' | 'item-updated' | 'item-deleted' | 'reordered' | 'section-added' | 'section-updated' | 'section-deleted' | 'setlist-updated';
  setlistId: string;
  data: any;
  userId: string;
  userName: string;
  timestamp: string;
}

/**
 * Broadcast service for publishing WebSocket events to connected clients
 * Stores reference to app instance to use app.server.publish() for broadcasting to all connected clients in a room
 */
let appInstance: Elysia<any, any, any, any, any, any> | null = null;

export const broadcastService = {
  /**
   * Initialize broadcast service with app instance
   * Must be called once during app startup
   */
  setApp: (app: Elysia<any, any, any, any, any, any>) => {
    appInstance = app;
    console.log('[Broadcast] Service initialized with app instance, server available:', !!app.server);
  },

  /**
   * Publish an event to all connected clients in a setlist room
   */
  publish: (event: BroadcastEvent) => {
    if (!appInstance || !appInstance.server) {
      console.warn(`[Broadcast] WebSocket server not available - cannot broadcast to setlist ${event.setlistId}`);
      return;
    }

    const roomId = `setlist:${event.setlistId}`;
    try {
      console.log(`[Broadcast] Publishing ${event.type} to room ${roomId}`);
      appInstance.server.publish(roomId, JSON.stringify(event));
    } catch (error) {
      console.error(`[Broadcast] Failed to publish event to setlist ${event.setlistId}:`, error);
    }
  },

  /**
   * Broadcast item-added event
   */
  itemAdded: (
    setlistId: string,
    item: SetItem & { track?: any },
    userId: string,
    userName: string
  ) => {
    broadcastService.publish({
      type: 'item-added',
      setlistId,
      data: item,
      userId,
      userName,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Broadcast item-updated event
   */
  itemUpdated: (
    setlistId: string,
    item: SetItem & { track?: any },
    userId: string,
    userName: string
  ) => {
    broadcastService.publish({
      type: 'item-updated',
      setlistId,
      data: item,
      userId,
      userName,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Broadcast item-deleted event
   */
  itemDeleted: (
    setlistId: string,
    itemId: string,
    userId: string,
    userName: string
  ) => {
    broadcastService.publish({
      type: 'item-deleted',
      setlistId,
      data: { setItemId: itemId },
      userId,
      userName,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Broadcast reordered event with updated setlist
   */
  reordered: (
    setlistId: string,
    setlist: any,
    userId: string,
    userName: string
  ) => {
    broadcastService.publish({
      type: 'reordered',
      setlistId,
      data: setlist,
      userId,
      userName,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Broadcast section-added event
   */
  sectionAdded: (
    setlistId: string,
    section: SetSection,
    userId: string,
    userName: string
  ) => {
    broadcastService.publish({
      type: 'section-added',
      setlistId,
      data: section,
      userId,
      userName,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Broadcast section-updated event
   */
  sectionUpdated: (
    setlistId: string,
    section: SetSection,
    userId: string,
    userName: string
  ) => {
    broadcastService.publish({
      type: 'section-updated',
      setlistId,
      data: section,
      userId,
      userName,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Broadcast section-deleted event
   */
  sectionDeleted: (
    setlistId: string,
    sectionId: string,
    userId: string,
    userName: string
  ) => {
    broadcastService.publish({
      type: 'section-deleted',
      setlistId,
      data: { sectionId },
      userId,
      userName,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Broadcast setlist-updated event
   */
  setlistUpdated: (
    setlistId: string,
    setlist: any,
    userId: string,
    userName: string
  ) => {
    broadcastService.publish({
      type: 'setlist-updated',
      setlistId,
      data: setlist,
      userId,
      userName,
      timestamp: new Date().toISOString(),
    });
  },
};
