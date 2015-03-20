/*!
 * bs-tooltip
 * author: Bret Little
 * copyright: 2015
 * license: MIT
 * version: 1.0.2
 */
!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var o=(n(1),n(2));o.module("bs-tooltip",[]),n(3),n(4)},function(t){t.exports=$},function(t){t.exports=angular},function(){"use strict";angular.module("bs-tooltip").directive("bsTooltip",function(){var t=0,e=1e3;return{restrict:"A",link:function(n,o,r){function i(t){c=!0,l=$('\n						<span class="bs-tooltip" style="left:'+t.clientX+"px; top:"+(t.clientY+20)+'px;">'+r.bsTooltip+"</span>\n						"),$("body").append(l)}function s(){c=!1,l&&l.remove()}var a,u,l,f=++t,c=!1;o.on("mousemove.bstooltip"+f,function(t){a&&clearTimeout(a),a=setTimeout(function(){c||i(t)},e)}),o.on("mouseout.bstooltip"+f,function(){u&&clearTimeout(u),u=setTimeout(function(){clearTimeout(a),s()},500)}),n.$on("$destroy",function(){s(),clearTimeout(a),clearTimeout(u),o.off("mousemove.bstooltip"+f),o.off("mouseout.bstooltip"+f)})}}})},function(t,e,n){var o=n(5);"string"==typeof o&&(o=[[t.id,o,""]]);n(6)(o,{})},function(t,e,n){e=t.exports=n(7)(),e.push([t.id,".bs-tooltip{background-color:#777;font-size:12px;padding:4px 8px;position:absolute;color:#fff;border-radius:2px;box-shadow:0 1px 4px 0 (rgba(0,0,0,.26))}",""])},function(t){function e(t,e){for(var n=0;n<t.length;n++){var o=t[n],i=u[o.id];if(i){i.refs++;for(var s=0;s<i.parts.length;s++)i.parts[s](o.parts[s]);for(;s<o.parts.length;s++)i.parts.push(r(o.parts[s],e))}else{for(var a=[],s=0;s<o.parts.length;s++)a.push(r(o.parts[s],e));u[o.id]={id:o.id,refs:1,parts:a}}}}function n(t){for(var e=[],n={},o=0;o<t.length;o++){var r=t[o],i=r[0],s=r[1],a=r[2],u=r[3],l={css:s,media:a,sourceMap:u};n[i]?n[i].parts.push(l):e.push(n[i]={id:i,parts:[l]})}return e}function o(){var t=document.createElement("style"),e=c();return t.type="text/css",e.appendChild(t),t}function r(t,e){var n,r,i;if(e.singleton){var u=d++;n=p||(p=o()),r=s.bind(null,n,u,!1),i=s.bind(null,n,u,!0)}else n=o(),r=a.bind(null,n),i=function(){n.parentNode.removeChild(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else i()}}function i(t,e,n){var o=["/** >>"+e+" **/","/** "+e+"<< **/"],r=t.lastIndexOf(o[0]),i=n?o[0]+n+o[1]:"";if(t.lastIndexOf(o[0])>=0){var s=t.lastIndexOf(o[1])+o[1].length;return t.slice(0,r)+i+t.slice(s)}return t+i}function s(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=i(t.styleSheet.cssText,e,r);else{var s=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(s,a[e]):t.appendChild(s)}}function a(t,e){var n=e.css,o=e.media,r=e.sourceMap;if(r&&"function"==typeof btoa)try{n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(JSON.stringify(r))+" */",n='@import url("data:text/css;base64,'+btoa(n)+'")'}catch(i){}if(o&&t.setAttribute("media",o),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var u={},l=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},f=l(function(){return/msie 9\b/.test(window.navigator.userAgent.toLowerCase())}),c=l(function(){return document.head||document.getElementsByTagName("head")[0]}),p=null,d=0;t.exports=function(t,o){o=o||{},"undefined"==typeof o.singleton&&(o.singleton=f());var r=n(t);return e(r,o),function(t){for(var i=[],s=0;s<r.length;s++){var a=r[s],l=u[a.id];l.refs--,i.push(l)}if(t){var f=n(t);e(f,o)}for(var s=0;s<i.length;s++){var l=i[s];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete u[l.id]}}}}},function(t){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];t.push(n[2]?"@media "+n[2]+"{"+n[1]+"}":n[1])}return t.join("")},t}}]);