import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.altairparent',
  appName: 'Move Parent',
  webDir: 'dist/MoveParent',
  bundledWebRuntime: false,
  plugins:{
    PushNotifications: {
      presentationOptions: ["badge", 'alert', 'sound']
    }
  }
};

export default config;
