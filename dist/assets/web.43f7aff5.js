import{W as r}from"./index.bcd1f957.js";class o extends r{constructor(){super(...arguments),this.wakeLock=null,this.isSupported="wakeLock"in navigator}async keepAwake(){this.isSupported||this.throwUnsupportedError(),this.wakeLock&&await this.allowSleep(),this.wakeLock=await navigator.wakeLock.request("screen")}async allowSleep(){var e;this.isSupported||this.throwUnsupportedError(),(e=this.wakeLock)===null||e===void 0||e.release(),this.wakeLock=null}throwUnsupportedError(){throw this.unavailable("Screen Wake Lock API not available in this browser.")}}export{o as KeepAwakeWeb};