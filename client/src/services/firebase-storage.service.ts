import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, auth } from '@config/firebase.config';

export const firebaseStorageService = {
  /**
   * Upload user avatar
   */
  uploadAvatar: async (imageUri: string, userId: string): Promise<{ url: string | null; error: any }> => {
    try {
      // Get current user to ensure authenticated
      const currentUser = auth.currentUser;
      if (!currentUser || currentUser.uid !== userId) {
        return { url: null, error: new Error('Unauthorized') };
      }

      // Convert image URI to blob
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Create a unique filename
      const timestamp = Date.now();
      const fileExtension = imageUri.split('.').pop() || 'jpg';
      const filename = `avatar_${timestamp}.${fileExtension}`;

      // Create reference to storage location
      const storageRef = ref(storage, `avatars/${userId}/${filename}`);

      // Upload file
      await uploadBytes(storageRef, blob);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      return { url: downloadURL, error: null };
    } catch (error) {
      return { url: null, error };
    }
  },

  /**
   * Upload guild image (act, venue, or club avatar)
   */
  uploadGuildImage: async (imageUri: string, guildId: string): Promise<{ url: string | null; error: any }> => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return { url: null, error: new Error('Unauthorized') };
      }

      const response = await fetch(imageUri);
      const blob = await response.blob();

      const timestamp = Date.now();
      const fileExtension = imageUri.split('.').pop() || 'jpg';
      const filename = `guild_${timestamp}.${fileExtension}`;

      const storageRef = ref(storage, `guilds/${guildId}/${filename}`);
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      return { url: downloadURL, error: null };
    } catch (error) {
      return { url: null, error };
    }
  },

  /**
   * Delete a file from storage
   */
  deleteFile: async (fileUrl: string): Promise<{ error: any }> => {
    try {
      // Extract path from URL
      const url = new URL(fileUrl);
      const pathMatch = url.pathname.match(/\/o\/(.+)\?/);
      if (!pathMatch) {
        return { error: new Error('Invalid file URL') };
      }

      const filePath = decodeURIComponent(pathMatch[1]);
      const fileRef = ref(storage, filePath);

      await deleteObject(fileRef);
      return { error: null };
    } catch (error) {
      return { error };
    }
  },
};
