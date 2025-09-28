import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

export interface UserPhoto {
  filepath: string; // store only the file name
  webviewPath?: string; // data URL for web, file URL for native
}

const PHOTO_STORAGE = 'photos';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  public photos: UserPhoto[] = [];

  async loadSaved() {
    const { value } = await Preferences.get({ key: PHOTO_STORAGE });
    this.photos = value ? JSON.parse(value) : [];

    // Rehydrate each photo's webviewPath from filesystem (web-safe)
    for (const p of this.photos) {
      const file = await Filesystem.readFile({
        path: p.filepath,
        directory: Directory.Data,
      });
      p.webviewPath = `data:image/jpeg;base64,${file.data}`;
    }
  }

  async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90,
    });

    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);
    await Preferences.set({
      key: PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
  }

  async deletePhoto(photo: UserPhoto, position: number) {
    this.photos.splice(position, 1);
    await Preferences.set({
      key: PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
    await Filesystem.deleteFile({
      path: photo.filepath,
      directory: Directory.Data,
    });
  }

  private async savePicture(photo: Photo): Promise<UserPhoto> {
    const fileName = `${Date.now()}.jpeg`;
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const base64Data = btoa(String.fromCharCode(...new Uint8Array(buffer)));

    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    // For immediate display in current session:
    return {
      filepath: fileName,
      webviewPath: `data:image/jpeg;base64,${base64Data}`,
    };
  }
}
