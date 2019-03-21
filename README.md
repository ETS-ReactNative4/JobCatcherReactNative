# JobCatcherReactNative
The React Native implementation of JobCatcher

### Set up
1. `git clone` to Clone a copy of this project locally


2. `npm install` to Install all relevant build dependencies


3. `react-native run-ios` or `react-native run-android` to run the Application on a Device


### Current Issues:

#### 1) RNGestureHandler

`null is not an object ( evaluating 'RNGestureHandlerModule.Direction')`

[Fix](https://github.com/kmagiera/react-native-gesture-handler/issues/494#issuecomment-469456140)

### Design Notes:
1) All Style size properties should be a multiple of 8 as per [8pt Grid System](https://spec.fm/specifics/8-pt-grid).
