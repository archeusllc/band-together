import type { Elysia } from 'elysia';
import type { SetItem, SetSection } from '@band-together/shared';

export interface BroadcastEvent {
  type: 'item-added' | 'item-updated' | 'item-deleted' | 'reordered' | 'section-added' | 'section-updated' | 'section-deleted';
  setlistId: string;
  data: any;
  userId: string;
  userName: string;
  timestamp: string;
}

/**
 * Broadcast service for publishing WebSocket events to connected clients
 */
export const broadcastService = {
  /**
   * Publish an event to all connected clients in a setlist room
   */
  publish: (app: Elysia<any, any, any, any, any, any>, event: BroadcastEvent) => {
    if (!app.server) {
      console.warn('WebSocket server not available - cannot publish event');
      return;
    }

    const roomId = `setlist:${event.setlistId}`;
    app.server.publish(roomId, JSON.stringify(event));
  },

  /**
   * Broadcast item-added event
   */
  itemAdded: (
    app: Elysia<any, any, any, any, any, any>,
    setlistId: string,
    item: SetItem & { track?: any },
    userId: string,
    userName: string
  ) => {
    broadcastService.publish(app, {
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
    app: Elysia<any, any, any, any, any, any>,
    setlistId: string,
    item: SetItem & { track?: any },
    userId: string,
    userName: string
  ) => {
    broadcastService.publish(app, {
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
    app: Elysia<any, any, any, any, any, any>,
    setlistId: string,
    itemId: string,
    userId: string,
    userName: string
  ) => {
    broadcastService.publish(app, {
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
    app: Elysia<any, any, any, any, any, any>,
    setlistId: string,
    setlist: any,
    userId: string,
    userName: string
  ) => {
    broadcastService.publish(app, {
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
    app: Elysia<any, any, any, any, any, any>,
    setlistId: string,
    section: SetSection,
    userId: string,
    userName: string
  ) => {
    broadcastService.publish(app, {
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
    app: Elysia<any, any, any, any, any, any>,
    setlistId: string,
    section: SetSection,
    userId: string,
    userName: string
  ) => {
    broadcastService.publish(app, {
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
    app: Elysia<any, any, any, any, any, any>,
    setlistId: string,
    sectionId: string,
    userId: string,
    userName: string
  ) => {
    broadcastService.publish(app, {
      type: 'section-deleted',
      setlistId,
      data: { sectionId },
      userId,
      userName,
      timestamp: new Date().toISOString(),
    });
  },
};
