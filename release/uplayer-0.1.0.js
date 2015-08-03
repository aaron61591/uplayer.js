"use strict";!function(){function a(a){var b=this;c(b,a),(void 0===b.opt.fullScreen||b.opt.fullScreen)&&f(b.canvas)}function b(a){for(var b=a.length,c=0;b--;)a[b]>c&&(c=a[b]);return c+1}function c(a,b){a.ele=a.canvas=document.createElement("canvas"),a.ctx=window.UPlayer.getContext(a),a.opt=b||{},a.canvas.id=a.opt.id||"",a.plugins=a.opt.debug?[window.UPlayer.debug]:[],a.pluginsIndex={},a.curFrame=0,a.playing=!1}function d(a){e(a);for(var b=0;b<a.plugins.length;)a.plugins[b]&&("function"==typeof a.plugins[b]?a.plugins[b](a.ctx,a.curFrame):"function"==typeof a.plugins[b].render&&a.plugins[b].render(a.ctx,a.curFrame)),++b}function e(a){(a.opt.refresh||void 0===a.opt.refresh)&&a.ctx.clearRect(0,0,a.canvas.width,a.canvas.height)}function f(a){a.style.position="fixed",a.style.top=0,a.style.left=0,a.style.zIndex=1e3,document.body.appendChild(a),g(a),window.onresize=function(){g(a)}}function g(a){a.width=window.innerWidth,a.height=window.innerHeight}function h(a,b){for(var c in a.pluginsIndex)a.pluginsIndex.hasOwnProperty(c)&&a.pluginsIndex[c]>=b&&++a.pluginsIndex[c]}function i(a,b){for(var c in a.pluginsIndex)a.pluginsIndex.hasOwnProperty(c)&&a.pluginsIndex[c]>=b&&++a.pluginsIndex[c]}function j(a,b,c){a.plugins.splice(c,1),a.pluginsIndex[b]=void 0,i(a,c)}function k(a,b,c){var e=+new Date;a.playing&&(e-b>1e3/(a.opt.fps||30)&&(d(a),++a.curFrame,b=e,void 0!==c&&--c),void 0===c||c?l.call(window,function(){k(a,b,c)}):a.playing=!1)}var l=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.setTimeout;a.prototype.plug=function(a){var b=0;for(a.zIndex=a.zIndex||0;b<this.plugins.length&&!(a.zIndex<this.plugins[b].zIndex);)++b;if(this.plugins.splice(b,0,a),void 0!==a.hash){var c=this.pluginsIndex[a.hash];void 0!==c?"object"==typeof c?c.push(b):this.pluginsIndex[a.hash]=[c,b]:(h(this,b),this.pluginsIndex[a.hash]=b)}},a.prototype.plugCard=function(a){var c=this;window.UPlayer.preImage(a.src,function(d){a.img=d,a.render=function(c,e){a.pulse&&a.pulse(c,e);var f,g,h,i=a.scale||1;"object"==typeof a.frame?(g=b(a.frame),f=a.frame[e%a.frame.length]):(g=a.frame,f=e%g),h=d.width/g,c.drawImage(d,f*h,0,h,d.height,a.x||0,a.y||0,h*i,d.height*i)},c.plug(a)})},a.prototype.unplug=function(a){var b=this.pluginsIndex[a];if(void 0!==b)if("object"!=typeof b)j(this,a,b);else for(var c=b.length;c--;)j(this,a,b[c])},a.prototype.run=function(a){if(!this.playing){this.playing=!0;var b=this;window.UPlayer._imageReady(function(){k(b,0,a)})}},a.prototype.pause=function(){this.playing=!1},a.prototype.stop=function(){this.curFrame=0,this.playing=!1},window.UPlayer=a}(),function(){function a(a){for(var d in a.raw)"function"==typeof a.raw[d]?b(a,d):c(a,d)}function b(a,b){a[b]=function(){a.raw[b].apply(a.raw,arguments)}}function c(a,b){a.props=a.props||{},a.props[b]={get:function(){return a.raw[b]},set:function(c){a.raw[b]=c}},Object.defineProperties(a,a.props)}function d(){}window.UPlayer.transit={},window.UPlayer.getContext=function(b){var c={raw:b.canvas.getContext("2d")};return a(c),d(c),c}}(),function(){function a(a){return c[a.src]}function b(a){var b=document.createElement("canvas"),d=b.getContext("2d");return b.width=a.width,b.height=a.height,d.drawImage(a,0,0),c[a.src]=b,b}var c={};window.UPlayer.transit.drawImage=function(c){var d=a(c);d||(d=b(c)),arguments[0]=d,this.raw.drawImage.apply(this.raw,arguments)}}(),function(){function a(a,b){if(!f[a]){++e;var d=new Image;d.src=a,d.complete&&c(d,a),d.onload=function(){c(d,a)},f[a]=[]}f[a].push(b)}function b(){for(var a=0;a<g.length;)g[a](),++a}function c(a,c){--e||b(),d[c]=a;for(var g=0;g<f[c].length;)f[c][g](a),++g;f[c]=null}var d={},e=0,f={},g=[];window.UPlayer.preImage=function(b,c){var e=d[b];e?c(e):a(b,c)},window.UPlayer._imageReady=function(a){e?g.push(a):a()}}(),function(){function a(){if(!f){var a=document.createElement("div"),b=a.style;a.id=g,b.position="fixed",b.top=0,b.right=0,b.zIndex=1e4,b.fontSize="24px",b.color="#fff",b.margin="5px",b.padding="10px",b.background="rgba(0, 0, 0, 0.6)",a.innerText="FPS 0",document.body.appendChild(a),f=!0}}var b,c=+new Date,d=10,e=0,f=!1,g="uplayer-fps";window.UPlayer.debug=function(){a(),++e%d===0&&(b=+new Date,document.getElementById(g).innerText="FPS "+(d/((b-c)/1e3)).toFixed(1),c=b)}}();