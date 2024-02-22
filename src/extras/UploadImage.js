import { storage } from '../../firebaseConfig';
import 'firebase/storage';

export const UploadImage = async (imageUri, path) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const ref = storage.ref().child(path);

  const snapshot = await ref.put(blob);
  const downloadURL = await snapshot.ref.getDownloadURL();

  return downloadURL; // This URL can be used to access the image directly
};
