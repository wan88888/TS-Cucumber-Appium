import { remote, Browser } from 'webdriverio';
import { getCapabilities, AppiumConfig } from '../config/capabilities';

export default class BasePage {
    protected driver: Browser;

    constructor(driver: Browser) {
        this.driver = driver;
    }

    static async initialize(): Promise<Browser> {
        try {
            const config: AppiumConfig = getCapabilities();
            const driver = await remote({
                hostname: 'localhost',
                port: config.port,
                path: '/',  // Appium 2.x 使用根路径
                logLevel: 'info',
                capabilities: config.capabilities,
                connectionRetryTimeout: 120000,
                connectionRetryCount: 3
            });
            return driver;
        } catch (error) {
            console.error('Error initializing driver:', error);
            throw error;
        }
    }

    async click(selector: string): Promise<void> {
        try {
            const element = await this.driver.$(selector);
            await element.waitForDisplayed({ timeout: 10000 });
            await element.click();
        } catch (error) {
            console.error(`Error clicking element with selector: ${selector}`, error);
            throw error;
        }
    }

    async setValue(selector: string, value: string): Promise<void> {
        try {
            const element = await this.driver.$(selector);
            await element.waitForDisplayed({ timeout: 10000 });
            await element.setValue(value);
        } catch (error) {
            console.error(`Error setting value for element with selector: ${selector}`, error);
            throw error;
        }
    }

    async getText(selector: string): Promise<string> {
        try {
            const element = await this.driver.$(selector);
            await element.waitForDisplayed({ timeout: 10000 });
            return await element.getText();
        } catch (error) {
            console.error(`Error getting text from element with selector: ${selector}`, error);
            throw error;
        }
    }

    async isDisplayed(selector: string): Promise<boolean> {
        try {
            const element = await this.driver.$(selector);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async waitForElement(selector: string, timeout = 10000): Promise<void> {
        const platform = process.env.PLATFORM || 'android';
        // iOS通常加载更快，但初始会话启动较慢
        const actualTimeout = platform === 'ios' ? Math.min(timeout, 5000) : timeout;
        
        try {
            const element = await this.driver.$(selector);
            await element.waitForDisplayed({ timeout: actualTimeout });
        } catch (error) {
            console.error(`Timeout waiting for element with selector: ${selector}`, error);
            throw error;
        }
    }

    async waitForElementToDisappear(selector: string, timeout = 10000): Promise<boolean> {
        try {
            const element = await this.driver.$(selector);
            return await element.waitForDisplayed({ timeout, reverse: true });
        } catch (error) {
            return true; // Element is not present, which is what we want
        }
    }

    async scrollIntoView(selector: string): Promise<void> {
        const element = await this.driver.$(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        await this.driver.execute('arguments[0].scrollIntoView(true);', [element]);
    }

    async getScreenshot(name: string): Promise<void> {
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            await this.driver.saveScreenshot(`./reports/screenshots/${name}_${timestamp}.png`);
        } catch (error) {
            console.error('Error taking screenshot:', error);
        }
    }

    async sleep(ms: number): Promise<void> {
        await this.driver.pause(ms);
    }
} 