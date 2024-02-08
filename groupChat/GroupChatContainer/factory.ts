import {
  createExpoClipboardService,
  createExpoFileService,
  createExpoMediaService,
  createExpoPlayerService,
  createExpoRecorderService,
} from '@sendbird/uikit-react-native';
import * as ExpoAV from 'expo-av';
import * as ExpoClipboard from 'expo-clipboard';
import * as ExpoDocumentPicker from 'expo-document-picker';
import * as ExpoFS from 'expo-file-system';
import * as ExpoImageManipulator from 'expo-image-manipulator';
import * as ExpoImagePicker from 'expo-image-picker';
import * as ExpoMediaLibrary from 'expo-media-library';
import * as ExpoVideoThumbnail from 'expo-video-thumbnails';

import { createNoOpNotificationService } from '../utils/createNoOpNotificationService';

export const ExpoNotificationService = createNoOpNotificationService();
export const ExpoClipboardService = createExpoClipboardService(ExpoClipboard);
export const ExpoFileService = createExpoFileService({
  fsModule: ExpoFS,
  imagePickerModule: ExpoImagePicker,
  mediaLibraryModule: ExpoMediaLibrary,
  documentPickerModule: ExpoDocumentPicker,
});
export const ExpoMediaService = createExpoMediaService({
  avModule: ExpoAV,
  thumbnailModule: ExpoVideoThumbnail,
  imageManipulator: ExpoImageManipulator,
  fsModule: ExpoFS,
});
export const ExpoPlayerService = createExpoPlayerService({
  avModule: ExpoAV,
});

export const ExpoRecorderService = createExpoRecorderService({
  avModule: ExpoAV,
});
