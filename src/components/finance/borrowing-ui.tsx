import {Link} from "@tanstack/react-router";
import {useState} from "react";
import {Button,DashboardCard,FieldError,FormField,Input,ModalShell,StatusBadge,Textarea} from "@/components/ui/crm";
import {A} from "./revenue-data";
import {K,allocationBases,bcFor,costSources,costTypes,facilities,financeCosts,type FinanceCost} from "./borrowing-data";

const tone=(s:string)=>["Capitalized","Posted","Active","Closed","Approved"].includes(s)?"success":["Partially Capitalized","Under Review"].includes(s)?"info":["Pending Approval","Draft","Not posted","Pending posting"].includes(s)?"warning":["On Hold","Expensed","Reversed","Rejected"].includes(s)?"danger":"neutral";
export function BcBadge({s}:{s:string}){return <StatusBadge tone={tone(s) as "success"}>{s}</StatusBadge>}

/** Shared in-memory store so dashboard, detail, costing and close views stay consistent until refresh. */
export const bcStore={costs:financeCosts,set(id:string,p:Partial<FinanceCost>){this.costs=this.costs.map(c=>c.id===id?{...c,...p}:c)},add(c:FinanceCost){this.costs=[c,...this.costs]}};

export function PolicyNote(){return <div className="rounded-md border border-dashed border-border bg-muted/40 p-3 text-xs text-muted-foreground"><strong className="text-foreground">IAS 23-ready borrowing cost workflow.</strong> Borrowing cost treatment according to configured Finance policy. No project is assumed to qualify, no cost is capitalized automatically and capitalization dates are set by Finance — not by the system.</div>}

