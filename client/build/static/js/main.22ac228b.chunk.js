(this["webpackJsonpmy-react"]=this["webpackJsonpmy-react"]||[]).push([[0],{107:function(e,t,a){e.exports=a.p+"static/media/chat.77ff7adb.png"},116:function(e,t,a){e.exports=a.p+"static/media/f1.ac70137d.png"},117:function(e,t,a){e.exports=a.p+"static/media/f2.536d31bc.png"},118:function(e,t,a){e.exports=a.p+"static/media/f3.6751975b.png"},119:function(e,t,a){e.exports=a.p+"static/media/f4.3322bc49.png"},132:function(e,t,a){e.exports=a(178)},137:function(e,t,a){},178:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(12),l=a.n(c),o=(a(137),a(10)),i=a(54),s=a(55),m=a(220),u=a(33),d=a.n(u),g=a(45),b=Object(n.createContext)(),p=a(223),E=a(225),f=a(226),h=a(179),v=a(251),j=a(227),x=a(229),y=a(25),k=a(103),O=a.n(k),S=a(35),N=a.n(S),w=a(99),C=a.n(w),I=Object(m.a)((function(e){return{background:{backgroundColor:e.palette.background.default},logo:{maxHeight:"3rem"},link:{marginLeft:"auto"},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]},noDecoration:{textDecoration:"none !important"}}})),z=function(e){var t=e.setOpenLogin,a=I(),c=Object(n.useContext)(b),l=c.loginEl,o=c.setLoginEl,i=c.auth,s=c.setAuth,m=function(){o(null)},u=Boolean(l),d=u?"simple-popover":void 0;return r.a.createElement(p.a,{position:"fixed",title:"Hi",className:a.background},r.a.createElement(E.a,null,r.a.createElement(f.a,{edge:"start",color:"default","aria-label":"menu"},r.a.createElement(O.a,null)),r.a.createElement(y.b,{to:"/"},r.a.createElement(h.a,null,r.a.createElement("img",{className:a.logo,src:C.a}))),r.a.createElement("div",{className:a.link},r.a.createElement(h.a,{className:a.link,onClick:function(e){o(e.currentTarget)}},r.a.createElement(v.a,null)),r.a.createElement(j.a,{id:d,open:u,anchorEl:l,onClose:m,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"}},r.a.createElement(x.a,{orientation:"horizontal","aria-label":"vertical contained primary button group",variant:"text"},i?r.a.createElement(h.a,{onClick:function(){s(!1),N.a.remove("user"),m()},size:"large"},"Logout"):r.a.createElement("div",null,r.a.createElement(h.a,{onClick:function(){t(!0)},size:"large"},"Login"),r.a.createElement(y.b,{className:a.noDecoration,to:"/signup",onClick:m},r.a.createElement(h.a,{size:"large"},"Sign Up"))))))))},W=Object(m.a)((function(e){return{paper:{maxWidth:"100%",marginTop:e.spacing(10)}}})),D=function(){var e=W(),t=Object(n.useContext)(b),a=t.auth,c=t.setAuth,l=t.userInfo;if(l){var o=l.firstName,i=l.lastName,m=l.subjects;return r.a.createElement("div",null,r.a.createElement(z,{auth:a,setAuth:c}),r.a.createElement("div",null,r.a.createElement(s.a,{variant:"h1",className:e.paper},"Welcome to meetute! ",o," ",i,r.a.createElement("br",null),"subjects:"),m.map((function(e){return r.a.createElement(s.a,{variant:"h1"},e)}))))}return r.a.createElement(z,{auth:a,setAuth:c})},L=a(27),T=a(250),A=a(236),H=a(70),P=a(180),R=a(230),q=a(231),F=a(234),B=a(248),M=a(235),U=a(246),J=function(e){var t=e.label,a=e.required,n=e.variant,c=e.setState,l=e.type,o=e.error,i="filled";return null!=n&&(i="variant"),r.a.createElement(U.a,{variant:i,margin:"normal",required:a,fullWidth:!0,id:t,label:t,autoComplete:t,type:l,onChange:function(e){c(e.target.value)},error:""!==o})},V=a(232),G=a(233),$=Object(m.a)((function(e){return{paper:{display:"flex",flexDirection:"column",alignItems:"center",width:"90%",height:"90%"},error:{width:"85%",backgroundImage:"linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%)",fontSize:"30%"},avatar:{width:e.spacing(10),height:e.spacing(10)},form:{marginTop:e.spacing(3)},submit:{margin:e.spacing(2,0,0)},lowerCase:{textTransform:"none",flexGrow:"1"},text:{fontSize:"130%",fontWeight:"500",margin:"auto"},cancel:{marginTop:e.spacing(1.4)},warn:{marginTop:e.spacing(.8)},close:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}}})),Y=function(e){var t=e.closeLoginWindow,a=$(),c=Object(n.useState)(""),l=Object(o.a)(c,2),i=l[0],s=l[1],m=Object(n.useState)(""),u=Object(o.a)(m,2),p=u[0],E=u[1],j=Object(n.useState)(""),x=Object(o.a)(j,2),y=x[0],k=x[1],O=Object(n.useContext)(b),S=O.setAuth,w=(O.setUserInfo,function(){var e=Object(g.a)(d.a.mark((function e(a){var n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),k(""),console.log(p+i),e.next=5,fetch("/api/users/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:i,password:p})});case 5:return n=e.sent,e.next=8,n.json();case 8:(r=e.sent).success?(S(!0),N.a.set("meetute",r.token),t()):(console.log(r),k(r.message));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());return r.a.createElement(H.a,{elevation:0,className:a.paper},r.a.createElement(v.a,{className:a.avatar,src:"http:/api/images/unimelb",shape:"square"}),""!==y?r.a.createElement(P.a,{in:!0},r.a.createElement(R.a,{className:a.error},r.a.createElement(q.a,{avatar:r.a.createElement(V.a,{className:a.warn}),action:r.a.createElement(f.a,{onClick:function(){k("")},size:"small",className:a.cancel},r.a.createElement(G.a,null)),title:r.a.createElement("p",{className:a.text},y)}))):null,r.a.createElement("form",{className:a.form,onSubmit:w},r.a.createElement(J,{label:"Email",setState:s,required:!0,error:y}),r.a.createElement(J,{label:"Password",setState:E,required:!0,type:"password",error:y}),r.a.createElement(F.a,{control:r.a.createElement(B.a,{value:"remember",color:"primary"}),label:"Remember me"}),r.a.createElement(h.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:a.submit,size:"large"},"Login In")),r.a.createElement(M.a,null,r.a.createElement(h.a,{size:"small",className:a.lowerCase},"Forgot Password?"),r.a.createElement(h.a,{size:"small",color:"primary",className:a.lowerCase},"Don't have an account? Sign Up")),r.a.createElement("br",null),r.a.createElement("br",null))},K=Object(m.a)((function(e){return{root:{margin:"auto",maxWidth:e.spacing(55)},close:{marginTop:e.spacing(1)}}})),Q=function(e){var t=e.open,a=e.setOpenLogin,c=K(),l=Object(n.useContext)(b).setLoginEl,o=function(){a(!1),l(null)};return r.a.createElement(T.a,{onClose:o,"aria-labelledby":"customized-dialog-title",open:t,className:c.root},r.a.createElement(A.a,{container:!0,justify:"flex-end"},r.a.createElement(A.a,{item:!0,xs:2},r.a.createElement(f.a,{className:c.close,onClick:o},r.a.createElement(G.a,null)))),r.a.createElement(A.a,{container:!0,justify:"center"},r.a.createElement(Y,{closeLoginWindow:o})))},X=a(240),Z=a(249),_=a(43),ee=a(181),te=a(237),ae=a(238),ne=a(184),re=a(44),ce=a.n(re),le=a(2),oe=a(5),ie=Object(oe.a)(Object(_.a)({alternativeLabel:{top:22},line:{height:3,border:0,backgroundColor:"#eaeaf0",borderRadius:1},completed:{"& $line":{backgroundImage:"linear-gradient(to right, #47cc89 0%, #47cc89 100%)"}}},"line",{height:3,border:0,backgroundColor:"#eaeaf0",borderRadius:1}))(ee.a),se=Object(m.a)({root:{backgroundColor:"#ccc",zIndex:1,color:"#fff",width:50,height:50,display:"flex",borderRadius:"50%",justifyContent:"center",alignItems:"center"},active:{backgroundImage:"linear-gradient(to right, #47cc89 0%, #47cc89 100%)",boxShadow:"0 4px 10px 0 rgba(0,0,0,.25)"},completed:{backgroundImage:"linear-gradient(to right, #47cc89 0%, #47cc89 100%)"}});function me(e){var t,a=se(),n=e.active,c=e.completed,l={1:r.a.createElement(ce.a,null),2:r.a.createElement(ce.a,null),3:r.a.createElement(ce.a,null),4:r.a.createElement(ce.a,null),5:r.a.createElement(ce.a,null)};return r.a.createElement("div",{className:Object(le.a)(a.root,(t={},Object(_.a)(t,a.active,n),Object(_.a)(t,a.completed,c),t))},l[String(e.icon)])}var ue=Object(m.a)((function(e){return{root:{background:e.background}}})),de=function(e){var t=e.activeStep,a=e.getSteps,n=ue(),c=a();return r.a.createElement(P.a,{in:!0},r.a.createElement(te.a,{connector:r.a.createElement(ie,null),alternativeLabel:!0,activeStep:t,className:n.root},c.map((function(e,t){return r.a.createElement(ae.a,{key:e},r.a.createElement(ne.a,{StepIconComponent:me},e))}))))},ge=a(239),be=a(247),pe=a(106),Ee=a.n(pe),fe=a(84),he=a.n(fe),ve=a(252),je=["COMP30023","INFO30005","TEST10000","TEST10002"],xe=function(e){var t=e.setSubjects;return r.a.createElement("div",null,r.a.createElement(be.a,{multiple:!0,id:"size-small-filled-multi",size:"small",options:je,getOptionLabel:function(e){return e},defaultValue:[je[1]],renderTags:function(e,t){return e.map((function(e,a){return r.a.createElement(ve.a,Object.assign({variant:"outlined",label:e,size:"large"},t({index:a}),{color:"primary",variant:"default"}))}))},onChange:function(e,a){return t(a)},renderInput:function(e){return r.a.createElement(U.a,Object.assign({},e,{variant:"filled",label:"Subjects"}))}}))},ye=Object(m.a)((function(e){return{paper:{background:e.background},buttons:{marginTop:e.spacing(2)},staff:{minHeight:"4rem",background:"linear-gradient(to right, #f7985d 0%, #f7985d 100%)",borderRadius:30},student:{minHeight:"4rem",background:"linear-gradient(to right, #f7985d 0%, #f7985d 100%)",borderRadius:30},largeIcon:{width:30,height:30},noDecoration:{textDecoration:"none !important"}}})),ke=function(e){var t=ye(),a=e.activeStep,n=e.handleNext,c=e.handleBack,l=e.text,o=e.cardID,i=e.handleReset,m=e.handleSubmit,u=e.setEmail,d=e.setFirstName,g=e.setLasName,b=e.setPassword,p=e.setConformPassword,E=e.status,f=e.setSubjects;console.log("Error! email cannot be blank"===E);return r.a.createElement("div",null,r.a.createElement(ge.a,{in:a===o},r.a.createElement(H.a,{variant:"elevation",elevation:0,className:t.paper},r.a.createElement(X.a,{maxWidth:"md"},r.a.createElement(s.a,{align:"center",variant:"h5"},l,r.a.createElement("br",null),r.a.createElement("br",null)),r.a.createElement(X.a,{className:t.buttons,maxWidth:"sm"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault()}},function(e){switch(e){case 0:return r.a.createElement(be.a,{id:"combo-box-demo",options:["Student","Staff"],defaultValue:"Student",getOptionLabel:function(e){return e},renderInput:function(e){return r.a.createElement(U.a,Object.assign({},e,{label:"I'm a",variant:"filled",required:!0}))}});case 2:return r.a.createElement(J,{label:"Please Enter your Email",setState:u,required:!0,type:"email",error:"Error! email cannot be blank"===E?E:""});case 3:return r.a.createElement("div",null,r.a.createElement(J,{label:"Set Password",setState:b,required:!0,type:"password",error:"Error! password cannot be blank"===E?E:""}),r.a.createElement(J,{label:"Confirm Password",setState:p,required:!0,type:"password",error:"Error! password cannot be blank"===E?E:""}));case 4:return r.a.createElement(xe,{setSubjects:f});case 1:return r.a.createElement("div",null,r.a.createElement(J,{label:"First Name",setState:d,required:!0,error:"Error! FirstName cannot be blank"===E?E:""}),r.a.createElement(J,{label:"Last Name",setState:g,required:!0,error:"Error! lastName cannot be blank"===E?E:""}));default:return null}}(o),r.a.createElement("br",null),function(e){switch(e){case 5:return r.a.createElement(A.a,{container:!0,justify:"space-between",alignItems:"center"},r.a.createElement(A.a,{item:!0,xs:12},r.a.createElement(y.b,{to:"/",className:t.noDecoration},r.a.createElement(h.a,{onClick:i,size:"large",fullWidth:!0,variant:"contained"},"Start your meetute Life!"))));case 4:return r.a.createElement(A.a,{container:!0,justify:"space-between",alignItems:"center"},r.a.createElement(A.a,{item:!0,xs:3},r.a.createElement(h.a,{disabled:0===e,onClick:c,size:"large",fullWidth:!0},r.a.createElement(he.a,null))),r.a.createElement(A.a,{item:!0,xs:3},r.a.createElement(h.a,{onClick:m,size:"large",fullWidth:!0},"Submit")));default:return r.a.createElement(A.a,{container:!0,justify:"space-between",alignItems:"center"},r.a.createElement(A.a,{item:!0,xs:3},r.a.createElement(h.a,{disabled:0===e,onClick:c,size:"large",fullWidth:!0},r.a.createElement(he.a,null))),r.a.createElement(A.a,{item:!0,xs:3},r.a.createElement(h.a,{onClick:n,size:"large",type:"submit",fullWidth:!0},r.a.createElement(Ee.a,null))))}}(o)))))))};function Oe(){return["User Type","Name","Email","Password","Subjects"]}var Se=[{text:"Sign up as...",cardID:0},{text:"What's your name?",cardID:1},{text:"Please enter your email:",cardID:2},{text:"Set your password:",cardID:3},{text:"Subjects you would like to pick?",cardID:4},{text:"We are all set! enjoy meeting tutors!",cardID:5}],Ne=Object(m.a)((function(e){return{root:{width:"100%",background:e.background},stepper:{background:e.background},button:{marginTop:e.spacing(1),marginRight:e.spacing(1)},actionsContainer:{marginBottom:e.spacing(2)},resetContainer:{padding:e.spacing(3)},paper:{minHeight:"50VH"}}})),we=function(){var e=Ne(),t=Object(n.useState)(""),a=Object(o.a)(t,2),c=a[0],l=a[1],i=Object(n.useState)(""),m=Object(o.a)(i,2),u=m[0],p=m[1],E=Object(n.useState)(""),f=Object(o.a)(E,2),h=f[0],v=f[1],j=Object(n.useState)(""),x=Object(o.a)(j,2),y=x[0],k=x[1],O=Object(n.useState)(""),S=Object(o.a)(O,2),w=S[0],C=S[1],I=Object(n.useState)(""),z=Object(o.a)(I,2),W=z[0],D=z[1],L=Object(n.useState)(["INFO30005"]),T=Object(o.a)(L,2),A=T[0],R=T[1],q=r.a.useState(0),F=Object(o.a)(q,2),B=F[0],M=F[1],U=function(){switch(B){case 1:if(""==u||""==h)return;break;case 2:if(""==c||!c.includes("@"))return;break;case 3:if(""==y||""==w)return;if(y!=w)return void D("Sorry password does not match")}M((function(e){return e+1}))},J=function(){M((function(e){return e-1}))},V=function(){return"success"==W?r.a.createElement(Z.a,{severity:"success"},"You are good to go!"):r.a.createElement(Z.a,{severity:"error",onClose:function(){D("")}},W)},G=Object(n.useContext)(b).setAuth,$=function(){var e=Object(g.a)(d.a.mark((function e(t){var a,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return D(""),console.log(y+c),e.next=4,fetch("/api/users/signup",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:c,password:y,firstName:u,lastName:h,subjects:A})});case 4:return a=e.sent,e.next=7,a.json();case 7:(n=e.sent).success?(D("success"),U(),G(!0),N.a.set("user","loginTrue")):(console.log(n),D(n.message),"Error! FirstName cannot be blank"===n.message&&M(1),"Error! LastName cannot be blank"===n.message&&M(1),"Error! email cannot be blank"===n.message&&M(2),"Error! password cannot be blank"===n.message&&M(3));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:e.root},r.a.createElement(s.a,{variant:"h1"},r.a.createElement("br",null)),r.a.createElement(de,{activeStep:B,getSteps:Oe}),r.a.createElement(X.a,{maxWidth:"md"},r.a.createElement(P.a,{in:""!=W},r.a.createElement(H.a,{elevation:0},r.a.createElement(V,null))),r.a.createElement("br",null)),r.a.createElement("div",null,Se.map((function(e){var t=e.title,a=e.text,n=e.cardID;return r.a.createElement(ke,{cardID:n,title:t,text:a,handleBack:J,handleNext:U,activeStep:B,setEmail:l,setFirstName:p,setLasName:v,setPassword:k,setConformPassword:C,status:W,setSubjects:R,handleSubmit:$})}))),r.a.createElement(s.a,{variant:"h1"},r.a.createElement("br",null)))};var Ce=Object(oe.a)({waves:{position:"relative",width:"100%",marginBottom:-7,height:"7vw",minHeight:"7vw"},"@keyframes moveForever":{from:{transform:"translate3d(-90px, 0, 0)"},to:{transform:"translate3d(85px, 0, 0)"}},parallax:{"& > use":{animation:"$moveForever 4s cubic-bezier(0.62, 0.5, 0.38, 0.5) infinite",animationDelay:function(e){return"-".concat(e.animationNegativeDelay,"s")}}}})((function(e){var t=String(Math.random()),a=e.className,n=e.lowerColor,c=e.upperColor,l=e.classes,o=(e.animationNegativeDelay,Object(i.a)(e,["className","lowerColor","upperColor","classes","animationNegativeDelay"]));return r.a.createElement("div",Object.assign({className:a,style:{background:c}},o),r.a.createElement("svg",{className:l.waves,xmlns:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink",viewBox:"0 24 150 28",preserveAspectRatio:"none",shapeRendering:"auto"},r.a.createElement("defs",null,r.a.createElement("path",{id:t,d:"M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"})),r.a.createElement("g",{className:l.parallax},r.a.createElement("use",{href:"#".concat(t),x:"48",y:"0",fill:n}))))})),Ie=Object(m.a)((function(e){return{c1:{background:e.background,width:"100WH"},c2:{background:e.palette.secondary.light,height:"30VH"}}})),ze=function(){var e=Ie(),t=Object(L.a)(),a=Object(n.useState)(!1),c=Object(o.a)(a,2),l=c[0],i=c[1];return r.a.createElement("div",null,r.a.createElement(z,{setOpenLogin:i}),r.a.createElement(Q,{open:l,setOpenLogin:i}),r.a.createElement("div",{className:e.c1},r.a.createElement(we,null)),r.a.createElement("div",{className:e.c2},r.a.createElement(Ce,{upperColor:t.background,lowerColor:t.palette.secondary.light,animationNegativeDelay:100})))},We=a(107),De=a.n(We),Le=a(108),Te=a.n(Le),Ae=a(109),He=a.n(Ae),Pe=Object(m.a)((function(e){return{image:{maxHeight:"70%",maxWidth:"100%"},root:{minHeight:"70%",background:e.background},images:{minHeight:"70%"},background:{background:e.background},title:{background:e.background},body:{color:"#595e53"},about:{minHeight:"4rem",background:"linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",borderRadius:30},getStarted:{minHeight:"4rem",background:"linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)",borderRadius:30},largeIcon:{width:30,height:30},noDecoration:{textDecoration:"none !important",fontSize:"",fontWeight:0,minWidth:"100%"}}})),Re=function(){var e=Pe();return r.a.createElement("div",{className:e.root},r.a.createElement(X.a,{fixed:!0},r.a.createElement(A.a,{container:!0,justify:"center",alignItems:"center",direction:"row"},r.a.createElement(A.a,{item:!0,xs:12,md:6},r.a.createElement(P.a,{in:!0,timeout:"auto"},r.a.createElement(A.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(s.a,{variant:"h2"},r.a.createElement("br",null),r.a.createElement("br",null)),r.a.createElement(A.a,{item:!0,xs:8},r.a.createElement(s.a,{variant:"h3",align:"center"},"Ask your questions today, for an easier life tomorrow.")),r.a.createElement(A.a,{item:!0,xs:8},r.a.createElement(s.a,{className:e.body,variant:"h5"},r.a.createElement("br",null),"MeeTute wants to make consultation and support services more accessible for students and more manageable for teaching staff.",r.a.createElement("br",null),r.a.createElement("br",null)),r.a.createElement(A.a,{container:!0,direction:"row",justify:"center",spacing:3},r.a.createElement(A.a,{item:!0,xs:6},r.a.createElement(A.a,{container:!0,justify:"center"},r.a.createElement(y.b,{to:"/signup",className:e.noDecoration},r.a.createElement(h.a,{fullWidth:!0,size:"large",className:e.getStarted,startIcon:r.a.createElement(Te.a,{className:e.largeIcon})},"get started")))),r.a.createElement(A.a,{item:!0,xs:6},r.a.createElement(A.a,{container:!0,justify:"center"},r.a.createElement(y.b,{to:"/signup",className:e.noDecoration},r.a.createElement(h.a,{fullWidth:!0,size:"large",className:e.about,startIcon:r.a.createElement(He.a,{className:e.largeIcon})},"about us"))))))))),r.a.createElement(A.a,{item:!0,xs:12,md:6},r.a.createElement(s.a,{variant:"h1"},r.a.createElement("br",null)),r.a.createElement(P.a,{in:!0},r.a.createElement(A.a,{container:!0,justify:"center",alignItems:"flex-end"},r.a.createElement("img",{src:De.a,className:e.image})))),r.a.createElement(A.a,{item:!0,xs:12},r.a.createElement(s.a,{variant:"h5"},r.a.createElement("br",null))))))},qe=a(110),Fe=a.n(qe),Be=a(111),Me=a(241),Ue=a(86),Je=a.n(Ue),Ve=a(85),Ge=a.n(Ve),$e=Object(m.a)((function(e){return{cover:{maxWidth:"100%"},card:{marginTop:e.spacing(3),backgroundColor:e.palette.secondary.light},text:{color:"#6984aa",fontWeight:500},headline:{color:"#33456b",fontWeight:900}}})),Ye=function(e){var t=Object(L.a)(),a=e.setActiveStep,n=e.activeStep,c=e.headline,l=e.text,o=e.maxSteps,i=e.image,m=$e();return r.a.createElement(A.a,{container:!0,justify:"center",alignItems:"center"},r.a.createElement(A.a,{item:!0,xs:1},r.a.createElement(A.a,{container:!0,justify:"center"},r.a.createElement(h.a,{size:"small",onClick:function(){a((function(e){return e-1}))},disabled:0===n,className:m.button},"rtl"===t.direction?r.a.createElement(Ge.a,null):r.a.createElement(Je.a,null)))),r.a.createElement(A.a,{item:!0,xs:8},r.a.createElement(H.a,{elevation:0,className:m.card},r.a.createElement(A.a,{container:!0,direction:"row",justify:"space-around",alignItems:"center"},r.a.createElement(A.a,{item:!0,xs:4},r.a.createElement(A.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement("img",{className:m.cover,src:i,alt:"Live from space album cover"}))),r.a.createElement(A.a,{item:!0,xs:6},r.a.createElement(Me.a,{className:m.content},r.a.createElement(s.a,{className:m.headline,variant:"h4"},c),r.a.createElement(s.a,{className:m.text,variant:"h5"},r.a.createElement("br",null),l)))))),r.a.createElement(A.a,{item:!0,xs:1},r.a.createElement(A.a,{container:!0,justify:"center"},r.a.createElement(h.a,{size:"small",onClick:function(){a((function(e){return e+1}))},disabled:n===o-1,className:m.button},"rtl"===t.direction?r.a.createElement(Je.a,null):r.a.createElement(Ge.a,null)))))},Ke=a(242),Qe=a(112),Xe=a.n(Qe),Ze=a(113),_e=a.n(Ze),et=a(114),tt=a.n(et),at=a(115),nt=a.n(at),rt=Object(oe.a)({alternativeLabel:{top:22},line:{height:3,border:0,backgroundColor:"#eaeaf0",borderRadius:1}})(ee.a),ct=Object(m.a)({root:{backgroundColor:"#ccc",zIndex:1,color:"#fff",width:50,height:50,display:"flex",borderRadius:"50%",justifyContent:"center",alignItems:"center"},active:{backgroundImage:"linear-gradient(to top, #0a6aab 0%, #0a6aab 100%)",boxShadow:"0 4px 10px 0 rgba(0,0,0,.25)"}});function lt(e){var t,a=ct(),n=e.active,c=e.completed,l={1:r.a.createElement(Xe.a,null),2:r.a.createElement(_e.a,null),3:r.a.createElement(tt.a,null),4:r.a.createElement(nt.a,null)};return r.a.createElement("div",{className:Object(le.a)(a.root,(t={},Object(_.a)(t,a.active,n),Object(_.a)(t,a.completed,c),t))},l[String(e.icon)])}var ot=Object(m.a)((function(e){return{root:{backgroundColor:e.palette.secondary.light,width:"60%",margin:"auto"}}})),it=function(e){var t=e.activeStep,a=e.setActiveStep,n=e.features,c=ot();return r.a.createElement(te.a,{alternativeLabel:!0,activeStep:t,connector:r.a.createElement(rt,null),className:c.root,nonLinear:!0},n.map((function(e,t){var n,l=e.headline;return r.a.createElement(ae.a,{key:l},r.a.createElement(Ke.a,{className:c.button,onClick:(n=t,function(){a(n)})},r.a.createElement(ne.a,{StepIconComponent:lt},l)))})))},st=a(116),mt=a.n(st),ut=a(117),dt=a.n(ut),gt=a(118),bt=a.n(gt),pt=a(119),Et=a.n(pt),ft=Object(Be.autoPlay)(Fe.a),ht=[{headline:"Consultation Booking System",text:"MeeTute makes it simple for students and teaching staff to schedule or book consultation appointments.",image:mt.a},{headline:"Scheduling Assistant",text:"Cannot make the consultation time? Don\u2019t worry, use our scheduling assistant to book one-on-one sessions.",image:dt.a},{headline:"Study Group Helper",text:"Connect with your peers in the same subject and develop better learning experiences.",image:bt.a},{headline:"User Analytics Tool",text:"MeeTute delivers beautiful visualisations for past consultation registration statistics, making it easier for teaching staff for future planning",image:Et.a}],vt=Object(m.a)((function(e){return{root:{backgroundColor:e.palette.secondary.light},headline:{color:"#05578e"}}})),jt=function(e){e.width;var t=vt(),a=Object(L.a)(),c=Object(n.useState)(0),l=Object(o.a)(c,2),i=l[0],m=l[1],u=ht.length;return r.a.createElement("div",{className:t.root},r.a.createElement(s.a,{className:t.headline,variant:"h3",align:"center"},r.a.createElement("br",null),"See how MeeTute can help you...",r.a.createElement("br",null),r.a.createElement("br",null)),r.a.createElement(it,{activeStep:i,setActiveStep:m,features:ht}),r.a.createElement(ft,{axis:"rtl"===a.direction?"x-reverse":"x",index:i,onChangeIndex:function(e){m(e)},enableMouseEvents:!0,className:t.swipe,interval:9e3},ht.map((function(e){return r.a.createElement(Ye,{key:e.headline,headline:e.headline,text:e.text,activeStep:i,setActiveStep:m,maxSteps:u,image:e.image})}))))},xt=Object(m.a)((function(e){return{c1:{backgroundColor:e.palette.secondary.light},c2:{backgroundColor:e.palette.primary.light}}})),yt=function(){var e=xt(),t=Object(L.a)(),a=r.a.useState(!1),n=Object(o.a)(a,2),c=n[0],l=n[1];return r.a.createElement("div",{className:e.root},r.a.createElement(z,{setOpenLogin:l}),r.a.createElement(Q,{open:c,setOpenLogin:l}),r.a.createElement(Re,null),r.a.createElement(Ce,{upperColor:t.background,lowerColor:t.palette.secondary.light,animationNegativeDelay:100}),r.a.createElement(jt,null),r.a.createElement(Ce,{upperColor:t.palette.secondary.light,lowerColor:t.palette.primary.light,animationNegativeDelay:100}),r.a.createElement("div",{className:e.c2},r.a.createElement(s.a,{variant:"subtitle1",align:"center"},"Copyright @ MeeTute 2020")))},kt=a(37),Ot=function(e){var t=e.component,a=Object(i.a)(e,["component"]),c=Object(n.useContext)(b).auth;return r.a.createElement(kt.b,Object.assign({},a,{render:function(){return c?r.a.createElement(t,null):r.a.createElement(kt.a,{to:"/"})}}))},St=function(e){var t=e.component,a=Object(i.a)(e,["component"]),c=Object(n.useContext)(b).auth;return console.log(t),r.a.createElement(kt.b,Object.assign({},a,{render:function(){return c?r.a.createElement(kt.a,{to:"/dashboard"}):r.a.createElement(t,null)}}))},Nt=function(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(null),i=Object(o.a)(l,2),s=i[0],m=i[1],u=Object(n.useState)(null),d=Object(o.a)(u,2),g=d[0],p=d[1];return Object(n.useEffect)((function(){N.a.get("meetute")&&c(!0)}),[]),r.a.createElement(b.Provider,{value:{userInfo:s,setUserInfo:m,auth:a,setAuth:c,loginEl:g,setLoginEl:p}},r.a.createElement(y.a,null,r.a.createElement(kt.d,null,r.a.createElement(St,{exact:!0,path:"/",component:yt}),r.a.createElement(Ot,{exact:!0,path:"/dashboard",component:D}),r.a.createElement(kt.b,{exact:!0,path:"/signup",component:ze}))))},wt=a(120),Ct=a(245),It=a(243),zt=a(244),Wt=Object(wt.a)({palette:{primary:{main:It.a[200],light:It.a[50],dark:It.a[800]},secondary:{main:zt.a.A200,light:zt.a[100],dark:zt.a[400]}},typography:{fontFamily:"sans-serif",h1:{fontWeight:900},h2:{fontWeight:700,fontStyle:"italic"},h3:{fontWeight:900},h4:{fontWeight:900,fontSize:30},h5:{fontWeight:500},subtitle1:{fontSize:12},button:{fontWeight:900,fontSize:"20px"}},shape:{},background:"linear-gradient(to right,#ffffff 0%, #b9e2fa 100%)"});l.a.render(r.a.createElement(Ct.a,{theme:Wt},r.a.createElement(Nt,null)),document.getElementById("root"))},99:function(e,t,a){e.exports=a.p+"static/media/logo.bcec5f9e.png"}},[[132,1,2]]]);
//# sourceMappingURL=main.22ac228b.chunk.js.map