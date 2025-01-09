"use strict";var x=Object.create;var l=Object.defineProperty;var N=Object.getOwnPropertyDescriptor;var H=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty;var P=(u,t)=>{for(var e in t)l(u,e,{get:t[e],enumerable:!0})},I=(u,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of H(t))!O.call(u,n)&&n!==e&&l(u,n,{get:()=>t[n],enumerable:!(r=N(t,n))||r.enumerable});return u};var f=(u,t,e)=>(e=u!=null?x(w(u)):{},I(t||!u||!u.__esModule?l(e,"default",{value:u,enumerable:!0}):e,u)),R=u=>I(l({},"__esModule",{value:!0}),u);var U={};P(U,{AuthHelper:()=>y,CommonHelper:()=>c,DateTimeHelper:()=>o,HtmlHelper:()=>h,StockvnHelper:()=>b,Util:()=>S,foo:()=>W});module.exports=R(U);var d=f(require("lodash/flatten")),p=f(require("lodash/isNumber")),G=f(require("lodash/intersectionWith")),T=f(require("lodash/intersection")),D=f(require("decimal.js"));var o=class{static GetCurrentYearMonthDayString(t){return t||(t=new Date),t.getFullYear().toString()+(t.getMonth()+1).toString().padStart(2,"0")+t.getDate().toString().padStart(2,"0")}static GetCurrentHoursMinutesString(t){return t||(t=new Date),t.getHours().toString().padStart(2,"0")+""+t.getMinutes().toString().padStart(2,"0")}static GetCurrentHoursMinutesSecondsString(t){return t||(t=new Date),this.GetCurrentHoursMinutesString(t)+t.getSeconds().toString().padStart(2,"0")}static GetCurrentYearMonthDayStringUTC(t){return t||(t=new Date),t.toISOString().substring(0,10).replace(/-/g,"")}static GetCurrentHoursMinutesStringUTC(t){return t||(t=new Date),t.toISOString().substring(11,16).replace(/:/g,"")}static GetCurrentHoursMinutesSecondsStringUTC(t){return t||(t=new Date),t.toISOString().substring(11,19).replace(/:/g,"")}static getCurrentISOStringUTC(){return new Date().toISOString().replace(/:/g,"")}static GetDatetimeNowString(t="vi-VN",e="Asia/Saigon"){return new Intl.DateTimeFormat(t,{timeZone:e,dateStyle:"full",timeStyle:"long",hour12:!1}).format(new Date)}static GetTimeInGMTTimezone(t=7){let e=new Date,r=e.getTimezoneOffset()*6e4;return new Date(e.getTime()+r+t*60*6e4)}};var g=class{static ToNumber(t,e=2,r=0){let n=r,i=+t;return(0,p.default)(i)&&!isNaN(i)&&(n=i),e!==void 0&&(n=new D.default(n).toDP(e).toNumber()),n}static RoundNumber(t,e=1){let r=Math.pow(10,e);return Math.round((t+Number.EPSILON)*r)/r}static async ContinuousExecuteBySetTimeout(t,e=1e4,r,n=!1,i=(s,a,m)=>!0){let s={timerId:void 0,delay:NaN};if(!t||typeof t!="function")return s;typeof r!="function"&&(r=g.ContinuousExecuteBySetTimeoutDefaultIntervalFn);let a=r(e,!0,e),m;async function M(){try{i(a,m,e)&&(await t(),m=!0)}catch{m=!1}a=r?.(a,m||!1,e)||e,s.delay=a,s.timerId=setTimeout(M,a)}if(n&&i(a,m,e))try{await t(),m=!0}catch{m=!1}return s.timerId=setTimeout(M,a),s}static ContinuousExecuteBySetTimeoutDefaultIntervalFn(t,e,r){if(e)return r;let n=t||r;return n=Math.round(n*(1.2+Math.random())),n>2*r&&(n=2*r),n}static RepresentNumberInIconicDigit(t){if(!t)return"";let e=t.toString();return e=e.replace(/0/g,"0\uFE0F\u20E3").replace(/1/g,"1\uFE0F\u20E3").replace(/2/g,"2\uFE0F\u20E3").replace(/3/g,"3\uFE0F\u20E3").replace(/4/g,"4\uFE0F\u20E3").replace(/5/g,"5\uFE0F\u20E3").replace(/6/g,"6\uFE0F\u20E3").replace(/7/g,"7\uFE0F\u20E3").replace(/8/g,"8\uFE0F\u20E3").replace(/9/g,"9\uFE0F\u20E3"),e}static GetRandomIntegerTo(t){return this.GetRandomIntegerFromTo(0,t)}static GetRandomIntegerFromTo(t,e){let r=e-t+1;return Math.floor(Math.random()*r)+t}static GetRandomArrayElement(t){if(Array.isArray(t))return t[g.GetRandomIntegerTo(t.length-1)]}static ShuffleArray(t){let e=t.length,r;for(;e!=0;)r=Math.floor(Math.random()*e),e--,[t[e],t[r]]=[t[r],t[e]];return t}static HasAnyOfIntersection(t,e="",r=!0){if(!t||!e)return!1;let n=(0,d.default)([t]),i=(0,d.default)([e]),s;return r?s=(0,G.default)(n,i,(a,m)=>typeof a=="string"||typeof m=="string"?a?.toString()?.toUpperCase()===m?.toString()?.toUpperCase():a===m).length>0:s=(0,T.default)(n,i).length>0,s}static Percent(t,e,r){let n=100*t/e;return r>0&&(n=g.ToNumber(n,r)),n}static DiffInPercent(t,e,r){let n=null;return(0,p.default)(t)&&(0,p.default)(e)&&(n=g.Percent(e-t,t,r)),n}static JoinPaths(...t){var e="/",r=new RegExp(e+"{1,}","g");return t.join(e).replace(r,e)}static ToNumberString(t,e=2,r=!1,n=!0,i=""){return t==0&&!n||!t&&t!==0?"":(r&&+t>0?"+":"")+g.ToNumber(t,e)+i}static NumberToUnitString(t,e=1,r=0,n="",i="en-US"){if(t===0)return"0";if(!t)return"";if(!+t)return t?.toString();let s=(+t/e).toFixed(r);return new Intl.NumberFormat(i).format(+s)+n}},c=g;c.GetCurrentYearMonthDayString=o.GetCurrentYearMonthDayString,c.GetCurrentHoursMinutesString=o.GetCurrentHoursMinutesString,c.GetCurrentHoursMinutesSecondsString=o.GetCurrentHoursMinutesSecondsString,c.GetCurrentYearMonthDayStringUTC=o.GetCurrentYearMonthDayStringUTC,c.GetCurrentHoursMinutesStringUTC=o.GetCurrentHoursMinutesStringUTC,c.GetCurrentHoursMinutesSecondsStringUTC=o.GetCurrentHoursMinutesSecondsStringUTC,c.GetDatetimeNowString=o.GetDatetimeNowString;var S=class{static GetRandomNumberBetween(t,e){return Math.floor(Math.random()*(e-t+1)+t)}static splitByCommaAndTrim(t){return t?t.split(",").filter(e=>e).map(e=>e.trim()):[]}static mergeAndDistinct(t,e){function r(i,s,a){return a.indexOf(i)===s}return t.concat(e).filter(r)}static parseJsonDate(t){return new Date(parseInt(t.replace("/Date(","").replace(")/","")))}static joinPath(...t){for(var e=[],r=0,n=arguments.length;r<n;r++)e=e.concat(arguments[r].split("/"));var i=[];for(r=0,n=e.length;r<n;r++){var s=e[r];!s||s==="."||(s===".."?i.pop():i.push(s))}return e[0]===""&&i.unshift(""),i.join("/")||(i.length?"/":".")}static dirname(t){return this.joinPath(t,"..")}};var h=class{static cleanupHtmlTags(t,e){let r=new RegExp(`<(${e.join("|")})[^>]*>.*?<\\/\\1>`,"igms");return t.replace(r,"")}};var b=class{static StandardizeVolNumber(t){if(typeof t=="number")return t;if(!t)return NaN;let e="";return typeof t=="string"&&(e=t.replace(/,/g,"")),c.ToNumber(e)}static ContinuousExecuteInWorkingHours(t,e){return t?setInterval(async()=>{this.IsInWorkingHours()&&this.IsInWorkingDays()&&await t()},e):void 0}static getCurrentGMT7HoursMinutesString(){let t=o.GetTimeInGMTTimezone(7);return o.GetCurrentHoursMinutesString(t)}static getCurrentGMT7HoursMinutesSecondsString(){let t=o.GetTimeInGMTTimezone(7);return o.GetCurrentHoursMinutesSecondsString(t)}static IsInWorkingHours(){if(!this.IsInWorkingDays())return!1;let t=this.getCurrentGMT7HoursMinutesString();return"0845"<=t&&t<="1130"||"1300"<=t&&t<="1445"}static IsIn_ATO_Sessions(t){return t||(t=this.getCurrentGMT7HoursMinutesString()),this.IsInWorkingDays()?"0845"<=t&&t<="0915":!1}static IsIn_ATC_Sessions(t){return t||(t=this.getCurrentGMT7HoursMinutesString()),this.IsInWorkingDays()?"1430"<=t&&t<="1445":!1}static IsInWorkingDays(){let e=o.GetTimeInGMTTimezone(7).getDay();return 0<e&&e<6}static IsCompoundIndexSymbolCode(t){return t.search(/^I\d\-/i)==0||t.search(/INDEX/)>=0}};var y=class{constructor(){}static get ADMINROLE(){return"admin"}static mergeRoles(t,e){function r(i,s,a){return a.indexOf(i)===s}return t.concat(e).filter(r)}static hasRoles(t,e){let r=[];if(!t||!e||!Array.isArray(e))return r;let n=t.split(",").map(i=>i.trim());if(e.indexOf(this.ADMINROLE)>=0)return r=n,r;for(let i of n)e.indexOf(i)>=0&&r.push(i);return r}};var W="foo";0&&(module.exports={AuthHelper,CommonHelper,DateTimeHelper,HtmlHelper,StockvnHelper,Util,foo});
