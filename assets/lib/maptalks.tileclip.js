/*!
 * maptalks.tileclip v0.12.0
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
  typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
  (global = global || self, factory(global.maptalks = global.maptalks || {}, global.maptalks));
}(this, function (exports, maptalks) { 'use strict';

  var WORKERCODE = `(function(e){"use strict";function t(e){let t=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY];switch(e.type){case"FeatureCollection":const o=e.features.length;for(let r=0;r<o;r++)n(e.features[r],t);break;case"Feature":n(e,t);break;default:r(e,t)}return t}function n(e,t){r(e.geometry,t)}function r(e,t){if(e)switch(e.type){case"Point":o(e.coordinates,t);break;case"MultiPoint":case"LineString":i(e.coordinates,t);break;case"MultiLineString":!function(e,t){for(let n=0,r=e.length;n<r;n++)i(e[n],t)}(e.coordinates,t);break;case"Polygon":s(e.coordinates,t);break;case"MultiPolygon":!function(e,t){for(let n=0,r=e.length;n<r;n++)s(e[n],t)}(e.coordinates,t);break;case"GeometryCollection":const n=e.geometries.length;for(let o=0;o<n;o++)r(e.geometries[o],t)}}function o(e,t){t[0]=Math.min(t[0],e[0]),t[1]=Math.min(t[1],e[1]),t[2]=Math.max(t[2],e[0]),t[3]=Math.max(t[3],e[1])}function i(e,t){for(let n=0,r=e.length;n<r;n++)o(e[n],t)}function s(e,t){e.length&&i(e[0],t)}var a=c;function c(e,t,n){var r,o,i,s,a,c=e.length,f=l(e[0],t),h=[];for(n||(n=[]),r=1;r<c;r++){for(o=e[r-1],s=a=l(i=e[r],t);;){if(!(f|s)){h.push(o),s!==a?(h.push(i),r<c-1&&(n.push(h),h=[])):r===c-1&&h.push(i);break}if(f&s)break;f?f=l(o=u(o,i,f,t),t):s=l(i=u(o,i,s,t),t)}f=a}return h.length&&n.push(h),n}function u(e,t,n,r){return 8&n?[e[0]+(t[0]-e[0])*(r[3]-e[1])/(t[1]-e[1]),r[3]]:4&n?[e[0]+(t[0]-e[0])*(r[1]-e[1])/(t[1]-e[1]),r[1]]:2&n?[r[2],e[1]+(t[1]-e[1])*(r[2]-e[0])/(t[0]-e[0])]:1&n?[r[0],e[1]+(t[1]-e[1])*(r[0]-e[0])/(t[0]-e[0])]:null}function l(e,t){var n=0;return e[0]<t[0]?n|=1:e[0]>t[2]&&(n|=2),e[1]<t[1]?n|=4:e[1]>t[3]&&(n|=8),n}let f;function h(e=256){return!f&&OffscreenCanvas&&(f=new OffscreenCanvas(1,1)),f&&(f.width=f.height=e),f}function g(e){const t=e.canvas;e.clearRect(0,0,t.width,t.height)}function d(e){return e.getContext("2d")}function m(e){const t=h(e);return g(d(t)),t.transferToImageBitmap()}function p(e,t,n){const r=d(e);g(r),r.save();r.beginPath(),t.forEach((e=>{(e=>{for(let t=0,n=e.length;t<n;t++){const n=e[t],o=n[0],i=n[n.length-1],[s,a]=o,[c,u]=i;s===c&&a===u||n.push(o);for(let e=0,t=n.length;e<t;e++){const[t,o]=n[e];0===e?r.moveTo(t,o):r.lineTo(t,o)}}})(e)})),r.clip("evenodd"),r.drawImage(n,0,0,e.width,e.height);const o=e.transferToImageBitmap();return r.restore(),o}c.polyline=c,c.polygon=function(e,t){var n,r,o,i,s,a,c;for(r=1;r<=8;r*=2){for(n=[],i=!(l(o=e[e.length-1],t)&r),s=0;s<e.length;s++)(c=!(l(a=e[s],t)&r))!==i&&n.push(u(o,a,r,t)),c&&n.push(a),o=a,i=c;if(!(e=n).length)break}return n};const v={};function I(e){return"EPSG:3857"===e}function b(e,n){return function(e){if(!e)return!1;const t=(e.geometry||{}).type;return"Polygon"===t||"MultiPolygon"===t}(n)?v[e]?new Error("the"+e+" geojson Already exists"):(v[e]=n,function(e){e.bbox=e.bbox||t(e)}(n),n):new Error("geojson.feature is not Polygon")}function w(e){const[t,n]=e,r=6378137,o=t*Math.PI/180*r,i=n*Math.PI/180;return[o,3189068.5*Math.log((1+Math.sin(i))/(1-Math.sin(i)))]}function y(e,t){if(I(e)){const e=t=>{const n=[];for(let r=0,o=t.length;r<o;r++){const o=t[r];Array.isArray(o[0])?n.push(e(o)):n[r]=w(o)}return n};return e(t)}return t}function M(e,t,n){const[r,o,i,s]=e,a=(i-r)/t,c=(s-o)/t,[u,l]=n;return[(u-r)/a,t-(l-o)/c]}function E(e,t,n,r){const[o,i,s,a]=t,c=(e,t)=>{const r=[];for(let o=0,i=e.length;o<i;o++){const i=e[o];Array.isArray(i[0])?r.push(c(i,t)):r[o]=M(t,n,i)}return r};if(I(e)){const[e,t]=w([o,i]),[n,u]=w([s,a]);return c(r,[e,t,n,u])}return c(r,t)}function k(e={}){return new Promise(((t,n)=>{const{tile:r,tileBBOX:o,projection:i,tileSize:s,maskId:c,returnBlobURL:u}=e;if(!r)return void n(new Error("tile is null.It should be a ImageBitmap"));if(!o)return void n(new Error("tileBBOX is null"));if(!i)return void n(new Error("projection is null"));if(!s)return void n(new Error("tileSize is null"));if(!c)return void n(new Error("maskId is null"));const l=v[c];if(!l)return void n(new Error("not find mask by maskId:"+c));const f=h(s);if(!f)return void n(new Error("not find canvas.The current environment does not support OffscreenCanvas"));const I=e=>{u?function(e){const t=h();t.width=e.width,t.height=e.height;const n=d(t);return g(n),n.drawImage(e,0,0),t.convertToBlob()}(e).then((e=>{const n=URL.createObjectURL(e);t(n)})).catch((e=>{n(e)})):t(e)},b=l.bbox;if(!b)return void I(r);const{coordinates:w,type:M}=l.geometry;if(!w.length)return void I(r);if(T=o,(k=b)[2]<T[0]||k[1]>T[3]||k[0]>T[2]||k[3]<T[1])return void I(m(s));var k,T;let P,N=w;if("Polygon"===M&&(N=[N]),function(e,t){const[n,r,o,i]=e;return n>=t[0]&&o<=t[2]&&r>=t[1]&&i<=t[3]}(b,o)){P=y(i,N);return void I(p(f,E(i,o,s,P),r))}const x=e=>{if(e.length>0){let t=1/0,n=-1/0,r=1/0,o=-1/0;for(let i=0,s=e.length;i<s;i++){const[s,a]=e[i];t=Math.min(s,t),r=Math.min(a,r),n=Math.max(s,n),o=Math.max(a,o)}if(t!==n&&r!==o)return!0}return!1},B=[];for(let e=0,t=N.length;e<t;e++){const t=N[e];for(let e=0,n=t.length;e<n;e++){const n=t[e],r=a.polygon(n,o);x(r)&&B.push([r])}}if(0===B.length)return void I(m());P=y(i,B);I(p(f,E(i,o,s,P),r))}))}const T={accept:"image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.26"};function P(e,t={}){return new Promise(((n,r)=>{e?fetch(e,{headers:T}).then((e=>e.blob())).then((e=>createImageBitmap(e))).then((e=>{const o=t.filter;if(o){const t=h();t?n(function(e,t,n){if(!n)return t;e.width=t.width,e.height=t.height;const r=d(e);return g(r),r.save(),r.filter=n,r.drawImage(t,0,0),r.restore(),e.transferToImageBitmap()}(t,e,o)):r(new Error("not find canvas.The current environment does not support OffscreenCanvas"))}else n(e)})).catch((e=>{r(e)})):r(new Error("url is null"))}))}e.initialize=function(){},e.onmessage=function(e,t){const n=e.data||{},r=n._type;if("getTile"!==r)if("clipTile"!==r){if("injectMask"===r){const e=b(n.maskId,n.geojsonFeature);return e instanceof Error?void t(e):void t()}if("removeMask"===r)return o=n.maskId,delete v[o],void t();var o;console.error("not support message type:",r)}else k(n).then((e=>{const n=[];e instanceof ImageBitmap&&n.push(e),t(null,e,n)})).catch((e=>{t(e)}));else{const{url:e}=n;P(e,n).then((e=>{t(null,e,[e])})).catch((e=>{t(e)}))}},Object.defineProperty(e,"__esModule",{value:!0})})`;

  function isPolygon(feature) {
      if (!feature) {
          return false;
      }
      const geometry = feature.geometry || {};
      const type = geometry.type;
      return type === 'Polygon' || type === 'MultiPolygon';
  }

  const WORKERNAME = '__maptalks.tileclip';

  maptalks.registerWorkerAdapter(WORKERNAME, WORKERCODE);

  const maskMap = {};

  class TileActor extends maptalks.worker.Actor {

      getTile(options = {}) {
          return new Promise((resolve, reject) => {
              this.send(Object.assign({}, { _type: 'getTile' }, options), null, (error, image) => {
                  if (error) {
                      reject(error);
                  } else {
                      resolve(image);
                  }
              });
          });
      }

      clipTile(options = {}) {
          return new Promise((resolve, reject) => {
              const buffers = [];
              if (options.tile && options.tile instanceof ImageBitmap) {
                  buffers.push(options.tile);
              }
              this.send(Object.assign({}, { _type: 'clipTile' }, options), buffers, (error, image) => {
                  if (error) {
                      reject(error);
                  } else {
                      resolve(image);
                  }
              });
          });
      }

      injectMask(maskId, geojsonFeature) {
          return new Promise((resolve, reject) => {
              if (!maskId) {
                  reject(new Error('maskId is null'));
                  return;
              }
              if (maskMap[maskId]) {
                  reject(new Error(`${maskId} has injected`));
                  return;
              }
              if (!isPolygon(geojsonFeature)) {
                  reject(new Error('geojsonFeature is not Polygon,It should be GeoJSON Polygon/MultiPolygon'));
                  return;
              }
              this.broadcast({
                  maskId,
                  geojsonFeature,
                  _type: 'injectMask'
              }, [], (error, data) => {
                  if (error) {
                      reject(error);
                      return;
                  }
                  resolve();
                  maskMap[maskId] = true;
              });
          });
      }

      removeMask(maskId) {
          return new Promise((resolve, reject) => {
              if (!maskId) {
                  reject(new Error('maskId is null'));
                  return;
              }
              this.broadcast({
                  maskId,
                  _type: 'removeMask'
              }, [], (error, data) => {
                  if (error) {
                      reject(error);
                      return;
                  }
                  resolve();
                  delete maskMap[maskId];
              });
          });
      }

      maskHasInjected(maskId) {
          if (!maskId) {
              console.error('maskId is null');
              return false;
          }
          return !!maskMap[maskId];
      }
  }

  let actor;

  function getTileActor() {
      if (!actor) {
          actor = new TileActor(WORKERNAME);
      }
      return actor;
  }

  exports.getTileActor = getTileActor;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=maptalks.tileclip.js.map
