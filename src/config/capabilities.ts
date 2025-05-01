import { androidConfig } from './android.config';
import { iosConfig } from './ios.config';

export interface AppiumConfig {
    capabilities: Record<string, any>;
    port: number;
}

export const getCapabilities = (): AppiumConfig => {
    const platform = process.env.PLATFORM || 'android';
    
    switch (platform.toLowerCase()) {
        case 'ios':
            return {
                capabilities: iosConfig,
                port: 4724
            };
        case 'android':
        default:
            return {
                capabilities: androidConfig,
                port: 4723
            };
    }
}; 