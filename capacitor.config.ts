import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.moveparent.school',
  appName: 'Move Parent',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:{
    PushNotifications: {
      presentationOptions: ["badge", 'alert', 'sound']
    }
  }
};

export default config;
