# cp-tooltip
A simple tooltip widget for the canopy style guide

## Requirements
 - Angular 1.3
 - jQuery

## Installation
1. Install through npm `npm install --save cp-tooltip`
2. Make sure your app depends upon 'cp-tooltip':
```javascript
angular.module('app', ['cp-tooltip']);
```

## Usage
### Markup:
```html
<input type="text" cp-tooltip="Hey this is the message"/>
```
If you'd like the tooltip instantly render, include the `cp-tooltip-instant` attribute:
```html
<input type="text" cp-tooltip="Hey this is the message" cp-tooltip-instant/>
```

If you want the tooltip to stay visible while the user interacts with the tooltip itself, include the `cp-tooltip-allow-interaction` attribute. This is useful when you want to allow the user to highlight and copy the contents of the tooltip.
```html
<input type="text" cp-tooltip="Hey this is the message" cp-tooltip-allow-interaction/>
```
## Demo
http://canopytax.github.io/cp-tooltip/
