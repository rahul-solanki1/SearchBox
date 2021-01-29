# SearchBox

A react-native App, demonstrating an input box that provides suggestions.

### Environment Setup

You must have a React-Native environment setup on your machine. Follow the steps described in **React Native CLI Quickstart** tab in [Setting up the development environment](https://reactnative.dev/docs/environment-setup).

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ git clone <repo-url>
$ cd SearchBox
$ yarn install
$ npx pod-install
```

### Run

First got to the project's root directory

```bash
cd SearchBox
```

Now any of the following apps can be run as needed:
`npm run <script>` or `yarn run <script>`

```bash
yarn ios // iOS App
yarn android // Android App
```

## How to use:

The SearchBox is customizable. Each component in the SearchBox can be customized.
Please follow the below table for available style props.

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

| Listener      | Type                           | Description                                                                                                                                                               |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onValueChange | Optional((text: string)=>void) | Value change listener gives callback with the current value when the value in the SearchBox changes by entering a value or by selecting an item from the suggestion list. |
| onFocus       | Optional((text: string)=>void) | Focus listener gives callback when SearchBox comes in focus.                                                                                                              |

## Notes

1. I have tried to create a reusable and customizable component
2. Added debounce for optimization and better UX
3. Created smaller components like `HighlightText` so that these can also be reused

## Demo

<p align="center">
  <img src="https://github.com/rahul-solanki1/SearchBox/blob/master/SearchBar.gif" alt="SearchBar"/>
</p>
