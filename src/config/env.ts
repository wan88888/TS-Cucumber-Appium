// 环境变量和测试配置管理

/**
 * 获取当前平台 (android | ios)
 */
export const getCurrentPlatform = (): string => {
    return (process.env.PLATFORM || 'android').toLowerCase();
};

/**
 * 测试配置
 */
export const testConfig = {
    // 超时配置 (毫秒)
    timeouts: {
        default: 30000,
        element: 10000,
        pageLoad: 15000
    },
    
    // 重试配置
    retry: {
        count: 3,
        interval: 1000
    },
    
    // 测试账号
    accounts: {
        standard: {
            username: 'standard_user',
            password: 'secret_sauce'
        },
        locked: {
            username: 'locked_out_user',
            password: 'secret_sauce'
        }
    },
    
    // 截图配置
    screenshots: {
        enabled: true,
        path: './reports/screenshots'
    }
};

/**
 * 获取特定平台的元素定位器
 * @param androidSelector - 安卓平台定位器
 * @param iosSelector - iOS平台定位器
 */
export const getPlatformSelector = (androidSelector: string, iosSelector: string): string => {
    const platform = getCurrentPlatform();
    return platform === 'ios' ? iosSelector : androidSelector;
}; 