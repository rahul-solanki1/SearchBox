# App

App is a test task for searching with text input suggestions & text highlisting in react-native.

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ git clone <repo-url>
$ cd SearchBox
$ yarn install
```

### Environment Setup

You must have a React-Native environment setup on your machine. Follow the steps described in **React Native CLI Quickstart** tab in [Setting up the development environment](https://reactnative.dev/docs/environment-setup).

### Run

Scripts are added at the root level of the project in `package.json`.

Once `ttab` is installed, from the project's root directory the scripts can be run. Following is the description of each script in the table below. It can be used like: `npm run <script>`.

| Script      | Description                                      |
| ----------- | ------------------------------------------------ |
| installPods | Install all the dependencies for the apps to run |
| ios         | Run both the iOS apps with metro bundler         |
| android     | Run both the android apps with metro bundler     |

Note: `installPods` is a must before running the app for iOS.

### Run App

```bash
cd SearchBox
```

Now any of the following app can be run specific to OS:
iOS App:

```bash
react-native run-ios
```

Android App

```bash
react-native run-android
```
