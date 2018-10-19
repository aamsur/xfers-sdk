# xfers-sdk-public

This section is for the Android SDK found in the Android folder
---

## Setting Up

1. Install Android Studio at https://developer.android.com/studio/install
2. Git pull xfers-sdk project
3. Open project with Android Studio and let Gradle sync
4. Once Gradle is done syncing, manage your AVD, check https://developer.android.com/studio/run/managing-avds to see how to add a device
5. Run it on a device to ensure that everything has been set up corretly

## Building / Editing UI for the SDK

*** Import step of editing the SDK, change `implementation "com.xfers.xfers_sdk:xfers_sdk:0.1.0"` to `implementation project(':xfers_sdk')` under the `build.gradle` for the app, otherwise the app will be downloading the SDK from v0.1.0 from Maven which is now the one that you're currently editing. To be sure about doing this step correctly, make a change to a title or button and run it again on the device and make sure that the change is reflected. ***

Please refer to https://developer.android.com/training/basics/firstapp/building-ui for basics on layout editor and constraints.

Examples:

1.

![Coming Soon Page](https://user-images.githubusercontent.com/6291947/46936852-466ab100-d092-11e8-9925-696a88d25b11.png)

2.

![Base Example Page](https://user-images.githubusercontent.com/6291947/46936853-466ab100-d092-11e8-8359-38d2753810bb.png)

The "Coming Soon Page" is presented via the base example page using the `flow` or `ui` APIs from the `Xfers` object.

Check the APIs to see how an activity is started via an `Intent`.

With the knowledge of layout editor and constraints, create a new activity and let it be presented instead of the "Coming Soon Page", you can follow the "Base Example Page" and build a placeholder page with buttons that navigates to other placeholder activities and build the UI as in `Overflow` by the designer. Chaining and API integration will be done in the near future.

WEB SDK
---

## Usage

```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script type="text/javascript" src="dist/vendors~xfers.bundle.js"></script>
<script type="text/javascript" src="dist/xfers.bundle.js"></script>
```
