/* empty css                  */import{E as M,a as b,b as L,c as N}from"./el-col.d8e67cb9.js";import"./el-tooltip.f8f0cf31.js";import"./el-scrollbar.9146fd3f.js";import{E as U}from"./el-divider.92c34437.js";import{P as C}from"./index.e53153b6.js";import{Y as D,r as u,Z as F,o as v,g as h,M as s,C as a,t as g,w as i,ck as R,aD as x,am as Z,bZ as A,V as m,f as H,a0 as O,a1 as T}from"./index.dfea662d.js";import{_ as Y}from"./_plugin-vue_export-helper.cdc0426e.js";import"./index.4f64b5d7.js";import"./index.3f11df93.js";import"./el-input.8631e642.js";import"./index.c62f907d.js";const j=r=>(O("data-v-2914c409"),r=r(),T(),r),q={class:"pan-video-content"},z={class:"video-name-content"},G={class:"video-name"},J={class:"video-content"},K=["src"],Q={class:"video-list-content"},W=j(()=>a("i",{class:"fa fa-video-camera"},null,-1)),X={slot:"title"},$={__name:"index",setup(r){const f=D(),c=u(""),o=u([]),d=u(""),l=u("0"),E=t=>{o.value=new Array,t.forEach((e,n)=>{e.filename=e.filename.substring(0,e.filename.lastIndexOf(".")),e.filename.length>15&&(e.filename=e.filename.substring(0,16)+"..."),e.fileId===f.params.fileId&&(c.value=e.filename,d.value=m.getPreviewUrl(e.fileId)),o.value.push(e)}),l.value=f.params.fileId},y=()=>{let t="",e=l.value;if(o.value.some((_,p)=>{if(_.fileId===e)return t=p,!0}),t===o.value.length-1)return;let n=o.value[++t];c.value=n.filename,d.value=m.getPreviewUrl(n.fileId),l.value=n.fileId},w=t=>{l.value=t,o.value.some(e=>{if(e.fileId===t)return c.value=e.filename,d.value=m.getPreviewUrl(e.fileId),!0})},S=()=>{document.getElementById("r_pan_video_player").addEventListener("ended",()=>{y()},!1)},P=()=>{R.list({parentId:f.params.parentId,fileTypes:"9"},function(t){t.code===0?(E(t.data),S()):x.error(t.message)},function(t){x.error(t)})};return F(()=>{P()}),(t,e)=>{const n=U,_=M,p=b,V=L,k=N;return v(),h("div",null,[s(C),a("div",q,[a("div",z,[a("p",G,g(c.value),1)]),s(n),s(k,null,{default:i(()=>[s(_,{span:18},{default:i(()=>[a("div",J,[a("video",{id:"r_pan_video_player",src:d.value,autoplay:"true",controls:"true"},null,8,K)])]),_:1}),s(_,{span:6},{default:i(()=>[a("div",Q,[s(V,{class:"video-list","default-active":l.value,onSelect:w},{default:i(()=>[(v(!0),h(Z,null,A(o.value,(I,B)=>(v(),H(p,{key:B,index:I.fileId},{default:i(()=>[W,a("span",X,g(I.filename),1)]),_:2},1032,["index"]))),128))]),_:1},8,["default-active"])])]),_:1})]),_:1})])])}}},ue=Y($,[["__scopeId","data-v-2914c409"]]);export{ue as default};