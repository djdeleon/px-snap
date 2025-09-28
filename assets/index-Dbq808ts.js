(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(o){if(o.ep)return;o.ep=!0;const t=s(o);fetch(o.href,t)}})();const u=document.getElementById("dock"),v=document.getElementById("panel"),m=document.getElementById("calculator"),f=document.getElementById("preview"),p=document.getElementById("baseFontRange"),E=document.getElementById("contrastRatio"),L=document.getElementById("nav");document.getElementById("horizontal");document.getElementById("vertical");const $=document.getElementById("switchMode"),d=document.getElementById("switchText"),F=document.getElementById("grid"),D=document.getElementById("typeScales"),G=document.getElementById("cssGenerators");let k=8,z="8pt Grid System + 4pt Baseline",H="combine",y=16,T=1.067,R=16;function A(){return E.querySelector(".btn-active").textContent.trim()}G.addEventListener("click",e=>{const n=e.target.closest("button");if(!n)return;const s=n.textContent.trim();Q(X(s),n)});function q(){let e=`/* PX Snap Design Tokens - Generated ${new Date().toLocaleString()} */
`;e+=`/* Base: ${y}px | Ratio: ${A()} | Grid: ${z} */

`,e+=`// Design Tokens Variables
`;const n=[{label:"sm",size:"320px"},{label:"md",size:"672px"},{label:"lg",size:"1056px"},{label:"xl",size:"1312px"},{label:"2xl",size:"1584px"}];e+=`
// Breakpoints
`,n.forEach(t=>{e+=`$bp-${t.label}: ${t.size};
`}),e+=`
// Spacing
`;const s=Array.from({length:10},(t,i)=>(i+1)*k),a=["xs","sm","md","lg","xl","2xl","3xl","4xl","5xl","6xl","7xl","8xl"];s.forEach((t,i)=>{e+=`$space-${a[i]}: ${t}px;
`});const o=w();return e+=`
// Typography
`,e+=`// Font Sizes
`,o.forEach(t=>{e+=`$fs-${t.label}: ${t.size};
`}),e+=`
// Line Heights
`,o.forEach(t=>{e+=`$lh-${t.label}: ${t.lineHeight};
`}),e+=`
// SCSS Maps
`,e+=`$breakpoints: (
`,n.forEach((t,i)=>{const l=i<n.length-1?",":"";e+=`  ${t.label}: ${t.size}${l}
`}),e+=`);

`,e+=`$spacings: (
`,s.forEach((t,i)=>{const l=i<s.length-1?",":"";e+=`  ${a[i]}: ${t}px${l}
`}),e+=`);

`,e+=`$font-sizes: (
`,o.forEach((t,i)=>{const l=i<o.length-1?",":"";e+=`  ${t.label}: ${t.size}${l}
`}),e+=`);

`,e+=`$line-heights: (
`,o.forEach((t,i)=>{const l=i<o.length-1?",":"";e+=`  ${t.label}: ${t.lineHeight}${l}
`}),e+=`);

`,e+=`:root {
`,e+=`  // Breakpoints
`,n.forEach(t=>{e+=`  --bp-${t.label}: #{$bp-${t.label}};
`}),e+=`
  // Spacing
`,s.forEach((t,i)=>{e+=`  --space-${a[i]}: #{$space-${a[i]}};
`}),e+=`
  // Typography
`,o.forEach(t=>{e+=`  --fs-${t.label}: #{$fs-${t.label}};
`}),e+=`
`,o.forEach(t=>{e+=`  --lh-${t.label}: #{$lh-${t.label}};
`}),e+=`}

`,e+=`// Mixins
`,e+=`@mixin breakpoint($size) {
`,e+=`  @if map-has-key($breakpoints, $size) {
`,e+=`    @media (min-width: map-get($breakpoints, $size)) {
`,e+=`      @content;
`,e+=`    }
`,e+=`  } @else {
`,e+=`    @warn "Breakpoint #{$size} not found in $breakpoints map";
`,e+=`  }
`,e+=`}

`,e+=`@mixin text-style($size) {
`,e+=`  @if map-has-key($font-sizes, $size) and map-has-key($line-heights, $size) {
`,e+=`    font-size: map-get($font-sizes, $size);
`,e+=`    line-height: map-get($line-heights, $size);
`,e+=`  } @else {
`,e+=`    @warn "Text style #{$size} not found";
`,e+=`  }
`,e+=`}

`,e+=`// Typography Utilities
`,o.forEach(t=>{e+=`.text-${t.label} {
`,e+=`  @include text-style(${t.label});
`,e+=`}

`}),e+=`// Spacing Utilities
`,e+=`// Margin
`,s.forEach((t,i)=>{e+=`.m-${i+1} {
`,e+=`  margin: $space-${a[i]};
`,e+=`}

`}),e+=`// Padding
`,s.forEach((t,i)=>{e+=`.p-${i+1} {
`,e+=`  padding: $space-${a[i]};
`,e+=`}

`}),e+=`// Gap
`,s.forEach((t,i)=>{e+=`.gap-${i+1} {
`,e+=`  gap: $space-${a[i]};
`,e+=`}

`}),e}function O(){let e=`/* PX Snap Design Tokens - Generated ${new Date().toLocaleString()} */
`;e+=`/* Base: ${y}px | Ratio: ${A()} | Grid: ${z} */

`,e+=`:root {
`;const n=[{label:"sm",size:"320px"},{label:"md",size:"672px"},{label:"lg",size:"1056px"},{label:"xl",size:"1312px"},{label:"2xl",size:"1584px"}];e+=`  /* Breakpoints */
`;let s=`  /* Viewports */
`,a=`
  /* Media Queries */
`;n.forEach(c=>{s+=`  --bp-${c.label}: ${c.size}
`,a+=`  @media (min-width: ${c.size}) {}
`}),e+=s,e+=a,e+=`
  /* Spacing */
`;const o=Array.from({length:10},(c,r)=>(r+1)*k),t=["xs","sm","md","lg","xl","2xl","3xl","4xl","5xl","6xl","7xl","8xl"];let i="";o.forEach((c,r)=>i+=`  --space-${t[r]}: ${c}px
`),e+=i;const l=w();let x=`  /* Font SIze */
`,g=`
  /* Line Height */
`;e+=`
  /* Typography */
`,l.forEach(c=>{x+=`  --fs-${c.label}: ${c.size};
`,g+=`  --lh-${c.label}: ${c.lineHeight};
`}),e+=x,e+=g,e+=`
  /* Typography Utilities */
`,l.forEach(c=>{e+=`  .text-${c.label} { font-size: var(--fs-${c.label}); line-height: var(--lh-${c.label}); }
`}),e+=`
  /* Spacing Utilities */
`;let S=`  /* Margin */
`,B=`
  /* Padding */
`,C=`
  /* Gap */
`;return o.forEach((c,r)=>{S+=`  .m-${r+1} { margin: var(--space-${t[r]}); }
`,B+=`  .p-${r+1} { padding: var(--space-${t[r]}); }
`,C+=`  .gap-${r+1} { gap: var(--space-${t[r]}); }
`}),e+=S,e+=B,e+=C,e+=`}

`,e}function X(e){switch(e){case"CSS":return O();case"SCSS":return q()}}async function Q(e,n){try{await navigator.clipboard.writeText(e);const s=n.firstElementChild;s.classList.add("hidden");const a=n.querySelector(".checkIcon");a.classList.remove("hidden"),setTimeout(()=>{s.classList.remove("hidden"),a.classList.add("hidden")},1e3)}catch{alert("Copying failed, try again later.")}}function w(){const e=[],n={xs:-1,sm:0,md:1,lg:2,xl:3,"2xl":4,"3xl":5,"4xl":6,"5xl":7,"6xl":8},s={combine:!0,modular:!1,"4pt":!0};for(const[a,o]of Object.entries(n)){const t=y*Math.pow(T,o);let i;t<=12?i=1.6:t<=16?i=1.5:t<=20?i=1.4:i=1.2;const l=t*i,g=Math.round(l/4)*4/t;e.push({label:a,size:`${U(t).toFixed(3)}rem`,lineHeight:s[H]?g.toFixed(3):`${l.toFixed()}px`})}return e}function h(){const e=w();document.getElementById("scales")?.remove();const n=document.createElement("div");n.setAttribute("id","scales"),n.setAttribute("class","relative z-1 h-screen p-5"),e.forEach(s=>{const a=document.createElement("div");a.textContent="The quick brown fox jumps over the lazy dog",a.style.fontSize=`${s.size}`,a.classList.add("whitespace-nowrap"),a.classList.add("mb-10"),n.appendChild(a)}),f.appendChild(n)}h();function U(e){return e/R}F.addEventListener("click",e=>{const n=e.target.closest("input");n&&(k=n.value,z=n.dataset.grid,h())});D.addEventListener("click",e=>{const n=e.target.closest("input");n&&(H=n.value,h())});p.addEventListener("input",()=>{const e=p.min,n=p.max,s=p.value,a=(s-e)/(n-e)*100;baseFontTooltip.dataset.tip=`${s}px`,baseFontTooltip.style.insetInlineStart=`${a}%`,y=p.value,h()});E.addEventListener("click",e=>{const n=E.querySelector(".btn-active"),s=e.target.closest("button");!n||!s||(n.classList.remove("btn-active"),s.classList.add("btn-active"),T=s.value,h())});u.addEventListener("click",e=>{const n=e.target.closest("button");n&&(u.querySelectorAll("button").forEach(a=>a.classList.remove("dock-active")),n.classList.add("dock-active"),n.textContent.trim()==="Preview"?(m.classList.add("hidden"),f.classList.remove("hidden"),L.classList.add("hidden")):(m.classList.remove("hidden"),f.classList.add("hidden"),L.classList.remove("hidden")))});document.addEventListener("DOMContentLoaded",()=>{const e=window.innerHeight-u.offsetHeight,n=window.innerHeight,s=e/n*100;v.style.height=`${s}vh`});function N(){const e=window.innerHeight-u.offsetHeight,n=window.innerHeight;return e/n*100}const I=window.matchMedia("(prefers-color-scheme: dark)");let b=I.matches;b?d.textContent="Dark":(d.textContent="Light",$.querySelector("input[type=checkbox]").setAttribute("checked","checked"));I.addEventListener("change",e=>{e.matches?(d.textContent="Dark",$.querySelector("input[type=checkbox]").removeAttribute("checked"),b=!0):(d.textContent="Light",$.querySelector("input[type=checkbox]").setAttribute("checked","checked"),b=!1),document.documentElement.removeAttribute("data-theme")});$.addEventListener("click",e=>{const n=e.target.closest("input[type=checkbox]"),s=document.documentElement;let a=document.querySelector(":root").hasAttribute("data-theme");n&&(b?a&&s.getAttribute("data-theme")==="light"?(s.setAttribute("data-theme","dark"),d.textContent="Dark"):(s.setAttribute("data-theme","light"),d.textContent="Light"):a?s.getAttribute("data-theme")==="light"?(s.setAttribute("data-theme","dark"),d.textContent="Dark"):(s.setAttribute("data-theme","light"),d.textContent="Light"):(s.setAttribute("data-theme","dark"),d.textContent="Dark"))});const P=window.matchMedia("(min-width: 640px)");function M(e){e.matches?(v.removeAttribute("style"),m.classList.remove("hidden"),L.classList.remove("hidden"),m.classList.add("h-screen"),f.style.overflow="auto"):v.style.height=`${N()}vh`}M(P);P.addEventListener("change",M);
