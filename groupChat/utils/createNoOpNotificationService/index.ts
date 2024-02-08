import type { NotificationServiceInterface } from '@sendbird/uikit-react-native';

/**
 * Push notification integration is deferred for the initial implementation
 * of group chat. Sendbird requires an implementation of notifications but can
 * function perfectly fine without them so this no-op implementation is used
 * as a stopgap.
 *
 * When the time comes, this should be replaced with expo-notifications and
 * `createExpoNotificationService(ExpoNotifications);`
 */
export const createNoOpNotificationService = (): NotificationServiceInterface => ({
  async getAPNSToken(): Promise<string | null> {
    return await new Promise((resolve) => {
      resolve(null);
    });
  },
  async getFCMToken(): Promise<string | null> {
    return await new Promise((resolve) => {
      resolve(null);
    });
  },
  async hasPushPermission(): Promise<boolean> {
    return await new Promise((resolve) => {
      resolve(false);
    });
  },
  async requestPushPermission(): Promise<boolean> {
    return await new Promise((resolve) => {
      resolve(false);
    });
  },
  onTokenRefresh(): () => void {
    return () => {
      // do nothing
    };
  },
});
