# TypeScript-Cucumber-Appium 移动自动化测试框架

该框架使用TypeScript、Cucumber和Appium创建用于测试移动应用的自动化测试框架。

## 特点

- 使用TypeScript提供强类型支持
- 使用Cucumber进行BDD风格测试
- 使用Page Object Model模式组织代码
- 支持Android和iOS平台
- 并行测试支持
- 详细的报告和截图

## 安装

```bash
npm install
```

## 配置

- 配置文件位于`src/config/`目录
- Android配置: `android.config.ts`
- iOS配置: `ios.config.ts`
- 环境配置: `env.ts`

## 运行测试

### 启动Appium服务器

```bash
npm run appium:start
```

### 运行测试

```bash
# 运行所有测试
npm test

# 运行Android测试
npm run test:android

# 运行iOS测试
npm run test:ios

# 并行运行Android和iOS测试
npm run test:parallel
```

### 优化iOS测试启动时间

iOS测试启动通常较慢，主要因为WebDriverAgent需要构建并安装。以下命令可以预热iOS环境:

```bash
# 预热iOS环境（构建WebDriverAgent）
npm run warmup:ios

# 然后启动Appium服务器
npm run appium:start

# 运行iOS测试
npm run test:ios
```

## 项目结构

```
.
├── apps/                  # 测试应用
├── reports/              # 测试报告和截图
├── scripts/              # 脚本文件
├── src/
│   ├── config/           # 配置文件
│   ├── features/         # Cucumber特性文件
│   ├── helpers/          # 辅助类
│   ├── pages/            # 页面对象
│   └── step_definitions/ # 步骤定义
└── logs/                 # Appium服务器日志
```

## 提示与技巧

1. 使用`noReset: true`和`usePrebuiltWDA: true`可显著减少iOS测试启动时间
2. 运行`warmup:ios`脚本可预构建WebDriverAgent，减少首次启动时间
3. 定期清理DerivedData文件夹，避免Xcode相关问题

## Prerequisites

- Node.js (14 or higher)
- Appium 2.x
- Android Studio with emulator (for Android tests)
- Xcode with simulator (for iOS tests)
- Java JDK (for Android)

## Project Structure

- `src/features/` - Cucumber feature files
- `src/step_definitions/` - Step definitions for Cucumber features
- `src/pages/` - Page objects (POM pattern)
- `src/config/` - Configuration files for different platforms
- `src/helpers/` - Helper utilities

## Sample Test Scenario

The framework includes a sample test scenario that verifies the login functionality of the Sauce Labs Sample App.

## Reporting

Reports are generated in HTML format after test execution and can be found at `cucumber-report.html` in the project root. 