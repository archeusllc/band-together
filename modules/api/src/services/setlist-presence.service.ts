/**
 * Setlist Presence Service
 *
 * Tracks real-time presence of users viewing/editing setlists via WebSocket connections.
 * Maintains in-memory presence state for each setlist.
 */

export interface UserPresence {
  connectionId: string;
  userId: string | null;
  userName: string;
  isAuthenticated: boolean;
  isEditing: boolean;
  joinedAt: Date;
}

export interface SetlistPresence {
  setlistId: string;
  users: UserPresence[];
  updatedAt: Date;
}

class SetlistPresenceService {
  private presence: Map<string, Map<string, UserPresence>> = new Map();

  /**
   * Add a user to a setlist's presence tracking
   * Returns the updated presence list for the setlist
   */
  addUser(
    setlistId: string,
    connectionId: string,
    userId: string | null,
    userName: string,
    isAuthenticated: boolean
  ): UserPresence[] {
    if (!this.presence.has(setlistId)) {
      this.presence.set(setlistId, new Map());
    }

    const userPresence: UserPresence = {
      connectionId,
      userId,
      userName,
      isAuthenticated,
      isEditing: false,
      joinedAt: new Date(),
    };

    const setlistUsers = this.presence.get(setlistId)!;
    setlistUsers.set(connectionId, userPresence);

    return Array.from(setlistUsers.values());
  }

  /**
   * Remove a user from setlist presence tracking
   * Returns the updated presence list (without the removed user)
   */
  removeUser(setlistId: string, connectionId: string): UserPresence[] {
    const setlistUsers = this.presence.get(setlistId);
    if (!setlistUsers) {
      return [];
    }

    setlistUsers.delete(connectionId);

    // Clean up empty setlist entries
    if (setlistUsers.size === 0) {
      this.presence.delete(setlistId);
    }

    return Array.from(setlistUsers.values());
  }

  /**
   * Update a user's editing status
   */
  updateEditingStatus(
    setlistId: string,
    connectionId: string,
    isEditing: boolean
  ): UserPresence | null {
    const setlistUsers = this.presence.get(setlistId);
    if (!setlistUsers) {
      return null;
    }

    const user = setlistUsers.get(connectionId);
    if (!user) {
      return null;
    }

    user.isEditing = isEditing;
    return user;
  }

  /**
   * Get all users present in a setlist
   */
  getPresence(setlistId: string): UserPresence[] {
    const setlistUsers = this.presence.get(setlistId);
    if (!setlistUsers) {
      return [];
    }

    return Array.from(setlistUsers.values());
  }

  /**
   * Get a specific user's presence
   */
  getUser(setlistId: string, connectionId: string): UserPresence | null {
    const setlistUsers = this.presence.get(setlistId);
    if (!setlistUsers) {
      return null;
    }

    return setlistUsers.get(connectionId) || null;
  }

  /**
   * Get count of authenticated users in a setlist
   */
  getAuthenticatedUserCount(setlistId: string): number {
    const setlistUsers = this.presence.get(setlistId);
    if (!setlistUsers) {
      return 0;
    }

    return Array.from(setlistUsers.values()).filter(
      (u) => u.isAuthenticated
    ).length;
  }

  /**
   * Get users currently editing in a setlist
   */
  getEditingUsers(setlistId: string): UserPresence[] {
    const setlistUsers = this.presence.get(setlistId);
    if (!setlistUsers) {
      return [];
    }

    return Array.from(setlistUsers.values()).filter((u) => u.isEditing);
  }
}

// Export singleton instance
export const setlistPresenceService = new SetlistPresenceService();
