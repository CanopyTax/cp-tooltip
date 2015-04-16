# bs-tooltip
A simple tooltip widget for the beanstalk style guide

## Requirements
 - Angular 1.3
 - jQuery
 
## Installation
1. Install through npm `npm install --save bs-tooltip`
2. Make sure your app depends upon 'bs-tooltip':
```javascript
angular.module('app', ['bs-tooltip']);
```

## Usage
### Markup:
```html
<input type="text" bs-tooltip="Hey this is the messag"/>
```
If you'd like the tooltip instantly render, include the `bs-tooltip-instant` attribute:
```html
<input type="text" bs-tooltip="Hey this is the messag" bs-tooltip-instant/>
```
## Demo
http://beanstalkhq.github.io/bs-tooltip/
