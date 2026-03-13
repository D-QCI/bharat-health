import { useState } from "react";
import Head from "next/head";

const C={primary:"#0A2E52",pMid:"#1A4F7A",accent:"#E8702A",aLight:"#FF8C42",teal:"#007B8A",tealL:"#00A8BC",ok:"#1E7E44",okBg:"#E6F4EA",warn:"#C8830A",warnBg:"#FFF8E6",bad:"#C0392B",badBg:"#FDECEA",bg:"#F0F4F8",card:"#FFF",bdr:"#D8E3ED",txt:"#0D1B2A",sub:"#4A6174",mut:"#8A9BAE",wh:"#FFF",gold:"#D4A017",purp:"#5E35B1",purpBg:"#EDE7F6"};

const HOSPITALS=[
  {id:1,n:"Apollo Hospitals",c:"Chennai",t:"Gold",s:4.8,b:560,p:12400,sp:["Cardiology","Oncology","Neurology"],la:["English","Arabic","Russian"],desc:"India's foremost healthcare institution with JCI accreditation. Known for cardiac sciences, oncology, and organ transplantation. Serves patients from 120+ countries."},
  {id:2,n:"Fortis Healthcare",c:"Gurugram",t:"Silver",s:4.6,b:340,p:9800,sp:["Orthopedics","Cardiac Surgery","Urology"],la:["English","French","Bengali"],desc:"Multi-super specialty quaternary care hospital with internationally acclaimed doctors."},
  {id:3,n:"Medanta - The Medicity",c:"Gurugram",t:"Gold",s:4.9,b:1250,p:18200,sp:["Liver Transplant","Cardiac","Kidney Transplant"],la:["English","Arabic","Hindi"],desc:"Founded by Dr. Naresh Trehan. 1250+ beds and 45+ super-specialty departments."},
  {id:4,n:"AIIMS Delhi",c:"New Delhi",t:"Gold",s:4.7,b:2478,p:22000,sp:["Neurosurgery","Pediatrics","AYUSH"],la:["English","Hindi"],desc:"India's premier government medical institution for cutting-edge research and tertiary care."},
  {id:5,n:"Kokilaben Hospital",c:"Mumbai",t:"Gold",s:4.8,b:750,p:15600,sp:["Oncology","Robotic Surgery","BMT"],la:["English","Arabic","Gujarati"],desc:"Leading tertiary care facility known for oncology, robotic surgery, and bone marrow transplant."},
];
const MVTFS=[
  {id:1,n:"Wellness Bridge",c:"Mumbai",s:4.9,cs:5600,yr:2012,la:["English","Arabic","Urdu"],sp:["AYUSH","Wellness","Cardiac"]},
  {id:2,n:"IndiaHealth Connect",c:"New Delhi",s:4.7,cs:3400,yr:2015,la:["English","Arabic","Russian"],sp:["Cardiac","Oncology"]},
  {id:3,n:"MedJourney India",c:"Chennai",s:4.5,cs:2100,yr:2017,la:["English","French","Tamil"],sp:["Orthopedics","Transplant"]},
  {id:4,n:"CureIndia Partners",c:"Bengaluru",s:4.6,cs:1200,yr:2019,la:["English","Sinhala","Bangla"],sp:["Fertility","Neurology"]},
];
const PARTNERS=[
  {id:1,n:"Gulf Med Partners",co:"UAE",ty:"Overseas MVTF",pt:890,la:["Arabic","English"],v:true},
  {id:2,n:"AfroHealth Tourism",co:"Nigeria",ty:"Travel Agent",pt:340,la:["English","Yoruba"],v:true},
  {id:3,n:"Dr. Rajan Mehta",co:"Canada",ty:"Referring Doctor",pt:120,la:["English","Hindi"],v:true},
  {id:4,n:"SriLanka Med Tours",co:"Sri Lanka",ty:"Travel Agent",pt:560,la:["English","Sinhala"],v:true},
];
const GRIEVANCES=[
  {id:"GRV-2025-0891",d:"2024-11-12",ag:"Fortis Healthcare",st:"Resolved",sm:"Miscommunication on treatment cost estimate",rs:"Cost sheet corrected and re-issued"},
  {id:"GRV-2025-0674",d:"2024-10-03",ag:"IndiaHealth Connect",st:"In Progress",sm:"Delayed visa support documentation"},
  {id:"GRV-2025-1024",d:"2024-12-01",ag:"Recovery Haven",st:"Under Review",sm:"Accommodation standards not as described"},
];
const ONBOARD=[
  {id:"APP-0441",n:"MedLink Arabia",ty:"Overseas Partner",lo:"Saudi Arabia",d:"2025-01-05",st:"Pending"},
  {id:"APP-0442",n:"Nairobi Health Tours",ty:"Overseas Partner",lo:"Kenya",d:"2025-01-06",st:"Pending"},
  {id:"APP-0443",n:"HealthBridge India",ty:"Indian MVTF",lo:"Pune",d:"2025-01-07",st:"Under Review"},
  {id:"APP-0444",n:"Lotus Hospital",ty:"Hospital",lo:"Jaipur",d:"2025-01-08",st:"Pending"},
];
const REFERRALS=[
  {id:"REF-2025-000042",pa:"Ahmed Al-Rashid",co:"UAE",cn:"Triple vessel CAD requiring CABG",st:"Estimates Received",pr:"urgent",d:"2025-01-10",es:2},
  {id:"REF-2025-000039",pa:"Grace Okonkwo",co:"Nigeria",cn:"Stage 2 breast cancer evaluation",st:"Assigned to MVTF",pr:"normal",d:"2025-01-08",es:0},
  {id:"REF-2025-000035",pa:"Dinesh Perera",co:"Sri Lanka",cn:"Total hip replacement bilateral",st:"Completed",pr:"normal",d:"2024-12-20",es:3},
];
const MSGS=[
  {id:1,from:"Wellness Bridge",msg:"Shortlisted 3 hospitals for the cardiac case. Apollo and Medanta confirmed.",time:"2 min ago",unread:true},
  {id:2,from:"Apollo Hospitals",msg:"Treatment estimate for REF-2025-000042 submitted. All-inclusive.",time:"1 hr ago",unread:true},
  {id:3,from:"Gulf Med Partners",msg:"Patient documents uploaded. Please review at earliest convenience.",time:"3 hr ago",unread:false},
  {id:4,from:"QCI Admin",msg:"Accreditation renewal reminder: expiry in 60 days.",time:"1 day ago",unread:false},
];

