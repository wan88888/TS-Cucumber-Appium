import { Given, When, Then, After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from 'chai';
import driverManager from '../helpers/DriverManager';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import { Browser } from 'webdriverio';

// 增加超时时间到120秒，防止慢速设备上的失败
setDefaultTimeout(120 * 1000);

let driver: Browser;
let loginPage: LoginPage;
let productsPage: ProductsPage;
let username: string;
let password: string;

Before(async function() {
    driver = await driverManager.getDriver();
    loginPage = new LoginPage(driver);
    productsPage = new ProductsPage(driver);
});

// 在每个场景结束后截图（如果失败）并清理会话
After(async function(scenario) {
    try {
        if (scenario.result?.status === 'FAILED') {
            // 如果场景失败，则截图
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotName = `failed_${scenario.pickle.name.replace(/\s+/g, '_')}_${timestamp}`;
            await driver.saveScreenshot(`./reports/screenshots/${screenshotName}.png`);
            console.error(`Screenshot saved as reports/screenshots/${screenshotName}.png`);
        }
    } catch (error) {
        console.error('Error during screenshot capture:', error);
    } finally {
        await driverManager.quitDriver();
    }
});

Given('I am on the login page', async function() {
    const isLoginPageDisplayed = await loginPage.isLoginButtonDisplayed();
    expect(isLoginPageDisplayed).to.be.true;
});

When('I enter {string} as username', async function(usernameValue: string) {
    username = usernameValue;
});

When('I enter {string} as password', async function(passwordValue: string) {
    password = passwordValue;
});

When('I tap on the login button', async function() {
    await loginPage.login(username, password);
});

Then('I should see the products page', async function() {
    // 根据平台调整等待时间
    if (process.env.PLATFORM === 'ios') {
        // iOS从登录到产品页面加载较慢，但不用太久
        await driver.pause(1000); 
    } else {
        // Android平台等待
        await driver.pause(500);
    }
    
    const isProductsPageDisplayed = await productsPage.isProductsPageDisplayed();
    expect(isProductsPageDisplayed).to.be.true;
}); 