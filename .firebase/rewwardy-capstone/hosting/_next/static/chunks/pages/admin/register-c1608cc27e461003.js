(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[689],{5819:function(e,a,t){"use strict";t.d(a,{Z:function(){return Z}});var n=t(3366),r=t(7462),s=t(7294),i=t(512),o=t(4780),l=t(1796),d=t(1496),c=t(7623),u=t(9773),m=t(7739),p=t(8974),b=t(1705),h=t(1588);let g=(0,h.Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]),x=(0,h.Z)("MuiListItemIcon",["root","alignItemsFlexStart"]),v=(0,h.Z)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);var f=t(4867);function getMenuItemUtilityClass(e){return(0,f.Z)("MuiMenuItem",e)}let j=(0,h.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var y=t(5893);let _=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],useUtilityClasses=e=>{let{disabled:a,dense:t,divider:n,disableGutters:s,selected:i,classes:l}=e,d=(0,o.Z)({root:["root",t&&"dense",a&&"disabled",!s&&"gutters",n&&"divider",i&&"selected"]},getMenuItemUtilityClass,l);return(0,r.Z)({},l,d)},C=(0,d.ZP)(m.Z,{shouldForwardProp:e=>(0,d.FO)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,a)=>{let{ownerState:t}=e;return[a.root,t.dense&&a.dense,t.divider&&a.divider,!t.disableGutters&&a.gutters]}})(({theme:e,ownerState:a})=>(0,r.Z)({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!a.disableGutters&&{paddingLeft:16,paddingRight:16},a.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${j.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,l.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${j.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,l.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${j.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,l.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,l.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${j.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${j.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${g.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${g.inset}`]:{marginLeft:52},[`& .${v.root}`]:{marginTop:0,marginBottom:0},[`& .${v.inset}`]:{paddingLeft:36},[`& .${x.root}`]:{minWidth:36}},!a.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},a.dense&&(0,r.Z)({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${x.root} svg`]:{fontSize:"1.25rem"}}))),w=s.forwardRef(function(e,a){let t;let o=(0,c.Z)({props:e,name:"MuiMenuItem"}),{autoFocus:l=!1,component:d="li",dense:m=!1,divider:h=!1,disableGutters:g=!1,focusVisibleClassName:x,role:v="menuitem",tabIndex:f,className:j}=o,w=(0,n.Z)(o,_),Z=s.useContext(u.Z),I=s.useMemo(()=>({dense:m||Z.dense||!1,disableGutters:g}),[Z.dense,m,g]),M=s.useRef(null);(0,p.Z)(()=>{l&&M.current&&M.current.focus()},[l]);let N=(0,r.Z)({},o,{dense:I.dense,divider:h,disableGutters:g}),B=useUtilityClasses(o),S=(0,b.Z)(M,a);return o.disabled||(t=void 0!==f?f:-1),(0,y.jsx)(u.Z.Provider,{value:I,children:(0,y.jsx)(C,(0,r.Z)({ref:S,role:v,tabIndex:t,component:d,focusVisibleClassName:(0,i.Z)(B.focusVisible,x),className:(0,i.Z)(B.root,j)},w,{ownerState:N,classes:B}))})});var Z=w},4327:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/register",function(){return t(7823)}])},6577:function(e,a,t){"use strict";var n=t(5893),r=t(2403),s=t.n(r),i=t(1664),o=t.n(i),l=t(6281);let HamburgerIcon=()=>(0,n.jsx)("div",{className:"p-1/2",children:(0,n.jsx)("svg",{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",viewBox:"0 0 24 24",stroke:"white",children:(0,n.jsx)("path",{d:"M4 6h16M4 12h16M4 18h16"})})});a.Z=()=>(0,n.jsx)("div",{className:s().shapingBar,children:(0,n.jsx)(l.slide,{customBurgerIcon:(0,n.jsx)(HamburgerIcon,{}),width:"auto",className:s().burgermenubar,children:(0,n.jsxs)("div",{className:s().listOfItems,children:[(0,n.jsx)(o(),{href:"/dashboard",className:s().menuItems,children:"Home"}),(0,n.jsx)(o(),{href:"/reward",className:s().menuItems,children:"Rewards"}),(0,n.jsx)(o(),{href:"/challenge",className:s().menuItems,children:"Challenges"}),(0,n.jsx)(o(),{href:"/scanner",className:s().menuItems,children:"QR Scanner"})]})})})},6253:function(e,a,t){"use strict";t.d(a,{dc:function(){return AdminFooter_Footer},$_:function(){return Footer},lK:function(){return ButtonAppBar}});var n=t(5893),r=t(3111),s=t.n(r);function Footer(){return(0,n.jsx)("div",{className:s().bottombar,children:(0,n.jsx)("div",{className:s().row,children:(0,n.jsx)("p",{children:"Rewwardy 2023"})})})}function AdminFooter_Footer(){return(0,n.jsx)("div",{className:s().adminbottombar,children:(0,n.jsx)("div",{className:s().adminrow,children:(0,n.jsx)("p",{children:"Rewwardy 2023"})})})}t(6577);var i=t(7294),o=t(2293),l=t(7357),d=t(155),c=t(5861),u=t(326),m=t(1261);function ButtonAppBar(){let[e,a]=(0,i.useState)(!1);return(0,n.jsx)(l.Z,{sx:{flexGrow:1},children:(0,n.jsx)(o.Z,{position:"static",sx:{bgcolor:"#fff",color:"#552CB4"},children:(0,n.jsxs)(d.Z,{children:[(0,n.jsx)(c.Z,{variant:"h6",component:"div",sx:{flexGrow:1},children:"Dashboard"}),(0,n.jsxs)(u.Z,{open:e,onClose:()=>a(!1),MenuListProps:{"aria-labelledby":"basic-button"},children:[(0,n.jsx)(m.MenuItem,{children:"Create Reward"}),(0,n.jsx)(m.MenuItem,{children:"Manage Rewards"}),(0,n.jsx)(m.MenuItem,{children:"Logout"})]})]})})})}},6740:function(e,a,t){"use strict";t.d(a,{db:function(){return o}});var n=t(3977);t(8887);var r=t(9828),s=t(1259);let i=(0,n.ZF)({apiKey:"AIzaSyAN9uJ18yZMHR0qYDM-_-VIewa0xZ2XnVE",authDomain:"rewwardy-capstone.firebaseapp.com",projectId:"rewwardy-capstone",storageBucket:"rewwardy-capstone.appspot.com",messagingSenderId:"859664818673",appId:"1:859664818673:web:788f4abfd6b5b211d32450",measurementId:"G-XH5DP210M6"});(0,s.v0)(i);let o=(0,r.ad)(i)},7823:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return AdminLogin}});var n=t(5893),r=t(7593),s=t.n(r),i=t(9008),o=t.n(i),l=t(282),d=t.n(l);t(1664);var c=t(6253),u=t(1163),m=t(7294),p=t(1903),b=t(4054),h=t(3340),g=t(3322),x=t(5819),v=t(9417),f=t(6740),j=t(9828),y=t(1259);let _=["Adjuntas","Aguada","Aguadilla","Aguas Buenas","Aibonito","A\xf1asco","Arecibo","Arroyo","Barceloneta","Barranquitas","Bayam\xf3n","Cabo Rojo","Caguas","Camuy","Can\xf3vanas","Cata\xf1o","Cayey","Ceiba","Ciales","Cidra","Coamo","Comer\xedo","Corozal","Culebra","Dorado","Fajardo","Florida","Gu\xe1nica","Guayama","Guayanilla","Guaynabo","Gurabo","Hatillo","Hormigueros","Humacao","Isabela","Jayuya","Juana D\xedaz","Juncos","Lajas","Lares","Las Mar\xedas","Las Piedras","Lo\xedza","Luquillo","Manat\xed","Maricao","Maunabo","Mayag\xfcez","Moca","Morovis","Naguabo","Naranjito","Orocovis","Patillas","Pe\xf1uelas","Ponce","Quebradillas","Rinc\xf3n","R\xedo Grande","Sabana Grande","Salinas","San Germ\xe1n","San Juan","San Lorenzo","San Sebasti\xe1n","Santa Isabel","Toa Alta","Toa Baja","Trujillo Alto","Utuado","Vega Alta","Vega Baja","Vieques","Villalba","Yabucoa","Yauco"];function AdminLogin(){let e=(0,u.useRouter)(),[a,t]=(0,m.useState)(""),[r,i]=(0,m.useState)(""),[l,C]=(0,m.useState)(""),[w,Z]=(0,m.useState)(""),[I,M]=(0,m.useState)(""),[N,B]=(0,m.useState)(""),[S,A]=(0,m.useState)(""),[F,R]=(0,m.useState)(""),createBusinessAccount=async()=>{let t=(0,y.v0)();await (0,y.Xb)(t,l,N).then(async t=>{let n=t.user;await (0,j.ET)((0,j.hJ)(f.db,"business"),{businessName:I,rewards:[],owner:n.uid,dateCreated:new Date}).then(async t=>await (0,j.ET)((0,j.hJ)(f.db,"users"),{firstName:a,lastName:r,authId:n.uid,email:l,role:"OWNER",dateCreated:new Date}).then(a=>e.push("/admin")).catch(e=>alert(e.message))).catch(e=>alert(e.message)),console.log(n)}).catch(e=>{e.code,e.message,alert(e.message)})};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(o(),{children:[(0,n.jsx)("title",{children:"Rewwardy: Admin Register"}),(0,n.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,n.jsx)("link",{rel:"icon",href:"/Images/Rewwardy-Icon.png"})]}),(0,n.jsxs)("main",{className:"".concat(d().main," ").concat(s().className),children:[(0,n.jsx)("h2",{className:d().header,children:"Create Business Account"}),(0,n.jsxs)("div",{className:d().form,children:[(0,n.jsx)("br",{}),(0,n.jsx)("h2",{children:"Admin User Info"}),(0,n.jsx)(p.Z,{id:"standard-basic",label:"First Name",variant:"standard",value:a,onChange:e=>t(e.target.value)}),(0,n.jsx)("br",{}),(0,n.jsx)(p.Z,{id:"standard-basic",label:"Last Name",variant:"standard",value:r,onChange:e=>i(e.target.value)}),(0,n.jsx)("br",{}),(0,n.jsx)(p.Z,{id:"standard-basic",label:"Email",variant:"standard",value:l,onChange:e=>C(e.target.value)}),(0,n.jsx)("br",{}),(0,n.jsx)(p.Z,{id:"standard-basic",label:"Phone",variant:"standard",value:w,onChange:e=>Z(e.target.value)}),(0,n.jsx)("br",{}),(0,n.jsx)(p.Z,{id:"standard-basic",label:"Password",variant:"standard",type:"password",value:N,onChange:e=>B(e.target.value)}),(0,n.jsx)("br",{}),(0,n.jsx)("h2",{children:"Business Info"}),(0,n.jsx)(p.Z,{id:"standard-basic",label:"Business Name",variant:"standard",value:I,onChange:e=>M(e.target.value)}),(0,n.jsx)("br",{}),(0,n.jsxs)(b.Z,{fullWidth:!0,children:[(0,n.jsx)(h.Z,{id:"demo-simple-select-label",children:"Business Type"}),(0,n.jsxs)(g.Z,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:S,label:"businessType",onChange:e=>A(e.target.value),children:[(0,n.jsx)(x.Z,{value:"COFFEE_SHOP",children:"Coffee Shop"}),(0,n.jsx)(x.Z,{value:"RESTAURANT",children:"Restaurant"}),(0,n.jsx)(x.Z,{value:"BAR",children:"Bar"})]})]})," ",(0,n.jsx)("br",{}),(0,n.jsxs)(b.Z,{fullWidth:!0,children:[(0,n.jsx)(h.Z,{id:"demo-simple-select-label",children:"Municipality"}),(0,n.jsx)(g.Z,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:F,label:"municipality",onChange:e=>R(e.target.value),children:null==_?void 0:_.map((e,a)=>(0,n.jsx)(x.Z,{value:"".concat(e),children:e},a))})]}),(0,n.jsx)("br",{}),(0,n.jsx)(v.Z,{variant:"contained",className:d().btn,onClick:()=>createBusinessAccount(),children:"Create Account"})]})]}),(0,n.jsx)(c.dc,{})]})}},7593:function(e){e.exports={style:{fontFamily:"'__Inter_e66fe9', '__Inter_Fallback_e66fe9'",fontStyle:"normal"},className:"__className_e66fe9"}},282:function(e){e.exports={main:"register_main__GSfdf",header:"register_header__Sfx_1",form:"register_form__yrZ4k",btn:"register_btn__aEDcO"}},3111:function(e){e.exports={bottombar:"Footer_bottombar__ng1M0",adminbottombar:"Footer_adminbottombar__BcUZc"}},2403:function(e){e.exports={burgerbutton:"HamburgerMenu_burgerbutton__YC7K9",menuItems:"HamburgerMenu_menuItems__p0Ha4",burgermenubar:"HamburgerMenu_burgermenubar__4nzBo",shapingBar:"HamburgerMenu_shapingBar__LIYNM",listOfItems:"HamburgerMenu_listOfItems___fJjr"}}},function(e){e.O(0,[663,16,737,22,417,903,719,774,888,179],function(){return e(e.s=4327)}),_N_E=e.O()}]);