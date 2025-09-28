import { Capacitor } from '@capacitor/core';

export const API_URL = Capacitor.isNativePlatform()
  ? 'http://10.0.2.2:3001'   // Android emulator (and OK for iOS Simulator)
  : 'http://localhost:3001'; // Browser dev
