import BasePage from './BasePage';
import { Browser } from 'webdriverio';
import { getPlatformSelector, testConfig } from '../config/env';

export default class LoginPage extends BasePage {
    constructor(driver: Browser) {
        super(driver);
    }

    // Selectors for both platforms
    private get usernameInput(): string {
        return getPlatformSelector('~test-Username', '~test-Username');
    }

    private get passwordInput(): string {
        return getPlatformSelector('~test-Password', '~test-Password');
    }

    private get loginButton(): string {
        return getPlatformSelector('~test-LOGIN', '~test-LOGIN');
    }

    private get errorMessage(): string {
        return getPlatformSelector('~test-Error message', '~test-Error message');
    }

    async login(username: string, password: string): Promise<void> {
        try {
            await this.setValue(this.usernameInput, username);
            await this.setValue(this.passwordInput, password);
            await this.click(this.loginButton);
        } catch (error) {
            console.error('Error during login:', error);
            await this.getScreenshot('login_failure');
            throw error;
        }
    }

    async loginAsStandardUser(): Promise<void> {
        const { username, password } = testConfig.accounts.standard;
        await this.login(username, password);
    }

    async isLoginButtonDisplayed(): Promise<boolean> {
        return await this.isDisplayed(this.loginButton);
    }

    async isErrorMessageDisplayed(): Promise<boolean> {
        return await this.isDisplayed(this.errorMessage);
    }

    async getErrorMessageText(): Promise<string> {
        if (await this.isErrorMessageDisplayed()) {
            return await this.getText(this.errorMessage);
        }
        return '';
    }

    async clearLoginForm(): Promise<void> {
        const usernameElement = await this.driver.$(this.usernameInput);
        const passwordElement = await this.driver.$(this.passwordInput);
        
        await usernameElement.waitForDisplayed({ timeout: testConfig.timeouts.element });
        await usernameElement.clearValue();
        
        await passwordElement.waitForDisplayed({ timeout: testConfig.timeouts.element });
        await passwordElement.clearValue();
    }
} 