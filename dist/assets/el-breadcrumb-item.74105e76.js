import{b as _,af as C,d as c,ah as E,u as y,r as v,a3 as P,Z as S,o,g as p,j as B,n,a as e,_ as k,q as $,a4 as j,C as w,f,w as x,E as N,F as q,t as A,aj as D,p as K,ao as T}from"./index.997f7450.js";const I=Symbol("breadcrumbKey"),z=_({separator:{type:String,default:"/"},separatorIcon:{type:C}}),F=["aria-label"],L=c({name:"ElBreadcrumb"}),M=c({...L,props:z,setup(l){const t=l,{t:u}=E(),s=y("breadcrumb"),r=v();return P(I,t),S(()=>{const a=r.value.querySelectorAll(`.${s.e("item")}`);a.length&&a[a.length-1].setAttribute("aria-current","page")}),(a,i)=>(o(),p("div",{ref_key:"breadcrumb",ref:r,class:n(e(s).b()),"aria-label":e(u)("el.breadcrumb.label"),role:"navigation"},[B(a.$slots,"default")],10,F))}});var O=k(M,[["__file","breadcrumb.vue"]]);const V=_({to:{type:$([String,Object]),default:""},replace:{type:Boolean,default:!1}}),Z=c({name:"ElBreadcrumbItem"}),G=c({...Z,props:V,setup(l){const t=l,u=D(),s=j(I,void 0),r=y("breadcrumb"),a=u.appContext.config.globalProperties.$router,i=v(),h=()=>{!t.to||!a||(t.replace?a.replace(t.to):a.push(t.to))};return(b,H)=>{var m,d;return o(),p("span",{class:n(e(r).e("item"))},[w("span",{ref_key:"link",ref:i,class:n([e(r).e("inner"),e(r).is("link",!!b.to)]),role:"link",onClick:h},[B(b.$slots,"default")],2),(m=e(s))!=null&&m.separatorIcon?(o(),f(e(q),{key:0,class:n(e(r).e("separator"))},{default:x(()=>[(o(),f(N(e(s).separatorIcon)))]),_:1},8,["class"])):(o(),p("span",{key:1,class:n(e(r).e("separator")),role:"presentation"},A((d=e(s))==null?void 0:d.separator),3))],2)}}});var g=k(G,[["__file","breadcrumb-item.vue"]]);const Q=K(O,{BreadcrumbItem:g}),R=T(g);export{R as E,Q as a};
