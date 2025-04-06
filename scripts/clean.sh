#!/bin/bash

echo "The cleaning process begins..."

echo "Clearing node_modules..."
rm -rf node_modules package-lock.json yarn.lock

echo "Clearing CocoaPods cache..."
rm -rf ~/Library/Caches/CocoaPods ios/Pods

echo "Cleaning Xcode DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/*

echo "Cleaning Android build files..."
rm -rf android/.cxx android/.gradle android/build

cd ..

if [ -d "ios" ]; then
  cd ios || exit
  echo "Running pod deintegrate..."
  pod deintegrate
  echo "Running pod setup..."
  pod setup
  cd ..
else
  echo "⚠️ ios folder not found, iOS cleanup process skipped."
fi

echo "Running pod setup..."
pod setup

echo "Addictions are installing..."
yarn install

cd ios || exit
if [ -f "Podfile" ]; then
  echo "Running pod install..."
  pod install
else
  echo "⚠️ Podfile not found, pod install not executed!"
fi


echo "✅ Cleanup and installation complete!"