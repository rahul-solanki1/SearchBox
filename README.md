# SearchBox

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

From the project's root directory, the scripts can be run. Following is the description of each script in the table below. It can be used like: `npm run <script>` or `yarn run <script>`.

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

## How to use:

The SearchBox is fully customizable. You can style each components in the SearchBox. Please follow the below table for available style props.

## Style Props

| Style Attribute name     | Type                | Description                                                                                                     |
| ------------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| containerStyle           | Optional(ViewStyle) | Customize the SearchBox outer container better suitable to give padding/margin.                                 |
| inputBoxStyle            | Optional(ViewStyle) | Customize the input search box. Better suitable for border radius, color, shadow                                |
| inputBoxFocusedStyle     | Optional(ViewStyle) | Customize the input search box when in focused mode. This will override the inputBoxStyle when in focused mode. |
| suggestionContainerStyle | Optional(ViewStyle) | Customize the suggestion list container for extra padding/margin.                                               |
| textStyle                | Optional(TextStyle) | Customize your suggestion list item text to desired look.                                                       |
| highlightedTextStyle     | Optional(TextStyle) | Highlight the suggestion list item text found matching current searching word.                                  |
|                          |                     |

## Values

| Assignable Values | Type               | Description                                      |
| ----------------- | ------------------ | ------------------------------------------------ |
| value             | Optional(string)   | SearchBox intial value                           |
| placeholder       | Optional(string)   | SearchBox placeholder                            |
| suggestions       | Optional(string[]) | Pass your suggestion list fetched from local/API |

## Listeners

| Listener      | Type                           | Description                                                                                                                                                   |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onValueChange | Optional((text: string)=>void) | Value change listener gives callback with the current value, when value in the SearchBox changes by entering value or by selecting item from suggestion list. |
| onFocus       | Optional((text: string)=>void) | Focus listener gives callback when SearchBox comes in focus.                                                                                                  |
