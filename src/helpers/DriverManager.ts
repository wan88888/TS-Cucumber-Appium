import { Browser } from 'webdriverio';
import BasePage from '../pages/BasePage';

class DriverManager {
    private static instance: DriverManager;
    private driver: Browser | null = null;
    private sessionActive = false;
    private maxRetries = 3;

    private constructor() {}

    public static getInstance(): DriverManager {
        if (!DriverManager.instance) {
            DriverManager.instance = new DriverManager();
        }
        return DriverManager.instance;
    }

    public async getDriver(): Promise<Browser> {
        if (!this.driver || !this.sessionActive) {
            await this.initDriver();
        }
        return this.driver!;
    }

    private async initDriver(retryCount = 0): Promise<void> {
        try {
            this.driver = await BasePage.initialize();
            this.sessionActive = true;
        } catch (error) {
            if (retryCount < this.maxRetries) {
                console.warn(`Driver initialization failed, retrying (${retryCount + 1}/${this.maxRetries})...`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                await this.initDriver(retryCount + 1);
            } else {
                console.error('Failed to initialize driver after multiple attempts:', error);
                throw error;
            }
        }
    }

    public async quitDriver(): Promise<void> {
        if (this.driver && this.sessionActive) {
            try {
                await this.driver.deleteSession();
                console.info('Driver session successfully closed');
            } catch (error) {
                console.warn('Error while closing driver session:', error);
            } finally {
                this.driver = null;
                this.sessionActive = false;
            }
        }
    }

    public isSessionActive(): boolean {
        return this.sessionActive;
    }
}

export default DriverManager.getInstance(); 