#!/bin/bash

# 确保脚本可执行
# chmod +x scripts/start-appium.sh

echo "Starting Appium servers..."
mkdir -p logs

# 启动Android服务器
echo "Starting Android Appium server on port 4723..."
npm exec appium server -p 4723 --use-drivers=uiautomator2 --log logs/appium-android.log --relaxed-security &
ANDROID_PID=$!

# 启动iOS服务器
echo "Starting iOS Appium server on port 4724..."
npm exec appium server -p 4724 --use-drivers=xcuitest --log logs/appium-ios.log --relaxed-security --default-capabilities '{"webDriverAgentUrl":"http://localhost:8100"}' &
IOS_PID=$!

echo "Appium servers started with PIDs: $ANDROID_PID (Android) and $IOS_PID (iOS)"
echo "Use 'pkill -f appium' to stop all servers"

# 等待用户中断
trap "kill $ANDROID_PID $IOS_PID; echo 'Appium servers stopped'; exit 0" INT
wait 