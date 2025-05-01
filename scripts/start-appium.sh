#!/bin/bash

# 设置错误处理
set -e

echo "Starting Appium servers..."
mkdir -p logs

# 检查是否已有Appium服务器在运行
if pgrep -f "appium server" > /dev/null; then
  echo "Warning: Appium server(s) already running. Killing existing instances..."
  pkill -f "appium server" || true
  sleep 2
fi

# 清理旧日志
> logs/appium-android.log
> logs/appium-ios.log

# 启动Android服务器
echo "Starting Android Appium server on port 4723..."
npx appium server -p 4723 --use-drivers=uiautomator2 --log logs/appium-android.log --relaxed-security &
ANDROID_PID=$!
echo "Android Appium server started with PID: $ANDROID_PID"

# 等待Android服务器启动
sleep 2
if ! ps -p $ANDROID_PID > /dev/null; then
  echo "Error: Android Appium server failed to start"
  exit 1
fi

# 启动iOS服务器
echo "Starting iOS Appium server on port 4724..."
npx appium server -p 4724 --use-drivers=xcuitest --log logs/appium-ios.log --relaxed-security &
IOS_PID=$!
echo "iOS Appium server started with PID: $IOS_PID"

# 等待iOS服务器启动
sleep 2
if ! ps -p $IOS_PID > /dev/null; then
  echo "Error: iOS Appium server failed to start"
  kill $ANDROID_PID
  exit 1
fi

echo "Both Appium servers successfully started:"
echo "  - Android (PID: $ANDROID_PID) on port 4723"
echo "  - iOS (PID: $IOS_PID) on port 4724"
echo "Use 'pkill -f appium' to stop all servers"

# 设置中断处理
trap "echo 'Stopping Appium servers...'; kill $ANDROID_PID $IOS_PID; echo 'Appium servers stopped'; exit 0" INT TERM

# 等待两个进程（如果任一进程终止，脚本将结束）
wait $ANDROID_PID $IOS_PID 