function Badge({children,color,bg,dot}){return <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"3px 9px",borderRadius:999,background:bg||C.bg,fontSize:10,fontWeight:700,color:color||C.sub}}>{dot&&<span style={{width:5,height:5,borderRadius:"50%",background:color||C.sub}}/>}{children}</span>}
function Tier({t}){return t==="Gold"?<Badge color={C.warn} bg={C.warnBg} dot>NABH Gold</Badge>:<Badge color={C.mut} bg="#F0F4F8" dot>NABH Silver</Badge>}
function Status({s}){var m={"Resolved":[C.ok,C.okBg],"In Progress":[C.warn,C.warnBg],"Under Review":[C.purp,C.purpBg],"Pending":["#1565C0","#E3F2FD"],"Approved":[C.ok,C.okBg],"Estimates Received":[C.accent,"#FFF0E6"],"Assigned to MVTF":[C.purp,C.purpBg],"Completed":[C.ok,C.okBg]};var r=m[s]||[C.sub,C.bg];return <Badge color={r[0]} bg={r[1]}>{s}</Badge>}
function Stars({v,sz}){sz=sz||11;return <span style={{display:"flex",gap:1,alignItems:"center"}}>{[1,2,3,4,5].map(function(i){return <span key={i} style={{fontSize:sz,color:i<=Math.round(v)?C.gold:C.bdr}}>&#9733;</span>})}<span style={{fontSize:11,fontWeight:700,marginLeft:3}}>{v}</span></span>}
function Card({children,style,onClick}){return <div onClick={onClick} style={Object.assign({background:C.card,borderRadius:14,boxShadow:"0 2px 8px rgba(10,46,82,0.07)",padding:14,marginBottom:10,border:"1px solid "+C.bdr,cursor:onClick?"pointer":"default",transition:"all 0.15s"},style||{})}>{children}</div>}
function Stat({label,value,icon,sub,color}){return <div style={{flex:"1 1 calc(50% - 5px)",background:C.card,borderRadius:10,padding:"12px 10px",border:"1px solid "+C.bdr}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontSize:20,fontWeight:800,color:C.txt}}>{value}</div><div style={{fontSize:10,color:C.mut,marginTop:1}}>{label}</div>{sub&&<div style={{fontSize:9,color:color||C.ok,marginTop:2,fontWeight:600}}>{sub}</div>}</div><div style={{width:32,height:32,borderRadius:8,background:(color||C.teal)+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{icon}</div></div></div>}
function Btn({children,color,bg,full,sm,onClick,style:s2}){return <button onClick={onClick} style={Object.assign({padding:sm?"7px 12px":"11px 18px",borderRadius:12,background:bg||C.accent,color:color||C.wh,fontWeight:700,fontSize:sm?11:13,border:"none",cursor:"pointer",width:full?"100%":undefined,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,boxShadow:"0 2px 8px "+(bg||C.accent)+"44",transition:"all 0.12s"},s2||{})}>{children}</button>}
function Search({value,onChange,placeholder}){return <div style={{position:"relative",marginBottom:10}}><span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",fontSize:14,color:C.mut}}>&#128269;</span><input value={value} onChange={function(e){onChange(e.target.value)}} placeholder={placeholder} style={{width:"100%",padding:"9px 12px 9px 34px",borderRadius:10,border:"1.5px solid "+C.bdr,background:C.card,fontSize:13,color:C.txt,outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/></div>}
function Sec({title,sub,action,onAction}){return <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}><div><div style={{fontSize:16,fontWeight:800,color:C.txt}}>{title}</div>{sub&&<div style={{fontSize:11,color:C.mut,marginTop:1}}>{sub}</div>}</div>{action&&<button onClick={onAction} style={{fontSize:11,color:C.accent,fontWeight:700,border:"none",background:"none",cursor:"pointer"}}>{action}</button>}</div>}

function Splash({onLogin}){
  var s=useState("splash"),step=s[0],setStep=s[1];
  var r=useState(""),role=r[0],setRole=r[1];
  var l=useState(false),ld=l[0],setLd=l[1];
  var roles=[{id:"overseas",l:"Overseas Partner",i:"\uD83C\uDF0D",d:"Travel agents, overseas MVTFs, referring doctors",cl:C.tealL},{id:"mvtf",l:"Indian MVTF",i:"\uD83E\uDD1D",d:"NABH-certified Indian facilitators",cl:C.pMid},{id:"hospital",l:"Hospital",i:"\uD83C\uDFE5",d:"NABH-accredited hospitals",cl:C.ok},{id:"admin",l:"QCI / NABH Admin",i:"\uD83D\uDEE1\uFE0F",d:"Platform governance & oversight",cl:C.accent}];
  var go=function(){setLd(true);setTimeout(function(){setLd(false);onLogin(role||"overseas")},800)};

  if(step==="splash") return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:"linear-gradient(160deg,#071E38 0%,"+C.primary+" 50%,"+C.pMid+" 100%)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-80,right:-80,width:260,height:260,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.06)"}}/>
      <div style={{position:"absolute",bottom:120,left:-60,width:200,height:200,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.05)"}}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32}}>
        <div style={{width:76,height:76,borderRadius:20,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20,border:"1px solid rgba(255,255,255,0.2)"}}><span style={{fontSize:34}}>&#127973;</span></div>
        <div style={{fontSize:26,fontWeight:900,color:C.wh,textAlign:"center",letterSpacing:"-0.5px",marginBottom:6}}>Bharat Health Connect</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",textAlign:"center",lineHeight:1.5}}>{"India's Medical Value Tourism"}<br/>Digital Access Platform</div>
        <div style={{marginTop:14,padding:"5px 12px",background:"rgba(232,112,42,0.2)",borderRadius:999,border:"1px solid rgba(232,112,42,0.4)"}}><span style={{fontSize:10,color:C.aLight,fontWeight:700,letterSpacing:1}}>GOVERNED BY QCI &bull; NABH VERIFIED</span></div>
      </div>
      <div style={{padding:"0 24px 44px"}}>
        <Btn full onClick={function(){setStep("role")}}>Get Started</Btn>
        <div style={{textAlign:"center",marginTop:12}}><span onClick={function(){setStep("login")}} style={{fontSize:12,color:"rgba(255,255,255,0.45)",cursor:"pointer"}}>Already registered? <span style={{color:C.aLight,fontWeight:700}}>Sign In</span></span></div>
      </div>
    </div>
  );

  if(step==="role") return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}>
      <div style={{padding:"20px 18px 14px",background:"linear-gradient(135deg,"+C.primary+","+C.pMid+")"}}>
        <button onClick={function(){setStep("splash")}} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.7)",fontSize:18,marginBottom:10}}>&larr;</button>
        <div style={{fontSize:20,fontWeight:800,color:C.wh}}>Select Your Role</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:3}}>Credentials verified against NABH registry</div>
      </div>
      <div style={{flex:1,overflow:"auto",padding:"16px 14px"}}>
        {roles.map(function(rx){return <div key={rx.id} onClick={function(){setRole(rx.id);setStep("login")}} style={{background:C.card,borderRadius:14,padding:14,marginBottom:10,border:"1.5px solid "+C.bdr,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:44,height:44,borderRadius:10,background:rx.cl+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{rx.i}</div>
          <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:C.txt}}>{rx.l}</div><div style={{fontSize:11,color:C.mut,marginTop:1}}>{rx.d}</div></div>
          <span style={{color:C.mut}}>&rsaquo;</span>
        </div>})}
      </div>
    </div>
  );

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}>
      <div style={{padding:"20px 18px 18px",background:"linear-gradient(135deg,"+C.primary+","+C.pMid+")"}}>
        <button onClick={function(){setStep("role")}} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.7)",fontSize:18,marginBottom:10}}>&larr;</button>
        <div style={{fontSize:20,fontWeight:800,color:C.wh}}>Welcome Back</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:3}}>Sign in with your credentials</div>
      </div>
      <div style={{flex:1,padding:"20px 18px",overflow:"auto"}}>
        <div style={{marginBottom:14}}><label style={{fontSize:11,fontWeight:600,color:C.sub,display:"block",marginBottom:5}}>Email / NABH ID</label><input placeholder="e.g. admin@bharathealthconnect.in" style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid "+C.bdr,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/></div>
        <div style={{marginBottom:18}}><label style={{fontSize:11,fontWeight:600,color:C.sub,display:"block",marginBottom:5}}>Password</label><input type="password" placeholder="Enter password" style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid "+C.bdr,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/></div>
        <Btn full onClick={go} bg={ld?C.mut:C.accent}>{ld?"Verifying...":"Sign In"}</Btn>
        <div style={{marginTop:16,padding:12,borderRadius:10,background:C.tealL+"22",border:"1px solid "+C.teal+"33"}}>
          <div style={{fontSize:10,color:C.teal,fontWeight:700}}>Demo Mode</div>
          <div style={{fontSize:10,color:C.sub,marginTop:2}}>Click Sign In to explore. No real credentials needed.</div>
        </div>
      </div>
    </div>
  );
}

