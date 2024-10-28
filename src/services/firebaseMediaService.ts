import {getDownloadURL, getStorage, listAll, ref} from "firebase/storage";


export const FirebaseMediaService = {

  getUserProfileMedia: async (id: string) : Promise<string> => {
    const _storage = getStorage();

    try {
      const storageRef = ref(_storage, `users/${id}/profile_image.jpg`);
      return await getDownloadURL(storageRef);
    } catch (e) {
      return ''
    }
  },

  getUserMediaByList: async (id: string, photos: string[]) : Promise<string[]> => {
    if (!photos.length) return [];

    const _storage = getStorage();
    const storageRef = ref(_storage, `users/${id}/photos`);
    const result = await listAll(storageRef);

    try {
      return await Promise.all(result.items.map((itemRef) => getDownloadURL(itemRef)));
    } catch (e) {
      return [];
    }
  },

  getUserVideoPresentation: async (id: string) : Promise<string> => {
    const _storage = getStorage();
    const storageRef = ref(_storage, `users/${id}/presentation/presentation.mp4`);

    try {
      return await getDownloadURL(storageRef);
    } catch (e) {
      return ''
    }
  },

  getUserIdentityMedia: async (id: string) : Promise<string[]> => {
    const _storage = getStorage();
    const storageRef = ref(_storage, `users/${id}/identity`);
    const result = await listAll(storageRef);

    try {
      return await Promise.all(result.items.map((itemRef) => getDownloadURL(itemRef)));
    } catch (e) {
      return []
    }
  },
}
