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
 * Publisher registry for WebSocket connections
 * Maps setlistId to a publish function registered when a WebSocket connection opens
 */
const setlistPublishers: Record<string, (message: BroadcastEvent) => void> = {};

/**
 * Broadcast service for publishing WebSocket events to connected clients
 */
export const broadcastService = {
  /**
   * Register a publisher function for a setlist
   * Called when a WebSocket connection opens
   */
  registerPublisher: (setlistId: string, publishFn: (message: BroadcastEvent) => void) => {
    setlistPublishers[setlistId] = publishFn;
  },

  /**
   * Unregister a publisher function for a setlist
   * Called when a WebSocket connection closes
   */
  unregisterPublisher: (setlistId: string) => {
    delete setlistPublishers[setlistId];
  },

  /**
   * Publish an event to all connected clients in a setlist room
   */
  publish: (event: BroadcastEvent) => {
    const publishFn = setlistPublishers[event.setlistId];
    if (!publishFn) {
      console.warn(`No publisher registered for setlist ${event.setlistId} - broadcast skipped`);
      return;
    }

    try {
      publishFn(event);
    } catch (error) {
      console.error(`Failed to publish event to setlist ${event.setlistId}:`, error);
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
};
