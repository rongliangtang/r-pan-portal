/* empty css                  */import{E as ke}from"./el-result.d7223370.js";import{at as A,aL as Ie,b as me,q as W,cB as pe,J as ce,d as se,cI as ve,cJ as Le,cK as ze,ah as ge,u as _e,a_ as Ce,r as k,cL as Ee,bl as Se,c as w,a9 as ue,ae as ye,Z as we,o as b,f as de,M as u,w as y,C as h,n as g,a as e,D as fe,al as xe,h as S,F as T,z as Ne,g as E,am as ne,cM as Te,c2 as Oe,cN as Re,cO as $e,E as Be,cP as Ae,cQ as Ve,bZ as Me,S as Ye,T as De,j as ae,a2 as He,b6 as Pe,_ as be,aa as V,a6 as B,cR as Xe,p as he,c8 as Fe,c7 as We,m as je,au as Ke,B as Ze,cS as qe,t as Je,cT as Ue,W as Ge,k as Qe,V as et}from"./index.997f7450.js";import{_ as tt}from"./_plugin-vue_export-helper.cdc0426e.js";import{d as at}from"./debounce.d990cfb9.js";const nt=(r,m)=>{if(!A||!r||!m)return!1;const s=r.getBoundingClientRect();let d;return m instanceof Element?d=m.getBoundingClientRect():d={top:0,right:window.innerWidth,bottom:window.innerHeight,left:0},s.top<d.bottom&&s.bottom>d.top&&s.right>d.left&&s.left<d.right};var st="Expected a function";function ie(r,m,s){var d=!0,o=!0;if(typeof r!="function")throw new TypeError(st);return Ie(s)&&(d="leading"in s?!!s.leading:d,o="trailing"in s?!!s.trailing:o),at(r,m,{leading:d,maxWait:m,trailing:o})}const ot=me({urlList:{type:W(Array),default:()=>pe([])},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},hideOnClickModal:Boolean,teleported:Boolean,closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2},minScale:{type:Number,default:.2},maxScale:{type:Number,default:7},crossorigin:{type:W(String)}}),lt={close:()=>!0,switch:r=>ce(r),rotate:r=>ce(r)},rt=["src","crossorigin"],it=se({name:"ElImageViewer"}),ct=se({...it,props:ot,emits:lt,setup(r,{expose:m,emit:s}){var d;const o=r,p={CONTAIN:{name:"contain",icon:ve(Le)},ORIGINAL:{name:"original",icon:ve(ze)}},{t:M}=ge(),c=_e("image-viewer"),{nextZIndex:Y}=Ce(),x=k(),N=k([]),O=Ee(),I=k(!0),f=k(o.initialIndex),R=Se(p.CONTAIN),l=k({scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}),D=k((d=o.zIndex)!=null?d:Y()),oe=w(()=>{const{urlList:a}=o;return a.length<=1}),j=w(()=>f.value===0),K=w(()=>f.value===o.urlList.length-1),H=w(()=>o.urlList[f.value]),le=w(()=>[c.e("btn"),c.e("prev"),c.is("disabled",!o.infinite&&j.value)]),Z=w(()=>[c.e("btn"),c.e("next"),c.is("disabled",!o.infinite&&K.value)]),P=w(()=>{const{scale:a,deg:n,offsetX:i,offsetY:L,enableTransition:C}=l.value;let _=i/a,z=L/a;switch(n%360){case 90:case-270:[_,z]=[z,-_];break;case 180:case-180:[_,z]=[-_,-z];break;case 270:case-90:[_,z]=[-z,_];break}const $={transform:`scale(${a}) rotate(${n}deg) translate(${_}px, ${z}px)`,transition:C?"transform .3s":""};return R.value.name===p.CONTAIN.name&&($.maxWidth=$.maxHeight="100%"),$});function X(){q(),s("close")}function re(){const a=ie(i=>{switch(i.code){case B.esc:o.closeOnPressEscape&&X();break;case B.space:ee();break;case B.left:te();break;case B.up:v("zoomIn");break;case B.right:t();break;case B.down:v("zoomOut");break}}),n=ie(i=>{const L=i.deltaY||i.deltaX;v(L<0?"zoomIn":"zoomOut",{zoomRate:o.zoomRate,enableTransition:!1})});O.run(()=>{V(document,"keydown",a),V(document,"wheel",n)})}function q(){O.stop()}function J(){I.value=!1}function U(a){I.value=!1,a.target.alt=M("el.image.error")}function G(a){if(I.value||a.button!==0||!x.value)return;l.value.enableTransition=!1;const{offsetX:n,offsetY:i}=l.value,L=a.pageX,C=a.pageY,_=ie($=>{l.value={...l.value,offsetX:n+$.pageX-L,offsetY:i+$.pageY-C}}),z=V(document,"mousemove",_);V(document,"mouseup",()=>{z()}),a.preventDefault()}function Q(){l.value={scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}}function ee(){if(I.value)return;const a=Xe(p),n=Object.values(p),i=R.value.name,C=(n.findIndex(_=>_.name===i)+1)%a.length;R.value=p[a[C]],Q()}function F(a){const n=o.urlList.length;f.value=(a+n)%n}function te(){j.value&&!o.infinite||F(f.value-1)}function t(){K.value&&!o.infinite||F(f.value+1)}function v(a,n={}){if(I.value)return;const{minScale:i,maxScale:L}=o,{zoomRate:C,rotateDeg:_,enableTransition:z}={zoomRate:o.zoomRate,rotateDeg:90,enableTransition:!0,...n};switch(a){case"zoomOut":l.value.scale>i&&(l.value.scale=Number.parseFloat((l.value.scale/C).toFixed(3)));break;case"zoomIn":l.value.scale<L&&(l.value.scale=Number.parseFloat((l.value.scale*C).toFixed(3)));break;case"clockwise":l.value.deg+=_,s("rotate",l.value.deg);break;case"anticlockwise":l.value.deg-=_,s("rotate",l.value.deg);break}l.value.enableTransition=z}return ue(H,()=>{ye(()=>{const a=N.value[0];a!=null&&a.complete||(I.value=!0)})}),ue(f,a=>{Q(),s("switch",a)}),we(()=>{var a,n;re(),(n=(a=x.value)==null?void 0:a.focus)==null||n.call(a)}),m({setActiveItem:F}),(a,n)=>(b(),de(Pe,{to:"body",disabled:!a.teleported},[u(He,{name:"viewer-fade",appear:""},{default:y(()=>[h("div",{ref_key:"wrapper",ref:x,tabindex:-1,class:g(e(c).e("wrapper")),style:fe({zIndex:D.value})},[h("div",{class:g(e(c).e("mask")),onClick:n[0]||(n[0]=xe(i=>a.hideOnClickModal&&X(),["self"]))},null,2),S(" CLOSE "),h("span",{class:g([e(c).e("btn"),e(c).e("close")]),onClick:X},[u(e(T),null,{default:y(()=>[u(e(Ne))]),_:1})],2),S(" ARROW "),e(oe)?S("v-if",!0):(b(),E(ne,{key:0},[h("span",{class:g(e(le)),onClick:te},[u(e(T),null,{default:y(()=>[u(e(Te))]),_:1})],2),h("span",{class:g(e(Z)),onClick:t},[u(e(T),null,{default:y(()=>[u(e(Oe))]),_:1})],2)],64)),S(" ACTIONS "),h("div",{class:g([e(c).e("btn"),e(c).e("actions")])},[h("div",{class:g(e(c).e("actions__inner"))},[u(e(T),{onClick:n[1]||(n[1]=i=>v("zoomOut"))},{default:y(()=>[u(e(Re))]),_:1}),u(e(T),{onClick:n[2]||(n[2]=i=>v("zoomIn"))},{default:y(()=>[u(e($e))]),_:1}),h("i",{class:g(e(c).e("actions__divider"))},null,2),u(e(T),{onClick:ee},{default:y(()=>[(b(),de(Be(e(R).icon)))]),_:1}),h("i",{class:g(e(c).e("actions__divider"))},null,2),u(e(T),{onClick:n[3]||(n[3]=i=>v("anticlockwise"))},{default:y(()=>[u(e(Ae))]),_:1}),u(e(T),{onClick:n[4]||(n[4]=i=>v("clockwise"))},{default:y(()=>[u(e(Ve))]),_:1})],2)],2),S(" CANVAS "),h("div",{class:g(e(c).e("canvas"))},[(b(!0),E(ne,null,Me(a.urlList,(i,L)=>Ye((b(),E("img",{ref_for:!0,ref:C=>N.value[L]=C,key:i,src:i,style:fe(e(P)),class:g(e(c).e("img")),crossorigin:a.crossorigin,onLoad:J,onError:U,onMousedown:G},null,46,rt)),[[De,L===f.value]])),128))],2),ae(a.$slots,"default")],6)]),_:3})],8,["disabled"]))}});var ut=be(ct,[["__file","image-viewer.vue"]]);const dt=he(ut),ft=me({hideOnClickModal:Boolean,src:{type:String,default:""},fit:{type:String,values:["","contain","cover","fill","none","scale-down"],default:""},loading:{type:String,values:["eager","lazy"]},lazy:Boolean,scrollContainer:{type:W([String,Object])},previewSrcList:{type:W(Array),default:()=>pe([])},previewTeleported:Boolean,zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2},minScale:{type:Number,default:.2},maxScale:{type:Number,default:7},crossorigin:{type:W(String)}}),vt={load:r=>r instanceof Event,error:r=>r instanceof Event,switch:r=>ce(r),close:()=>!0,show:()=>!0},mt=["src","loading","crossorigin"],pt={key:0},gt=se({name:"ElImage",inheritAttrs:!1}),_t=se({...gt,props:ft,emits:vt,setup(r,{emit:m}){const s=r;let d="";const{t:o}=ge(),p=_e("image"),M=Fe(),c=We(),Y=k(),x=k(!1),N=k(!0),O=k(!1),I=k(),f=k(),R=A&&"loading"in HTMLImageElement.prototype;let l,D;const oe=w(()=>[p.e("inner"),H.value&&p.e("preview"),N.value&&p.is("loading")]),j=w(()=>M.style),K=w(()=>{const{fit:t}=s;return A&&t?{objectFit:t}:{}}),H=w(()=>{const{previewSrcList:t}=s;return Array.isArray(t)&&t.length>0}),le=w(()=>{const{previewSrcList:t,initialIndex:v}=s;let a=v;return v>t.length-1&&(a=0),a}),Z=w(()=>s.loading==="eager"?!1:!R&&s.loading==="lazy"||s.lazy),P=()=>{!A||(N.value=!0,x.value=!1,Y.value=s.src)};function X(t){N.value=!1,x.value=!1,m("load",t)}function re(t){N.value=!1,x.value=!0,m("error",t)}function q(){nt(I.value,f.value)&&(P(),G())}const J=Ue(q,200,!0);async function U(){var t;if(!A)return;await ye();const{scrollContainer:v}=s;Ke(v)?f.value=v:Ze(v)&&v!==""?f.value=(t=document.querySelector(v))!=null?t:void 0:I.value&&(f.value=qe(I.value)),f.value&&(l=V(f,"scroll",J),setTimeout(()=>q(),100))}function G(){!A||!f.value||!J||(l==null||l(),f.value=void 0)}function Q(t){if(!!t.ctrlKey){if(t.deltaY<0)return t.preventDefault(),!1;if(t.deltaY>0)return t.preventDefault(),!1}}function ee(){!H.value||(D=V("wheel",Q,{passive:!1}),d=document.body.style.overflow,document.body.style.overflow="hidden",O.value=!0,m("show"))}function F(){D==null||D(),document.body.style.overflow=d,O.value=!1,m("close")}function te(t){m("switch",t)}return ue(()=>s.src,()=>{Z.value?(N.value=!0,x.value=!1,G(),U()):P()}),we(()=>{Z.value?U():P()}),(t,v)=>(b(),E("div",{ref_key:"container",ref:I,class:g([e(p).b(),t.$attrs.class]),style:fe(e(j))},[x.value?ae(t.$slots,"error",{key:0},()=>[h("div",{class:g(e(p).e("error"))},Je(e(o)("el.image.error")),3)]):(b(),E(ne,{key:1},[Y.value!==void 0?(b(),E("img",je({key:0},e(c),{src:Y.value,loading:t.loading,style:e(K),class:e(oe),crossorigin:t.crossorigin,onClick:ee,onLoad:X,onError:re}),null,16,mt)):S("v-if",!0),N.value?(b(),E("div",{key:1,class:g(e(p).e("wrapper"))},[ae(t.$slots,"placeholder",{},()=>[h("div",{class:g(e(p).e("placeholder"))},null,2)])],2)):S("v-if",!0)],64)),e(H)?(b(),E(ne,{key:2},[O.value?(b(),de(e(dt),{key:0,"z-index":t.zIndex,"initial-index":e(le),infinite:t.infinite,"zoom-rate":t.zoomRate,"min-scale":t.minScale,"max-scale":t.maxScale,"url-list":t.previewSrcList,"hide-on-click-modal":t.hideOnClickModal,teleported:t.previewTeleported,"close-on-press-escape":t.closeOnPressEscape,onClose:F,onSwitch:te},{default:y(()=>[t.$slots.viewer?(b(),E("div",pt,[ae(t.$slots,"viewer")])):S("v-if",!0)]),_:3},8,["z-index","initial-index","infinite","zoom-rate","min-scale","max-scale","url-list","hide-on-click-modal","teleported","close-on-press-escape"])):S("v-if",!0)],64)):S("v-if",!0)],6))}});var yt=be(_t,[["__file","image.vue"]]);const wt=he(yt);const bt={class:"page-404-content"},ht={__name:"index",setup(r){const m=()=>{et.goHome()};return(s,d)=>{const o=wt,p=Ge,M=ke;return b(),E("div",bt,[u(M,{title:"\u9875\u9762\u4E22\u5931","sub-title":"\u554A\u6B27\uFF0C\u9875\u9762\u88AB\u706B\u661F\u4EBA\u5077\u8D70\u5566~~~"},{icon:y(()=>[u(o,{class:"img-content",src:"/src/assets/imgs/404.png"})]),extra:y(()=>[u(p,{type:"primary",onClick:m},{default:y(()=>[Qe("Back")]),_:1})]),_:1})])}}},Et=tt(ht,[["__scopeId","data-v-26e29878"]]);export{Et as default};
