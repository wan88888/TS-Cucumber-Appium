import BasePage from './BasePage';
import { Browser } from 'webdriverio';
import { getPlatformSelector, testConfig } from '../config/env';

export default class ProductsPage extends BasePage {
    constructor(driver: Browser) {
        super(driver);
    }

    // Selectors for both platforms
    private get productsTitle(): string {
        return getPlatformSelector('~test-PRODUCTS', '~test-PRODUCTS');
    }

    private get shoppingCartIcon(): string {
        return getPlatformSelector('~test-Cart', '~test-Cart');
    }

    private get hamburgerMenuButton(): string {
        return getPlatformSelector('~test-Menu', '~test-Menu');
    }

    private get inventoryItemContainer(): string {
        return getPlatformSelector('~test-inventory item container', '~test-inventory item container');
    }

    private get sortButton(): string {
        return getPlatformSelector('~test-Modal Selector Button', '~test-Modal Selector Button');
    }

    /**
     * 检查是否显示产品页面
     */
    async isProductsPageDisplayed(): Promise<boolean> {
        try {
            const productsDisplayed = await this.isDisplayed(this.productsTitle);
            const cartDisplayed = await this.isDisplayed(this.shoppingCartIcon);
            return productsDisplayed && cartDisplayed;
        } catch (error) {
            console.error('Error checking products page:', error);
            await this.getScreenshot('products_page_check');
            return false;
        }
    }

    /**
     * 获取产品页面标题
     */
    async getProductsTitle(): Promise<string> {
        try {
            return await this.getText(this.productsTitle);
        } catch (error) {
            console.error('Error getting products title:', error);
            return '';
        }
    }

    /**
     * 打开菜单
     */
    async openMenu(): Promise<void> {
        try {
            await this.click(this.hamburgerMenuButton);
        } catch (error) {
            console.error('Error opening menu:', error);
            await this.getScreenshot('menu_open_error');
            throw error;
        }
    }

    /**
     * 点击购物车图标
     */
    async goToCart(): Promise<void> {
        try {
            await this.click(this.shoppingCartIcon);
        } catch (error) {
            console.error('Error navigating to cart:', error);
            await this.getScreenshot('goto_cart_error');
            throw error;
        }
    }

    /**
     * 获取产品数量
     */
    async getProductCount(): Promise<number> {
        try {
            const items = await this.driver.$$(this.inventoryItemContainer);
            return items.length;
        } catch (error) {
            console.error('Error getting product count:', error);
            return 0;
        }
    }

    /**
     * 打开排序选项
     */
    async openSortOptions(): Promise<void> {
        await this.click(this.sortButton);
    }

    /**
     * 等待产品页面加载完成
     * @param timeout - 超时时间（毫秒）
     */
    async waitForProductsPageLoaded(timeout = testConfig.timeouts.pageLoad): Promise<void> {
        await this.waitForElement(this.productsTitle, timeout);
        await this.waitForElement(this.shoppingCartIcon, timeout);
    }
} 