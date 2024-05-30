"use strict";var x=Object.create;var l=Object.defineProperty;var N=Object.getOwnPropertyDescriptor;var w=Object.getOwnPropertyNames;var O=Object.getPrototypeOf,H=Object.prototype.hasOwnProperty;var P=(u,t)=>{for(var e in t)l(u,e,{get:t[e],enumerable:!0})},T=(u,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of w(t))!H.call(u,n)&&n!==e&&l(u,n,{get:()=>t[n],enumerable:!(r=N(t,n))||r.enumerable});return u};var g=(u,t,e)=>(e=u!=null?x(O(u)):{},T(t||!u||!u.__esModule?l(e,"default",{value:u,enumerable:!0}):e,u)),R=u=>T(l({},"__esModule",{value:!0}),u);var W={};P(W,{AuthHelper:()=>y,CommonHelper:()=>c,HtmlHelper:()=>d,StockvnHelper:()=>S,Util:()=>h,foo:()=>U});module.exports=R(W);var I=g(require("lodash/intersection")),G=g(require("lodash/intersectionWith")),p=g(require("lodash/isNumber")),b=g(require("lodash/flatten")),D=g(require("decimal.js"));var a=class{static GetCurrentYearMonthDayString(t){return t||(t=new Date),t.getFullYear().toString()+(t.getMonth()+1).toString().padStart(2,"0")+t.getDate().toString().padStart(2,"0")}static GetCurrentHoursMinutesString(t){return t||(t=new Date),t.getHours().toString().padStart(2,"0")+""+t.getMinutes().toString().padStart(2,"0")}static GetCurrentHoursMinutesSecondsString(t){return t||(t=new Date),this.GetCurrentHoursMinutesString(t)+t.getSeconds().toString().padStart(2,"0")}static GetCurrentYearMonthDayStringUTC(t){return t||(t=new Date),t.toISOString().substring(0,10).replace(/-/g,"")}static GetCurrentHoursMinutesStringUTC(t){return t||(t=new Date),t.toISOString().substring(11,16).replace(/:/g,"")}static GetCurrentHoursMinutesSecondsStringUTC(t){return t||(t=new Date),t.toISOString().substring(11,19).replace(/:/g,"")}static GetDatetimeNowString(t="vi-VN",e="Asia/Saigon"){return new Intl.DateTimeFormat(t,{timezone:e,timeZone:e,dateStyle:"full",timeStyle:"long",hour12:!1}).format(new Date)}static GetTimeInGMTTimezone(t=7){let e=new Date,r=e.getTimezoneOffset()*6e4;return new Date(e.getTime()+r+t*60*6e4)}};var f=class{static ToNumber(t,e=2,r=0){let n=r,i=+t;return(0,p.default)(i)&&!isNaN(i)&&(n=i),e!==void 0&&(n=new D.default(n).toDP(e).toNumber()),n}static RoundNumber(t,e=1){let r=Math.pow(10,e);return Math.round((t+Number.EPSILON)*r)/r}static async ContinuousExecuteBySetTimeout(t,e=1e4,r,n=!1,i=(s,o,m)=>!0){let s={timerId:void 0,delay:NaN};if(!t||typeof t!="function")return s;typeof r!="function"&&(r=f.ContinuousExecuteBySetTimeoutDefaultIntervalFn);let o=r(void 0,void 0,e),m;async function M(){try{i(o,m,e)&&(await t(),m=!0)}catch{m=!1}o=r?.(o,m,e),s.delay=o,s.timerId=setTimeout(M,o)}if(n&&i(o,m,e))try{await t(),m=!0}catch{m=!1}return s.timerId=setTimeout(M,o),s}static ContinuousExecuteBySetTimeoutDefaultIntervalFn(t,e,r){if(e)return r;let n=t||r;return n=Math.round(n*(1.2+Math.random())),n>2*r&&(n=2*r),n}static RepresentNumberInIconicDigit(t){if(!t)return"";let e=t.toString();return e=e.replace(/0/g,"0\uFE0F\u20E3").replace(/1/g,"1\uFE0F\u20E3").replace(/2/g,"2\uFE0F\u20E3").replace(/3/g,"3\uFE0F\u20E3").replace(/4/g,"4\uFE0F\u20E3").replace(/5/g,"5\uFE0F\u20E3").replace(/6/g,"6\uFE0F\u20E3").replace(/7/g,"7\uFE0F\u20E3").replace(/8/g,"8\uFE0F\u20E3").replace(/9/g,"9\uFE0F\u20E3"),e}static GetRandomIntegerTo(t){return Math.round(Math.random()*t)}static GetRandomArrayElement(t){if(Array.isArray(t))return t[f.GetRandomIntegerTo(t.length-1)]}static ShuffleArray(t){let e=t.length,r;for(;e!=0;)r=Math.floor(Math.random()*e),e--,[t[e],t[r]]=[t[r],t[e]];return t}static HasAnyOfIntersection(t,e="",r=!0){if(!t||!e)return!1;let n=(0,b.default)([t]),i=(0,b.default)([e]),s;return r?s=(0,G.default)(n,i,(o,m)=>typeof o=="string"||typeof m=="string"?o?.toString()?.toUpperCase()===m?.toString()?.toUpperCase():o===m).length>0:s=(0,I.default)(n,i).length>0,s}static Percent(t,e,r){let n=100*t/e;return r>0&&(n=f.ToNumber(n,r)),n}static DiffInPercent(t,e,r){let n=null;return(0,p.default)(t)&&(0,p.default)(e)&&(n=f.Percent(e-t,t,r)),n}static JoinPaths(){let t=Array.prototype.slice.call(arguments);var e="/",r=new RegExp(e+"{1,}","g");return t.join(e).replace(r,e)}static ToNumberString(t,e=2,r=!1,n=!0,i=""){return t==0&&!n||!t&&t!==0?"":(r&&+t>0?"+":"")+f.ToNumber(t,e)+i}static NumberToUnitString(t,e=1,r=0,n="",i="en-US"){if(t===0)return"0";if(!t)return"";if(!+t)return t?.toString();let s=(+t/e).toFixed(r);return new Intl.NumberFormat(i).format(+s)+n}},c=f;c.GetCurrentYearMonthDayString=a.GetCurrentYearMonthDayString,c.GetCurrentHoursMinutesString=a.GetCurrentHoursMinutesString,c.GetCurrentHoursMinutesSecondsString=a.GetCurrentHoursMinutesSecondsString,c.GetCurrentYearMonthDayStringUTC=a.GetCurrentYearMonthDayStringUTC,c.GetCurrentHoursMinutesStringUTC=a.GetCurrentHoursMinutesStringUTC,c.GetCurrentHoursMinutesSecondsStringUTC=a.GetCurrentHoursMinutesSecondsStringUTC,c.GetDatetimeNowString=a.GetDatetimeNowString;var S=class{static StandardizeVolNumber(t){if(typeof t=="number")return t;if(!t)return NaN;let e="";return typeof t=="string"&&(e=t.replace(/,/g,"")),c.ToNumber(e)}static ContinuousExecuteInWorkingHours(t,e){return t?setInterval(async()=>{this.IsInWorkingHours()&&this.IsInWorkingDays()&&await t()},e):void 0}static getCurrentGMT7TimeString(){let t=a.GetTimeInGMTTimezone(7);return a.GetCurrentHoursMinutesString(t)}static IsInWorkingHours(){if(!this.IsInWorkingDays())return!1;let t=this.getCurrentGMT7TimeString();return"0845"<=t&&t<="1130"||"1300"<=t&&t<="1445"}static IsIn_ATO_Sessions(t){return t||(t=this.getCurrentGMT7TimeString()),"0845"<=t&&t<="0915"}static IsIn_ATC_Sessions(t){return t||(t=this.getCurrentGMT7TimeString()),"1430"<=t&&t<="1445"}static IsInWorkingDays(){let e=a.GetTimeInGMTTimezone(7).getDay();return 0<e&&e<6}};var y=class{constructor(){}static get ADMINROLE(){return"admin"}static mergeRoles(t,e){function r(i,s,o){return o.indexOf(i)===s}return t.concat(e).filter(r)}static hasRoles(t,e){let r=[];if(!t||!e||!Array.isArray(e))return r;let n=t.split(",").map(i=>i.trim());if(e.indexOf(this.ADMINROLE)>=0)return r=n,r;for(let i of n)e.indexOf(i)>=0&&r.push(i);return r}};var h=class{static GetRandomNumberBetween(t,e){return Math.floor(Math.random()*(e-t+1)+t)}static splitByCommaAndTrim(t){return t?t.split(",").filter(e=>e).map(e=>e.trim()):[]}static mergeAndDistinct(t,e){function r(i,s,o){return o.indexOf(i)===s}return t.concat(e).filter(r)}static parseJsonDate(t){return new Date(parseInt(t.replace("/Date(","").replace(")/","")))}static joinPath(...t){for(var e=[],r=0,n=arguments.length;r<n;r++)e=e.concat(arguments[r].split("/"));var i=[];for(r=0,n=e.length;r<n;r++){var s=e[r];!s||s==="."||(s===".."?i.pop():i.push(s))}return e[0]===""&&i.unshift(""),i.join("/")||(i.length?"/":".")}static dirname(t){return this.joinPath(t,"..")}};var d=class{static cleanupHtmlTags(t,e){let r=new RegExp(`<(${e.join("|")})[^>]*>.*?<\\/\\1>`,"igms");return t.replace(r,"")}};var U="foo";0&&(module.exports={AuthHelper,CommonHelper,HtmlHelper,StockvnHelper,Util,foo});
