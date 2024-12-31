/*!
 * maptalks.tileclip v0.19.0
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
    typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.maptalks = global.maptalks || {}, global.maptalks));
})(this, (function (exports, maptalks) { 'use strict';

    var WORKERCODE = `(function(t){"use strict";function e(t,e){n(t.geometry,e)}function n(t,e){if(t)switch(t.type){case"Point":r(t.coordinates,e);break;case"MultiPoint":case"LineString":o(t.coordinates,e);break;case"MultiLineString":!function(t,e){for(let n=0,r=t.length;n<r;n++)o(t[n],e)}(t.coordinates,e);break;case"Polygon":i(t.coordinates,e);break;case"MultiPolygon":!function(t,e){for(let n=0,r=t.length;n<r;n++)i(t[n],e)}(t.coordinates,e);break;case"GeometryCollection":const s=t.geometries.length;for(let r=0;r<s;r++)n(t.geometries[r],e)}}function r(t,e){e[0]=Math.min(e[0],t[0]),e[1]=Math.min(e[1],t[1]),e[2]=Math.max(e[2],t[0]),e[3]=Math.max(e[3],t[1])}function o(t,e){for(let n=0,o=t.length;n<o;n++)r(t[n],e)}function i(t,e){t.length&&o(t[0],e)}var s=function(t){let r=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY];switch(t.type){case"FeatureCollection":const o=t.features.length;for(let n=0;n<o;n++)e(t.features[n],r);break;case"Feature":e(t,r);break;default:n(t,r)}return r},a=c;function c(t,e,n){var r,o,i,s,a,c=t.length,l=u(t[0],e),f=[];for(n||(n=[]),r=1;r<c;r++){for(o=t[r-1],s=a=u(i=t[r],e);;){if(!(l|s)){f.push(o),s!==a?(f.push(i),r<c-1&&(n.push(f),f=[])):r===c-1&&f.push(i);break}if(l&s)break;l?l=u(o=h(o,i,l,e),e):s=u(i=h(o,i,s,e),e)}l=a}return f.length&&n.push(f),n}function h(t,e,n,r){return 8&n?[t[0]+(e[0]-t[0])*(r[3]-t[1])/(e[1]-t[1]),r[3]]:4&n?[t[0]+(e[0]-t[0])*(r[1]-t[1])/(e[1]-t[1]),r[1]]:2&n?[r[2],t[1]+(e[1]-t[1])*(r[2]-t[0])/(e[0]-t[0])]:1&n?[r[0],t[1]+(e[1]-t[1])*(r[0]-t[0])/(e[0]-t[0])]:null}function u(t,e){var n=0;return t[0]<e[0]?n|=1:t[0]>e[2]&&(n|=2),t[1]<e[1]?n|=4:t[1]>e[3]&&(n|=8),n}let l;function f(t=256){return!l&&OffscreenCanvas&&(l=new OffscreenCanvas(1,1)),l&&(l.width=l.height=t),l}function d(t){const e=t.canvas;t.clearRect(0,0,e.width,e.height)}function g(t){return t.getContext("2d")}function m(t){const e=f(t);return d(g(e)),e.transferToImageBitmap()}function v(t,e,n){const r=g(t);d(r),r.save();r.beginPath(),e.forEach((t=>{(t=>{for(let e=0,n=t.length;e<n;e++){const n=t[e],o=n[0],i=n[n.length-1],[s,a]=o,[c,h]=i;s===c&&a===h||n.push(o);for(let t=0,e=n.length;t<e;t++){const[e,o]=n[t];0===t?r.moveTo(e,o):r.lineTo(e,o)}}})(t)})),r.clip("evenodd"),r.drawImage(n,0,0,t.width,t.height);const o=t.transferToImageBitmap();return r.restore(),o}function p(t,e,n){if(!n)return e;t.width=e.width,t.height=e.height;const r=g(t);d(r),r.save(),r.filter=n,r.drawImage(e,0,0),r.restore();return t.transferToImageBitmap()}c.polyline=c,c.polygon=function(t,e){var n,r,o,i,s,a,c;for(r=1;r<=8;r*=2){for(n=[],i=!(u(o=t[t.length-1],e)&r),s=0;s<t.length;s++)(c=!(u(a=t[s],e)&r))!==i&&n.push(h(o,a,r,e)),c&&n.push(a),o=a,i=c;if(!(t=n).length)break}return n};const w={};function I(t){return"EPSG:3857"===t}function b(t,e){return function(t){if(!t)return!1;const e=(t.geometry||{type:null}).type;return"Polygon"===e||"MultiPolygon"===e}(e)?w[t]?new Error("the"+t+" geojson Already exists"):(w[t]=e,function(t){t.bbox=t.bbox||s(t)}(e),e):new Error("geojson.feature is not Polygon")}function y(t){const[e,n]=t,r=6378137,o=e*Math.PI/180*r,i=n*Math.PI/180;return[o,3189068.5*Math.log((1+Math.sin(i))/(1-Math.sin(i)))]}function M(t,e){if(I(t)){const t=e=>{const n=[];for(let r=0,o=e.length;r<o;r++){const o=e[r];Array.isArray(o[0])?n.push(t(o)):n[r]=y(o)}return n};return t(e)}return e}function k(t,e,n){const[r,o,i,s]=t,a=(i-r)/e,c=(s-o)/e,[h,u]=n;return[(h-r)/a,e-(u-o)/c]}function x(t,e,n,r){const[o,i,s,a]=e,c=(t,e)=>{const r=[];for(let o=0,i=t.length;o<i;o++){const i=t[o];Array.isArray(i[0])?r.push(c(i,e)):r[o]=k(e,n,i)}return r};if(I(t)){const[t,e]=y([o,i]),[n,h]=y([s,a]);return c(r,[t,e,n,h])}return c(r,e)}function E(t){return new Promise(((e,n)=>{const{tile:r,tileBBOX:o,projection:i,tileSize:s,maskId:c,returnBlobURL:h}=t;if(!r)return void n(new Error("tile is null.It should be a ImageBitmap"));if(!o)return void n(new Error("tileBBOX is null"));if(!i)return void n(new Error("projection is null"));if(!s)return void n(new Error("tileSize is null"));if(!c)return void n(new Error("maskId is null"));const u=w[c];if(!u)return void n(new Error("not find mask by maskId:"+c));const l=f(s);if(!l)return void n(new Error("not find canvas.The current environment does not support OffscreenCanvas"));const p=t=>{h?function(t){const e=f();e.width=t.width,e.height=t.height;const n=g(e);return d(n),n.drawImage(t,0,0),e.convertToBlob()}(t).then((t=>{const n=URL.createObjectURL(t);e(n)})).catch((t=>{n(t)})):e(t)},I=u.bbox;if(!I)return void p(r);const{coordinates:b,type:y}=u.geometry;if(!b.length)return void p(r);if(E=o,(k=I)[2]<E[0]||k[1]>E[3]||k[0]>E[2]||k[3]<E[1])return void p(m(s));var k,E;let T,P=b;if("Polygon"===y&&(P=[P]),function(t,e){const[n,r,o,i]=t;return n>=e[0]&&o<=e[2]&&r>=e[1]&&i<=e[3]}(I,o)){T=M(i,P);return void p(v(l,x(i,o,s,T),r))}const N=t=>{if(t.length>0){let e=1/0,n=-1/0,r=1/0,o=-1/0;for(let i=0,s=t.length;i<s;i++){const[s,a]=t[i];e=Math.min(s,e),r=Math.min(a,r),n=Math.max(s,n),o=Math.max(a,o)}if(e!==n&&r!==o)return!0}return!1},A=[];for(let t=0,e=P.length;t<e;t++){const e=P[t];for(let t=0,n=e.length;t<n;t++){const n=e[t],r=a.polygon(n,o);N(r)&&A.push([r])}}if(0===A.length)return void p(m());T=M(i,A);p(v(l,x(i,o,s,T),r))}))}const T=()=>{};const P=new Error("not find canvas.The current environment does not support OffscreenCanvas"),N={accept:"image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.26"};function A(t){return"number"==typeof t}const B=new class{constructor(t,e){this.max=t,this.onRemove=e||T,this.reset()}reset(){if(this.data){const t=this.data.values();for(const e of t)this.onRemove(e)}return this.data=new Map,this}clear(){this.reset(),delete this.onRemove}add(t,e){return e?(this.has(t)?(this.data.delete(t),this.data.set(t,e),this.data.size>this.max&&this.shrink()):(this.data.set(t,e),this.data.size>this.max&&this.shrink()),this):this}keys(){const t=new Array(this.data.size);let e=0;const n=this.data.keys();for(const r of n)t[e++]=r;return t}shrink(){const t=this.data.keys();let e=t.next();for(;this.data.size>this.max;){const n=this.getAndRemove(e.value);n&&this.onRemove(n),e=t.next()}}has(t){return this.data.has(t)}getAndRemove(t){if(!this.has(t))return null;const e=this.data.get(t);return this.data.delete(t),e}get(t){if(!this.has(t))return null;return this.data.get(t)}remove(t){if(!this.has(t))return this;const e=this.data.get(t);return this.data.delete(t),this.onRemove(e),this}setMaxSize(t){return this.max=t,this.data.size>this.max&&this.shrink(),this}}(200,(t=>{t&&t.close&&t.close()}));function z(t,e={},n){return new Promise(((r,o)=>{const i=t=>{createImageBitmap(t).then((t=>{r(t)})).catch((t=>{o(t)}))},s=B.get(t);if(s)i(s);else{const r=n.fetchOptions||{headers:e,referrer:n.referrer};fetch(t,r).then((t=>t.blob())).then((t=>createImageBitmap(t))).then((e=>{B.add(t,e),i(e)})).catch((t=>{o(t)}))}}))}function O(t){const{urlTemplate:e,x:n,y:r,z:o,maxAvailableZoom:i}=t,s=i&&A(i)&&i>=1;return new Promise(((a,c)=>{if(!s)return void c(new Error("maxAvailableZoom is error"));if(!e)return void c(new Error("urlTemplate is error"));if(!A(n)||!A(r)||!A(o))return void c(new Error("x/y/z is error"));let h,u,l,m,v=n,w=r,I=o;const b=o-i;if(b>0){let t=n,e=r,s=o;for(;s>i;)t=Math.floor(t/2),e=Math.floor(e/2),s--;const a=Math.pow(2,b);let c=Math.floor(t*a),f=c+a,d=Math.floor(e*a),g=d+a;c>n&&(c--,f--),d>r&&(d--,g--),h=(n-c)/(f-c),u=(r-d)/(g-d),l=1/(f-c),m=1/(g-d),v=t,w=e,I=i}z(e.replace("{x}",v).replace("{y}",w).replace("{z}",I),Object.assign({},N,t.headers||{}),t).then((e=>{let n;const r=t.filter;if(r){const t=f();if(!t)return void c(P);n=p(t,e,r)}else n=e;if(b<=0)return void a(n);const o=f();if(!o)return void c(P);const{width:i,height:s}=n,v=function(t,e,n,r,o,i){t.width=e.width,t.height=e.height;const s=g(t);return d(s),s.save(),s.drawImage(e,n,r,o,i,0,0,t.width,t.height),s.restore(),t.transferToImageBitmap()}(o,n,i*h,s*u,i*l,s*m);a(v)})).catch((t=>{c(t)}))}))}t.initialize=function(){},t.onmessage=function(t,e){const n=t.data||{},r=n._type;if("getTile"!==r)if("getTileWithMaxZoom"!==r)if("clipTile"!==r){if("injectMask"===r){const t=b(n.maskId,n.geojsonFeature);return t instanceof Error?void e(t):void e()}if("removeMask"===r)return o=n.maskId,delete w[o],void e();var o;console.error("not support message type:",r)}else E(n).then((t=>{const n=[];t instanceof ImageBitmap&&n.push(t),e(null,t,n)})).catch((t=>{e(t)}));else O(n).then((t=>{e(null,t,[t])})).catch((t=>{e(t)}));else{const{url:t}=n;(function(t,e){return new Promise(((n,r)=>{if(!t)return void r(new Error("url is null"));const o=Object.assign({},N,e.headers||{});z(t,o,e).then((t=>{const o=e.filter;if(o){const e=f();e?n(p(e,t,o)):r(P)}else n(t)})).catch((t=>{r(t)}))}))})(t,n).then((t=>{e(null,t,[t])})).catch((t=>{e(t)}))}},Object.defineProperty(t,"__esModule",{value:!0})})`;

    lineclip.polyline = lineclip;
    lineclip.polygon = polygonclip;


    // Cohen-Sutherland line clippign algorithm, adapted to efficiently
    // handle polylines rather than just segments

    function lineclip(points, bbox, result) {

        var len = points.length,
            codeA = bitCode(points[0], bbox),
            part = [],
            i, a, b, codeB, lastCode;

        if (!result) result = [];

        for (i = 1; i < len; i++) {
            a = points[i - 1];
            b = points[i];
            codeB = lastCode = bitCode(b, bbox);

            while (true) {

                if (!(codeA | codeB)) { // accept
                    part.push(a);

                    if (codeB !== lastCode) { // segment went outside
                        part.push(b);

                        if (i < len - 1) { // start a new line
                            result.push(part);
                            part = [];
                        }
                    } else if (i === len - 1) {
                        part.push(b);
                    }
                    break;

                } else if (codeA & codeB) { // trivial reject
                    break;

                } else if (codeA) { // a outside, intersect with clip edge
                    a = intersect(a, b, codeA, bbox);
                    codeA = bitCode(a, bbox);

                } else { // b outside
                    b = intersect(a, b, codeB, bbox);
                    codeB = bitCode(b, bbox);
                }
            }

            codeA = lastCode;
        }

        if (part.length) result.push(part);

        return result;
    }

    // Sutherland-Hodgeman polygon clipping algorithm

    function polygonclip(points, bbox) {

        var result, edge, prev, prevInside, i, p, inside;

        // clip against each side of the clip rectangle
        for (edge = 1; edge <= 8; edge *= 2) {
            result = [];
            prev = points[points.length - 1];
            prevInside = !(bitCode(prev, bbox) & edge);

            for (i = 0; i < points.length; i++) {
                p = points[i];
                inside = !(bitCode(p, bbox) & edge);

                // if segment goes through the clip window, add an intersection
                if (inside !== prevInside) result.push(intersect(prev, p, edge, bbox));

                if (inside) result.push(p); // add a point if it's inside

                prev = p;
                prevInside = inside;
            }

            points = result;

            if (!points.length) break;
        }

        return result;
    }

    // intersect a segment against one of the 4 lines that make up the bbox

    function intersect(a, b, edge, bbox) {
        return edge & 8 ? [a[0] + (b[0] - a[0]) * (bbox[3] - a[1]) / (b[1] - a[1]), bbox[3]] : // top
               edge & 4 ? [a[0] + (b[0] - a[0]) * (bbox[1] - a[1]) / (b[1] - a[1]), bbox[1]] : // bottom
               edge & 2 ? [bbox[2], a[1] + (b[1] - a[1]) * (bbox[2] - a[0]) / (b[0] - a[0])] : // right
               edge & 1 ? [bbox[0], a[1] + (b[1] - a[1]) * (bbox[0] - a[0]) / (b[0] - a[0])] : // left
               null;
    }

    // bit code reflects the point position relative to the bbox:

    //         left  mid  right
    //    top  1001  1000  1010
    //    mid  0001  0000  0010
    // bottom  0101  0100  0110

    function bitCode(p, bbox) {
        var code = 0;

        if (p[0] < bbox[0]) code |= 1; // left
        else if (p[0] > bbox[2]) code |= 2; // right

        if (p[1] < bbox[1]) code |= 4; // bottom
        else if (p[1] > bbox[3]) code |= 8; // top

        return code;
    }

    function isPolygon(feature) {
        if (!feature) {
            return false;
        }
        const geometry = feature.geometry || { type: null };
        const type = geometry.type;
        return type === 'Polygon' || type === 'MultiPolygon';
    }

    const WORKERNAME = '__maptalks.tileclip';
    maptalks.registerWorkerAdapter(WORKERNAME, WORKERCODE);
    const maskMap = {};
    class TileActor extends maptalks.worker.Actor {
        getTile(options) {
            options = Object.assign({}, options);
            return new Promise((resolve, reject) => {
                options.referrer = options.referrer || document.location.href;
                this.send(Object.assign({}, { _type: 'getTile' }, options), [], (error, image) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(image);
                    }
                });
            });
        }
        getTileWithMaxZoom(options) {
            options = Object.assign({}, options);
            return new Promise((resolve, reject) => {
                options.referrer = options.referrer || document.location.href;
                this.send(Object.assign({}, { _type: 'getTileWithMaxZoom' }, options), [], (error, image) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(image);
                    }
                });
            });
        }
        clipTile(options) {
            options = Object.assign({}, options);
            return new Promise((resolve, reject) => {
                const buffers = [];
                if (options.tile && options.tile instanceof ImageBitmap) {
                    buffers.push(options.tile);
                }
                this.send(Object.assign({}, { _type: 'clipTile' }, options), buffers, (error, image) => {
                    if (error) {
                        reject(error);
                    }
                    else {
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
                    resolve(null);
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
                    resolve(null);
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
