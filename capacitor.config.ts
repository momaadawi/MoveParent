import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.altairparent',
  appName: 'Move Parent',
  webDir: 'dist/MoveParent',
  bundledWebRuntime: false,
  server:{
    url: "http://192.168.1.11:4200",
    cleartext: true,
  }
};

export default config;