function Home({role,nav}){
  var profiles={overseas:{n:"Gulf Med Partners",bd:"NABH Assured Partner",i:"\uD83C\uDF0D"},mvtf:{n:"Wellness Bridge",bd:"NABH Certified MVTF",i:"\uD83E\uDD1D"},hospital:{n:"Apollo Hospitals",bd:"NABH Gold",i:"\uD83C\uDFE5"},admin:{n:"QCI Admin",bd:"Platform Administrator",i:"\uD83D\uDEE1\uFE0F"}};
  var p=profiles[role]||profiles.overseas;
  var qa=role==="admin"?[{id:"onboarding",i:"\uD83D\uDCCB",l:"Onboarding\nQueue",ct:4,cl:C.accent},{id:"grievances",i:"\u26A0\uFE0F",l:"Grievance\nQueue",ct:3,cl:C.bad},{id:"analytics",i:"\uD83D\uDCC8",l:"Analytics",cl:C.teal},{id:"hospitals",i:"\uD83C\uDFE5",l:"Hospitals",cl:C.ok}]:[{id:"hospitals",i:"\uD83C\uDFE5",l:"Find\nHospitals",cl:C.pMid},{id:"directory",i:"\uD83E\uDD1D",l:"Find\nMVTFs",cl:C.teal},{id:"referrals",i:"\uD83D\uDCCB",l:"Referrals",cl:C.accent},{id:"grievances",i:"\u26A0\uFE0F",l:"Raise SoS",cl:C.bad}];

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg,overflow:"hidden"}}>
      <div style={{background:"linear-gradient(135deg,"+C.primary+","+C.pMid+")",padding:"18px 18px 26px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginBottom:3}}>Good morning &#128075;</div>
            <div style={{fontSize:17,fontWeight:800,color:C.wh}}>{p.n}</div>
            <div style={{marginTop:5,display:"flex",gap:5,alignItems:"center"}}><div style={{width:5,height:5,borderRadius:"50%",background:"#4CAF50"}}/><span style={{fontSize:10,color:"rgba(255,255,255,0.55)"}}>{p.bd}</span></div>
          </div>
          <div style={{width:38,height:38,borderRadius:"50%",background:"rgba(232,112,42,0.3)",border:"2px solid rgba(232,112,42,0.6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{p.i}</div>
        </div>
      </div>
      <div style={{flex:1,overflow:"auto",padding:"0 14px 76px"}}>
        <div style={{background:"linear-gradient(135deg,"+C.accent+",#c85a1a)",borderRadius:14,padding:"14px 18px",marginTop:-12,marginBottom:14,boxShadow:"0 4px 16px "+C.accent+"55"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.65)",marginBottom:3}}>QCI TRUST SCORE</div>
              <div style={{display:"flex",alignItems:"baseline",gap:5}}><span style={{fontSize:30,fontWeight:900,color:C.wh}}>4.8</span><span style={{fontSize:12,color:"rgba(255,255,255,0.6)"}}>/ 5.0</span></div>
              <Stars v={4.8} sz={12}/>
            </div>
            <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid rgba(255,255,255,0.25)",fontSize:26}}>&#127941;</div>
          </div>
        </div>
        <Sec title="Quick Access"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
          {qa.map(function(a){return <button key={a.id} onClick={function(){nav(a.id)}} style={{background:C.card,borderRadius:14,padding:"14px 12px",border:"1.5px solid "+C.bdr,cursor:"pointer",textAlign:"left",position:"relative"}}>
            <div style={{width:36,height:36,borderRadius:8,background:a.cl+"18",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:8,fontSize:18}}>{a.i}</div>
            <div style={{fontSize:12,fontWeight:700,color:C.txt,whiteSpace:"pre-line",lineHeight:1.3}}>{a.l}</div>
            {a.ct&&<div style={{position:"absolute",top:8,right:8,width:16,height:16,borderRadius:"50%",background:a.cl,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:9,fontWeight:800,color:C.wh}}>{a.ct}</span></div>}
          </button>})}
        </div>
        <Sec title={role==="admin"?"Platform Overview":"Your Network"}/>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
          {role==="admin"?<><Stat label="Total Stakeholders" value="4,847" icon="&#128101;" color={C.teal} sub="&#8593; 234"/><Stat label="NABH Hospitals" value="2,847" icon="&#127973;" color={C.pMid}/><Stat label="Open Grievances" value="12" icon="&#9888;" color={C.bad} sub="3 critical"/><Stat label="Pending Approvals" value="4" icon="&#128203;" color={C.warn}/></>:<><Stat label="Verified Hospitals" value="2,847" icon="&#127973;" color={C.teal} sub="&#8593; 124"/><Stat label="Active Partners" value="1,293" icon="&#129309;" color={C.pMid} sub="&#8593; 56"/><Stat label="Connections" value="34" icon="&#127758;" color={C.ok}/><Stat label="Open Tickets" value="2" icon="&#9888;" color={C.warn} sub="SoS Active"/></>}
        </div>
        {role!=="admin"&&<><Sec title="Top Hospitals" action="View All" onAction={function(){nav("hospitals")}}/>{HOSPITALS.slice(0,2).map(function(h){return <Card key={h.id} onClick={function(){nav("hospitals")}}><div style={{display:"flex",gap:10}}><div style={{width:44,height:44,borderRadius:10,background:C.tealL+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>&#127973;</div><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",gap:4,flexWrap:"wrap"}}><div style={{fontSize:13,fontWeight:700}}>{h.n}</div><Tier t={h.t}/></div><div style={{fontSize:11,color:C.mut,marginTop:2}}>&#128205; {h.c} &bull; {h.b} beds</div><div style={{marginTop:4}}><Stars v={h.s}/></div></div></div></Card>})}</>}
      </div>
    </div>
  );
}

function HospitalDir({nav}){
  var qs=useState(""),q=qs[0],setQ=qs[1];
  var fs=useState("All"),f=fs[0],setF=fs[1];
  var ss=useState(null),sel=ss[0],setSel=ss[1];
  var filters=["All","Gold","Silver","Cardiac","Oncology"];
  var flt=HOSPITALS.filter(function(h){var m=h.n.toLowerCase().indexOf(q.toLowerCase())>=0||h.c.toLowerCase().indexOf(q.toLowerCase())>=0||h.sp.some(function(s){return s.toLowerCase().indexOf(q.toLowerCase())>=0});if(f==="All")return m;if(f==="Gold")return m&&h.t==="Gold";if(f==="Silver")return m&&h.t==="Silver";return m&&h.sp.some(function(s){return s.indexOf(f)>=0})});

  if(sel) return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}>
      <div style={{background:"linear-gradient(135deg,"+C.primary+","+C.pMid+")",padding:"18px 18px 22px"}}>
        <button onClick={function(){setSel(null)}} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.7)",fontSize:14,marginBottom:8}}>&larr; Hospitals</button>
        <div style={{fontSize:20,fontWeight:800,color:C.wh}}>{sel.n}</div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginTop:5}}><span style={{fontSize:12,color:"rgba(255,255,255,0.55)"}}>&#128205; {sel.c}</span><Tier t={sel.t}/></div>
      </div>
      <div style={{flex:1,overflow:"auto",padding:"14px 14px 76px"}}>
        <Card style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:10,color:C.mut,marginBottom:3}}>TRUST SCORE</div><div style={{fontSize:26,fontWeight:900}}>{sel.s}</div><Stars v={sel.s}/></div><div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.mut,marginBottom:3}}>PROCEDURES</div><div style={{fontSize:20,fontWeight:800,color:C.primary}}>{sel.p.toLocaleString()}</div><div style={{fontSize:10,color:C.mut}}>{sel.b} beds</div></div></Card>
        {sel.desc&&<Card><div style={{fontSize:11,color:C.sub,lineHeight:1.6}}>{sel.desc}</div></Card>}
        <Sec title="Specialties"/><div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>{sel.sp.map(function(s){return <span key={s} style={{padding:"5px 10px",borderRadius:999,background:C.tealL+"22",fontSize:11,color:C.teal,fontWeight:600}}>{s}</span>})}</div>
        <Sec title="Languages"/><div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>{sel.la.map(function(l){return <span key={l} style={{padding:"5px 10px",borderRadius:999,background:C.bg,border:"1px solid "+C.bdr,fontSize:11,color:C.sub}}>&#127760; {l}</span>})}</div>
        <Sec title="Accreditation"/><Card><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:12,fontWeight:700}}>NABH Accreditation</div><div style={{fontSize:11,color:C.mut,marginTop:2}}>Valid until 2026-08</div></div><Tier t={sel.t}/></div></Card>
        <div style={{display:"flex",gap:8,marginTop:6}}><Btn full>&#128222; Connect</Btn><Btn full bg={C.card} color={C.primary} style={{border:"1.5px solid "+C.primary,boxShadow:"none"}}>&#9993; Enquire</Btn></div>
      </div>
    </div>
  );

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}>
      <div style={{background:"linear-gradient(135deg,"+C.primary+","+C.pMid+")",padding:"18px 18px 14px"}}>
        <div style={{fontSize:20,fontWeight:800,color:C.wh,marginBottom:3}}>Hospital Directory</div>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>{HOSPITALS.length} NABH-verified hospitals</div>
      </div>
      <div style={{flex:1,overflow:"auto",padding:"14px 14px 76px"}}>
        <Search value={q} onChange={setQ} placeholder="Search hospitals, specialties, cities..."/>
        <div style={{display:"flex",gap:5,marginBottom:12,overflowX:"auto",paddingBottom:3}}>{filters.map(function(x){return <button key={x} onClick={function(){setF(x)}} style={{padding:"5px 12px",borderRadius:999,whiteSpace:"nowrap",background:f===x?C.primary:C.card,color:f===x?C.wh:C.sub,border:"1.5px solid "+(f===x?C.primary:C.bdr),fontWeight:600,fontSize:11,cursor:"pointer"}}>{x}</button>})}</div>
        {flt.map(function(h){return <Card key={h.id} onClick={function(){setSel(h)}}><div style={{display:"flex",gap:10}}><div style={{width:48,height:48,borderRadius:10,background:C.tealL+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>&#127973;</div><div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:3}}><div style={{fontSize:14,fontWeight:700}}>{h.n}</div><Tier t={h.t}/></div><div style={{fontSize:11,color:C.mut,marginTop:2}}>&#128205; {h.c} &bull; {h.b} beds</div><div style={{display:"flex",alignItems:"center",gap:4,marginTop:4}}><Stars v={h.s}/><span style={{fontSize:10,color:C.mut}}>&bull; {h.p.toLocaleString()} procs</span></div><div style={{display:"flex",gap:3,marginTop:6,flexWrap:"wrap"}}>{h.sp.slice(0,3).map(function(s){return <span key={s} style={{padding:"2px 6px",borderRadius:999,background:C.bg,border:"1px solid "+C.bdr,fontSize:9,color:C.sub}}>{s}</span>})}</div></div></div></Card>})}
      </div>
    </div>
  );
}

function Directory(){
  var ts=useState("mvtf"),tab=ts[0],setTab=ts[1];
  var qs=useState(""),q=qs[0],setQ=qs[1];
  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}>
      <div style={{background:"linear-gradient(135deg,"+C.primary+","+C.pMid+")",padding:"18px 18px 0"}}>
        <div style={{fontSize:20,fontWeight:800,color:C.wh,marginBottom:12}}>Directory</div>
        <div style={{display:"flex"}}>{[{id:"mvtf",l:"MVTFs"},{id:"partners",l:"Partners"},{id:"msgs",l:"Messages"}].map(function(t){return <button key={t.id} onClick={function(){setTab(t.id)}} style={{padding:"9px 14px",border:"none",cursor:"pointer",fontSize:12,fontWeight:700,background:"transparent",color:tab===t.id?"white":"rgba(255,255,255,0.4)",borderBottom:tab===t.id?"2.5px solid "+C.accent:"2.5px solid transparent"}}>{t.l}</button>})}</div>
      </div>
      <div style={{flex:1,overflow:"auto",padding:"14px 14px 76px"}}>
        <Search value={q} onChange={setQ} placeholder={"Search "+tab+"..."}/>
        {tab==="mvtf"&&MVTFS.filter(function(m){return m.n.toLowerCase().indexOf(q.toLowerCase())>=0}).map(function(m){return <Card key={m.id}><div style={{display:"flex",gap:10}}><div style={{width:44,height:44,borderRadius:"50%",background:C.pMid+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>&#129309;</div><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontSize:13,fontWeight:700}}>{m.n}</div><Stars v={m.s}/></div><div style={{fontSize:10,color:C.mut,marginTop:2}}>&#128205; {m.c} &bull; Since {m.yr} &bull; {m.cs.toLocaleString()} cases</div><div style={{display:"flex",gap:3,marginTop:5,flexWrap:"wrap"}}>{m.la.map(function(l){return <span key={l} style={{padding:"2px 5px",borderRadius:999,background:C.bg,border:"1px solid "+C.bdr,fontSize:9}}>&#127760; {l}</span>})}</div><div style={{display:"flex",gap:5,marginTop:8}}><Btn sm>Connect</Btn><Btn sm bg={C.card} color={C.primary} style={{border:"1px solid "+C.primary,boxShadow:"none"}}>Profile</Btn></div></div></div></Card>})}
        {tab==="partners"&&PARTNERS.filter(function(p){return p.n.toLowerCase().indexOf(q.toLowerCase())>=0}).map(function(p){return <Card key={p.id}><div style={{display:"flex",gap:10}}><div style={{width:44,height:44,borderRadius:"50%",background:C.tealL+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>&#127758;</div><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontSize:13,fontWeight:700}}>{p.n}</div>{p.v&&<Badge color={C.ok} bg={C.okBg}>&#10003; Verified</Badge>}</div><div style={{fontSize:10,color:C.mut,marginTop:2}}>&#127760; {p.co} &bull; {p.ty} &bull; {p.pt} patients</div><Btn sm style={{marginTop:8}}>Connect</Btn></div></div></Card>})}
        {tab==="msgs"&&MSGS.map(function(m){return <Card key={m.id}><div style={{display:"flex",gap:10}}><div style={{width:44,height:44,borderRadius:"50%",background:m.unread?C.accent+"22":C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>&#128172;</div><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontSize:13,fontWeight:m.unread?800:600}}>{m.from}</div><span style={{fontSize:9,color:C.mut}}>{m.time}</span></div><div style={{fontSize:11,color:m.unread?C.txt:C.mut,marginTop:3,lineHeight:1.4}}>{m.msg}</div>{m.unread&&<div style={{width:6,height:6,borderRadius:"50%",background:C.accent,marginTop:4}}/>}</div></div></Card>})}
      </div>
    </div>
  );
}

function Referrals(){return <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}><div style={{background:"linear-gradient(135deg,"+C.primary+","+C.pMid+")",padding:"18px 18px 14px"}}><div style={{fontSize:20,fontWeight:800,color:C.wh,marginBottom:3}}>Referrals</div><div style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>Patient referral management</div></div><div style={{flex:1,overflow:"auto",padding:"14px 14px 76px"}}><Btn full style={{marginBottom:16}}>+ Create New Referral</Btn><Sec title="Active Referrals" sub={REFERRALS.length+" total"}/>{REFERRALS.map(function(r){return <Card key={r.id}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:11,fontWeight:700,color:C.primary}}>{r.id}</span><Status s={r.st}/></div><div style={{fontSize:13,fontWeight:700,marginBottom:3}}>{r.pa}</div><div style={{fontSize:11,color:C.mut,marginBottom:3}}>{r.cn}</div><div style={{display:"flex",alignItems:"center",gap:6,fontSize:10,color:C.mut}}><span>&#127758; {r.co}</span><span>&#128197; {r.d}</span>{r.pr==="urgent"&&<Badge color={C.bad} bg={C.badBg}>Urgent</Badge>}{r.es>0&&<span>&#128202; {r.es} est.</span>}</div></Card>})}</div></div>}

function Griev(){
  var vs=useState("list"),v=vs[0],setV=vs[1];
  var ds=useState(false),done=ds[0],setDone=ds[1];
  if(done) return <div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,background:C.bg}}><div style={{width:72,height:72,borderRadius:"50%",background:C.okBg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,fontSize:32}}>&#9989;</div><div style={{fontSize:20,fontWeight:800,textAlign:"center",marginBottom:6}}>Complaint Submitted</div><div style={{fontSize:12,color:C.sub,marginBottom:4}}>Ticket raised with QCI/NABH</div><div style={{padding:"8px 18px",borderRadius:14,background:C.card,border:"1.5px solid "+C.bdr,marginBottom:20}}><span style={{fontSize:14,fontWeight:800,color:C.primary}}>GRV-2025-1025</span></div><Btn onClick={function(){setDone(false);setV("list")}}>Back to Grievances</Btn></div>;
  if(v==="new") return <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}><div style={{background:"linear-gradient(135deg,"+C.bad+",#8B0000)",padding:"18px 18px 16px"}}><button onClick={function(){setV("list")}} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.7)",fontSize:14,marginBottom:8}}>&larr;</button><div style={{fontSize:20,fontWeight:800,color:C.wh}}>Raise Complaint / SoS</div><div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:3}}>Routed directly to QCI Admin</div></div><div style={{flex:1,overflow:"auto",padding:"16px 14px 76px"}}><div style={{marginBottom:12}}><label style={{fontSize:11,fontWeight:600,color:C.sub,display:"block",marginBottom:5}}>Category</label><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["Hospital","MVTF","Accommodation","Allied Service"].map(function(c){return <button key={c} style={{padding:"6px 10px",borderRadius:999,border:"1.5px solid "+C.bdr,fontSize:11,fontWeight:600,cursor:"pointer",background:C.card}}>{c}</button>})}</div></div><div style={{marginBottom:12}}><label style={{fontSize:11,fontWeight:600,color:C.sub,display:"block",marginBottom:5}}>Name of Entity</label><input placeholder="e.g. Apollo Hospitals, Mumbai" style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid "+C.bdr,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/></div><div style={{marginBottom:12}}><label style={{fontSize:11,fontWeight:600,color:C.sub,display:"block",marginBottom:5}}>Describe the Issue</label><textarea rows={4} placeholder="Describe in detail..." style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid "+C.bdr,fontSize:13,outline:"none",resize:"none",boxSizing:"border-box",fontFamily:"inherit"}}/></div><div style={{padding:"10px 12px",borderRadius:10,background:C.warnBg,marginBottom:14}}><div style={{fontSize:10,color:C.warn,fontWeight:600}}>&#9888; QCI Admin will review within 2 business days</div></div><Btn full bg={C.bad} onClick={function(){setDone(true)}}>Submit Complaint</Btn></div></div>;
  return <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}><div style={{background:"linear-gradient(135deg,"+C.primary+","+C.pMid+")",padding:"18px 18px 14px"}}><div style={{fontSize:20,fontWeight:800,color:C.wh,marginBottom:3}}>Grievances &amp; SoS</div><div style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>QCI-mediated complaint resolution</div></div><div style={{flex:1,overflow:"auto",padding:"14px 14px 76px"}}><Btn full bg={C.bad} onClick={function(){setV("new")}} style={{marginBottom:16}}>&#9888; Raise New Complaint</Btn><Sec title="Your Tickets" sub={GRIEVANCES.length+" total"}/>{GRIEVANCES.map(function(g){return <Card key={g.id}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:11,fontWeight:700,color:C.primary}}>{g.id}</span><Status s={g.st}/></div><div style={{fontSize:13,fontWeight:600,marginBottom:3}}>{g.sm}</div><div style={{fontSize:11,color:C.mut}}>Against: <strong>{g.ag}</strong> &bull; {g.d}</div>{g.rs&&<div style={{marginTop:6,padding:"7px 9px",borderRadius:8,background:C.okBg}}><div style={{fontSize:10,color:C.ok,fontWeight:700}}>&#10003; {g.rs}</div></div>}</Card>})}</div></div>;
}

function OnboardQ(){
  var is=useState(ONBOARD),items=is[0],setItems=is[1];
  var approve=function(id){setItems(function(p){return p.map(function(i){return i.id===id?Object.assign({},i,{st:"Approved"}):i})})};
  return <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}><div style={{background:"linear-gradient(135deg,"+C.primary+","+C.pMid+")",padding:"18px 18px 14px"}}><div style={{fontSize:20,fontWeight:800,color:C.wh,marginBottom:3}}>Onboarding Queue</div><div style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>{items.filter(function(i){return i.st!=="Approved"}).length} pending</div></div><div style={{flex:1,overflow:"auto",padding:"14px 14px 76px"}}>{items.map(function(a){return <Card key={a.id}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:10,fontWeight:700,color:C.primary}}>{a.id}</span><Status s={a.st}/></div><div style={{fontSize:14,fontWeight:700}}>{a.n}</div><div style={{fontSize:11,color:C.mut,marginTop:2}}>{a.ty} &bull; {a.lo} &bull; {a.d}</div>{a.st!=="Approved"&&<div style={{display:"flex",gap:6,marginTop:10}}><Btn sm bg={C.ok} onClick={function(){approve(a.id)}}>&#10003; Approve</Btn><Btn sm bg={C.warnBg} color={C.warn} style={{boxShadow:"none"}}>Review</Btn><Btn sm bg={C.badBg} color={C.bad} style={{boxShadow:"none"}}>&#10007; Reject</Btn></div>}</Card>})}</div></div>;
}

function Analytics(){
  var bars=[{l:"Aug",v:74},{l:"Sep",v:82},{l:"Oct",v:79},{l:"Nov",v:91},{l:"Dec",v:88},{l:"Jan",v:102}];var mx=Math.max.apply(null,bars.map(function(b){return b.v}));
  var mkts=[{c:"UAE",p:2840,pc:28,f:"\uD83C\uDDE6\uD83C\uDDEA"},{c:"Bangladesh",p:1920,pc:19,f:"\uD83C\uDDE7\uD83C\uDDE9"},{c:"Nigeria",p:1540,pc:15,f:"\uD83C\uDDF3\uD83C\uDDEC"},{c:"Sri Lanka",p:1210,pc:12,f:"\uD83C\uDDF1\uD83C\uDDF0"},{c:"Others",p:2590,pc:26,f:"\uD83C\uDF0D"}];
  return <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}><div style={{background:"linear-gradient(135deg,"+C.primary+","+C.pMid+")",padding:"18px 18px 14px"}}><div style={{fontSize:20,fontWeight:800,color:C.wh,marginBottom:3}}>Analytics Dashboard</div><div style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>QCI MVT Ecosystem Intelligence</div></div><div style={{flex:1,overflow:"auto",padding:"14px 14px 76px"}}><div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}><Stat label="Patients (2024)" value="6.5L" icon="&#128101;" color={C.teal} sub="&#8593; 18% YoY"/><Stat label="Revenue" value="$13B" icon="&#128200;" color={C.ok} sub="GDP"/><Stat label="Trust Score" value="4.6" icon="&#11088;" color={C.gold} sub="&#8593; 0.2"/><Stat label="Resolution" value="87%" icon="&#9989;" color={C.pMid} sub="SLA"/></div><Sec title="Monthly Onboardings"/><Card><div style={{display:"flex",alignItems:"flex-end",gap:6,height:80}}>{bars.map(function(b,i){return <div key={b.l} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><div style={{fontSize:9,fontWeight:700,color:C.sub}}>{b.v}</div><div style={{width:"100%",height:(b.v/mx)*60+"px",borderRadius:"3px 3px 0 0",background:i>=4?C.accent:C.pMid}}/><div style={{fontSize:9,color:C.mut}}>{b.l}</div></div>})}</div></Card><Sec title="Top Source Markets"/><Card>{mkts.map(function(m,i){return <div key={m.c} style={{marginBottom:i<mkts.length-1?10:0}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,fontWeight:600}}>{m.f} {m.c}</span><span style={{fontSize:11,color:C.mut}}>{m.p.toLocaleString()} ({m.pc}%)</span></div><div style={{height:5,borderRadius:999,background:C.bg,overflow:"hidden"}}><div style={{height:"100%",width:m.pc*2.5+"%",borderRadius:999,background:i===0?C.accent:i===1?C.teal:C.pMid}}/></div></div>})}</Card></div></div>;
}

function Profile({role,onLogout}){
  var profiles={overseas:{n:"Gulf Med Partners",id:"NABH-OVS-2341",lo:"UAE",ty:"Overseas MVTF",em:"contact@gulfmed.ae",i:"\uD83C\uDF0D"},mvtf:{n:"Wellness Bridge",id:"NABH-MVTF-2890",lo:"Mumbai",ty:"Indian MVTF",em:"info@wellnessbridge.in",i:"\uD83E\uDD1D"},hospital:{n:"Apollo Hospitals",id:"NABH-HSP-0001",lo:"Chennai",ty:"NABH Gold Hospital",em:"intl@apollo.com",i:"\uD83C\uDFE5"},admin:{n:"Priya Sharma",id:"QCI-ADMIN-007",lo:"New Delhi",ty:"QCI Administrator",em:"p.sharma@qcin.org",i:"\uD83D\uDEE1\uFE0F"}};
  var p=profiles[role]||profiles.overseas;
  return <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}><div style={{background:"linear-gradient(135deg,"+C.primary+","+C.pMid+")",padding:"22px 18px 28px",textAlign:"center"}}><div style={{width:64,height:64,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 10px",border:"2.5px solid rgba(255,255,255,0.25)"}}>{p.i}</div><div style={{fontSize:18,fontWeight:800,color:C.wh}}>{p.n}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:3}}>{p.id}</div><div style={{marginTop:6}}><Badge color={C.ok} bg={C.okBg} dot>{p.ty}</Badge></div><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5,marginTop:8}}><Stars v={4.8} sz={12}/><span style={{fontSize:12,fontWeight:700,color:C.wh}}>Trust Score</span></div></div><div style={{flex:1,overflow:"auto",padding:"14px 14px 76px"}}><Card>{[{l:"Email",v:p.em,i:"&#128231;"},{l:"Location",v:p.lo,i:"&#128205;"},{l:"Type",v:p.ty,i:"&#127941;"}].map(function(x,i,a){return <div key={x.l} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<a.length-1?"1px solid "+C.bdr:"none"}}><div style={{width:30,height:30,borderRadius:8,background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}} dangerouslySetInnerHTML={{__html:x.i}}/><div><div style={{fontSize:9,color:C.mut,fontWeight:600}}>{x.l}</div><div style={{fontSize:12,fontWeight:600}}>{x.v}</div></div></div>})}</Card><Sec title="Settings"/>{["Notifications","Privacy & Data","Language","NABH Details","Help & Support"].map(function(s){return <Card key={s} style={{display:"flex",alignItems:"center",padding:"11px 14px",marginBottom:6}}><span style={{flex:1,fontSize:13,fontWeight:600}}>{s}</span><span style={{color:C.mut}}>&rsaquo;</span></Card>})}<button onClick={onLogout} style={{width:"100%",marginTop:6,padding:11,borderRadius:12,background:C.badBg,color:C.bad,fontWeight:700,fontSize:13,border:"1.5px solid "+C.bad+"44",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>&#128682; Sign Out</button></div></div>;
}

function BottomNav({active,nav,role}){
  var items=role==="admin"?[{id:"home",i:"&#128202;",l:"Dashboard"},{id:"onboarding",i:"&#128203;",l:"Onboarding"},{id:"grievances",i:"&#9888;",l:"Grievances"},{id:"analytics",i:"&#128200;",l:"Analytics"},{id:"profile",i:"&#9881;",l:"Settings"}]:[{id:"home",i:"&#127968;",l:"Home"},{id:"hospitals",i:"&#127973;",l:"Hospitals"},{id:"directory",i:"&#129309;",l:"Directory"},{id:"referrals",i:"&#128203;",l:"Referrals"},{id:"profile",i:"&#9881;",l:"Profile"}];
  return <div style={{position:"absolute",bottom:0,left:0,right:0,background:C.card,borderTop:"1px solid "+C.bdr,display:"flex",boxShadow:"0 -3px 12px rgba(10,46,82,0.06)",zIndex:50}}>{items.map(function(it){return <button key={it.id} onClick={function(){nav(it.id)}} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"9px 4px",border:"none",background:"transparent",cursor:"pointer",color:active===it.id?C.accent:C.mut}}><span style={{fontSize:18}} dangerouslySetInnerHTML={{__html:it.i}}/><span style={{fontSize:9,fontWeight:active===it.id?700:500}}>{it.l}</span></button>})}</div>;
}

export default function App(){
  var sc=useState("splash"),screen=sc[0],setScreen=sc[1];
  var tb=useState("home"),tab=tb[0],setTab=tb[1];
  var rl=useState(null),role=rl[0],setRole=rl[1];
  var login=function(r){setRole(r);setScreen("app");setTab("home")};
  var nav=function(t){setTab(t)};
  var logout=function(){setScreen("splash");setRole(null);setTab("home")};
  var renderTab=function(){
    if(tab==="home") return <Home role={role} nav={nav}/>;
    if(tab==="hospitals") return <HospitalDir nav={nav}/>;
    if(tab==="directory") return <Directory/>;
    if(tab==="referrals") return <Referrals/>;
    if(tab==="grievances") return <Griev/>;
    if(tab==="onboarding") return <OnboardQ/>;
    if(tab==="analytics") return <Analytics/>;
    if(tab==="profile") return <Profile role={role} onLogout={logout}/>;
    return <Home role={role} nav={nav}/>;
  };

  return (
    <>
      <Head>
        <title>Bharat Health Connect</title>
        <meta name="description" content="India's Medical Value Tourism Digital Platform - Governed by QCI, NABH Verified"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div style={{minHeight:"100vh",background:"#1a1a2e",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Segoe UI',system-ui,sans-serif",padding:"16px 0"}}>
        <div style={{width:380,maxWidth:"95vw",background:"#071E38",borderRadius:44,padding:"10px 9px",boxShadow:"0 30px 80px rgba(0,0,0,0.6)",position:"relative"}}>
          <div style={{width:110,height:26,background:"#071E38",borderRadius:"0 0 16px 16px",margin:"0 auto 3px",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}><div style={{width:9,height:9,borderRadius:"50%",background:"#111"}}/><div style={{width:5,height:5,borderRadius:"50%",background:"#111"}}/></div>
          <div style={{height:"min(740px, 85vh)",borderRadius:34,overflow:"hidden",position:"relative",background:C.bg}}>
            {screen==="splash"&&<Splash onLogin={login}/>}
            {screen==="app"&&<div style={{height:"100%",position:"relative"}}><div style={{height:"100%"}}>{renderTab()}</div><BottomNav active={tab} nav={nav} role={role}/></div>}
          </div>
          <div style={{width:90,height:4,background:"rgba(255,255,255,0.18)",borderRadius:999,margin:"8px auto 0"}}/>
        </div>
        {screen==="app"&&<div style={{position:"fixed",top:16,right:16,background:"rgba(10,46,82,0.95)",borderRadius:14,padding:"10px 14px",border:"1px solid rgba(255,255,255,0.1)",zIndex:100}}>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.45)",marginBottom:6,fontWeight:700,letterSpacing:1}}>SWITCH ROLE</div>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>{[{id:"overseas",l:"\uD83C\uDF0D Overseas"},{id:"mvtf",l:"\uD83E\uDD1D MVTF"},{id:"hospital",l:"\uD83C\uDFE5 Hospital"},{id:"admin",l:"\uD83D\uDEE1 Admin"}].map(function(r){return <button key={r.id} onClick={function(){setRole(r.id);setTab("home")}} style={{padding:"5px 10px",borderRadius:8,border:"1px solid "+(role===r.id?C.accent:"rgba(255,255,255,0.12)"),background:role===r.id?C.accent+"22":"transparent",color:role===r.id?C.aLight:"rgba(255,255,255,0.6)",fontSize:10,fontWeight:600,cursor:"pointer",textAlign:"left"}}>{r.l}</button>})}</div>
        </div>}
      </div>
    </>
  );
}