/** Compact strip reused on Project 360, Costing and Profitability — reads the same borrowing cost records, never re-enters them. */
export function BorrowingStrip({project}:{project:string}){const p=bcFor(project);if(!p)return null;return <DashboardCard className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 p-4 text-xs"><span className="font-semibold">Borrowing costs</span><span>Finance cost <strong>{K(p.cost)}</strong></span><span>Capitalized into project cost <strong>{K(p.cap)}</strong></span><span>Expensed (P&L) <strong>{K(p.exp)}</strong></span><span>Pending review <strong>{K(p.pending)}</strong></span><BcBadge s={p.status}/><Link to="/finance/borrowing" className="ml-auto font-semibold text-primary">Open borrowing costs</Link></DashboardCard>}

const sel="h-control w-full rounded-md border border-input bg-surface px-3 text-sm";
export function AddFacilityModal({open,onOpenChange,onSave}:{open:boolean;onOpenChange:(o:boolean)=>void;onSave:(name:string)=>void}){
const [f,setF]=useState({name:"",lender:"",amount:"",project:"Horizon Residences",start:""});const [err,setErr]=useState("");
const save=()=>{if(!f.name||!f.lender||!Number(f.amount)||!f.start)return setErr("Name, lender, amount and start date are required.");onSave(f.name);setF({name:"",lender:"",amount:"",project:"Horizon Residences",start:""});setErr("");onOpenChange(false)};
return <ModalShell open={open} onOpenChange={onOpenChange} title="Add financing facility"><div className="grid gap-3 sm:grid-cols-2">
<FormField label="Facility name"><Input value={f.name} onChange={e=>setF({...f,name:e.target.value})}/></FormField>
<FormField label="Lender / provider"><Input value={f.lender} onChange={e=>setF({...f,lender:e.target.value})}/></FormField>
<FormField label="Facility amount (AED)"><Input inputMode="numeric" value={f.amount} onChange={e=>setF({...f,amount:e.target.value.replace(/[^0-9]/g,"")})}/></FormField>
<FormField label="Start date"><Input type="date" value={f.start} onChange={e=>setF({...f,start:e.target.value})}/></FormField>
<FormField label="Related project"><select className={sel} value={f.project} onChange={e=>setF({...f,project:e.target.value})}>{["Horizon Residences","Green Park","Creek Vista","Multiple projects"].map(p=><option key={p}>{p}</option>)}</select></FormField>
</div><p className="mt-2 text-[11px] text-muted-foreground">Project financing cost tracking only — not a loan servicing system.</p><FieldError>{err}</FieldError>
<div className="mt-4 flex justify-end gap-2"><Button variant="secondary" onClick={()=>onOpenChange(false)}>Cancel</Button><Button onClick={save}>Save as draft</Button></div></ModalShell>}

export function AddCostModal({open,onOpenChange,onSave}:{open:boolean;onOpenChange:(o:boolean)=>void;onSave:(c:FinanceCost)=>void}){
const [f,setF]=useState({facility:"FAC-2026-001",type:"Interest",source:"Lender notice",ref:"",amount:""});const [err,setErr]=useState("");
const save=()=>{const amt=Number(f.amount);if(!amt||!f.ref)return setErr("Amount and source reference are required.");if(bcStore.costs.some(c=>c.sourceRef===f.ref))return setErr("This source reference is already recorded — duplicate finance costs are blocked.");const fac=facilities.find(x=>x.id===f.facility);
onSave({id:`BC-2026-${String(92+bcStore.costs.length-7).padStart(4,"0")}`,facility:f.facility,project:fac&&fac.projects.length>1?`Multiple (${fac.projects.length})`:fac?.projects[0]?.project??"",period:"Sep 2026",type:f.type,source:f.source,sourceRef:f.ref,amount:amt,capitalized:0,expensed:0,status:"Draft",policy:f.facility==="FAC-2026-003"?"POL-BC-002 v1":"POL-BC-001 v2",journal:"—",gl:"Not posted",preparedBy:"You"});setF({...f,ref:"",amount:""});setErr("");onOpenChange(false)};
return <ModalShell open={open} onOpenChange={onOpenChange} title="Record finance cost · Sep 2026"><div className="grid gap-3 sm:grid-cols-2">
<FormField label="Financing facility"><select className={sel} value={f.facility} onChange={e=>setF({...f,facility:e.target.value})}>{facilities.map(x=><option key={x.id} value={x.id}>{x.id} · {x.name}</option>)}</select></FormField>
<FormField label="Cost type"><select className={sel} value={f.type} onChange={e=>setF({...f,type:e.target.value})}>{costTypes.map(t=><option key={t}>{t}</option>)}</select></FormField>
<FormField label="Source"><select className={sel} value={f.source} onChange={e=>setF({...f,source:e.target.value})}>{costSources.map(t=><option key={t}>{t}</option>)}</select></FormField>
<FormField label="Source reference"><Input value={f.ref} onChange={e=>setF({...f,ref:e.target.value})} placeholder="e.g. ENB-INT-1026"/></FormField>
<FormField label="Amount (AED)"><Input inputMode="numeric" value={f.amount} onChange={e=>setF({...f,amount:e.target.value.replace(/[^0-9]/g,"")})}/></FormField>
</div><p className="mt-2 text-[11px] text-muted-foreground">Recorded as Draft. Capitalized / expensed split is decided in Capitalization review.</p><FieldError>{err}</FieldError>
<div className="mt-4 flex justify-end gap-2"><Button variant="secondary" onClick={()=>onOpenChange(false)}>Cancel</Button><Button onClick={save}>Save draft</Button></div></ModalShell>}

/** Finance decision: capitalized + expensed must equal the cost; a reason is mandatory. Posting happens only after approval. */
export function DecisionModal({cost,open,onOpenChange,onSubmit}:{cost:FinanceCost;open:boolean;onOpenChange:(o:boolean)=>void;onSubmit:(cap:number,exp:number,reason:string)=>void}){
const [cap,setCap]=useState("");const [reason,setReason]=useState("");const [qual,setQual]=useState("");const [err,setErr]=useState("");
const c=Number(cap||0),e=cost.amount-c;
const submit=()=>{if(!qual)return setErr("Confirm the qualifying asset assessment.");if(c<0||c>cost.amount)return setErr("Capitalized amount must be between 0 and the finance cost.");if(!reason.trim())return setErr("A decision reason is required for audit.");onSubmit(c,e,reason);setCap("");setReason("");setQual("");setErr("");onOpenChange(false)};
return <ModalShell open={open} onOpenChange={onOpenChange} title={`Capitalization decision · ${cost.id}`}>
<div className="grid grid-cols-3 gap-2 text-xs"><div className="rounded-md border border-border p-2">Finance cost<strong className="block">{A(cost.amount)}</strong></div><div className="rounded-md border border-border p-2">Capitalized<strong className="block">{A(c)}</strong></div><div className="rounded-md border border-border p-2">Expensed<strong className="block">{A(e)}</strong></div></div>
<div className="mt-3 grid gap-3"><FormField label="Qualifying asset assessment (Finance judgement)"><select className={sel} value={qual} onChange={x=>setQual(x.target.value)}><option value="">Select…</option><option>Qualifying — development active in period</option><option>Qualifying — development suspended in period</option><option>Not qualifying</option></select></FormField>
<FormField label="Amount to capitalize (AED)"><Input inputMode="numeric" value={cap} onChange={x=>setCap(x.target.value.replace(/[^0-9]/g,""))}/></FormField>
<div className="flex gap-2">{[["All",cost.amount],["None",0],["50%",Math.round(cost.amount/2)]].map(([l,v])=><Button key={l} variant="secondary" className="h-7 px-2 text-[11px]" onClick={()=>setCap(String(v))}>{l}</Button>)}</div>
<FormField label="Reason"><Textarea value={reason} onChange={x=>setReason(x.target.value)}/></FormField></div><FieldError>{err}</FieldError>
<p className="mt-2 text-[11px] text-muted-foreground">Submits for Finance Manager approval (maker-checker). Allocation basis options: {allocationBases.join(" · ")}.</p>
<div className="mt-4 flex justify-end gap-2"><Button variant="secondary" onClick={()=>onOpenChange(false)}>Cancel</Button><Button onClick={submit}>Submit for approval</Button></div></ModalShell>}
