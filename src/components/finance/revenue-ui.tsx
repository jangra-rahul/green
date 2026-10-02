import {useState} from "react";
import {Button,FormField,Input,ModalShell,StatusBadge,Textarea} from "@/components/ui/crm";
import {RecordTable} from "./accounting-ui";
import {A,eligibilityFor,revenueRecords,type RevStatus,type RevenueRecord} from "./revenue-data";

export const revTone=(s:string)=>s==="Fully Recognized"||s==="Posted"||s==="Active"?"success":s==="Partially Recognized"||s==="Eligible"?"info":s==="On Hold"||s==="Adjustment Required"||s==="Reversed"?"danger":s==="Pending Review"||s==="Pending posting"||s==="Draft"?"warning":"neutral";
export function RevBadge({s}:{s:string}){return <StatusBadge tone={revTone(s) as "success"}>{s}</StatusBadge>}

/** Session store so runs/adjustments persist across pages until refresh. */
export const revStore={records:revenueRecords,set(id:string,patch:Partial<RevenueRecord>){this.records=this.records.map(r=>r.id===id?{...r,...patch}:r)}};

export function SalesDistinction(){return <div className="grid gap-2 text-[11px] text-muted-foreground sm:grid-cols-3">{[["Contracted / sales value","Commercial value of executed sales (CRM SPA)"],["Collections","Cash received from customers (Receivables)"],["Recognized revenue","Posted per Finance-configured accounting policy"]].map(([a,b])=><div key={a} className="rounded-md border border-border bg-muted/40 p-2"><strong className="block text-xs text-foreground">{a}</strong>{b}</div>)}</div>}

/** Preview → run → batch for review. Nothing posts until approved. */
export function RunRecognitionModal({open,onOpenChange,onRun}:{open:boolean;onOpenChange:(o:boolean)=>void;onRun:(ids:string[],amount:number)=>void}){
const [step,setStep]=useState<"preview"|"done">("preview");
const rows=revStore.records.filter(r=>["Eligible","Partially Recognized"].includes(r.status)).map(r=>{const fails=eligibilityFor(r).filter(e=>e[2]==="Failed").length;const amt=fails?0:Math.round((r.contract-r.recognized)*(r.status==="Eligible"?0.2:1));return {r,amt,fails}});
const ok=rows.filter(x=>x.amt>0);const total=ok.reduce((s,x)=>s+x.amt,0);
return <ModalShell open={open} onOpenChange={o=>{onOpenChange(o);if(!o)setStep("preview")}} title={step==="preview"?"Recognition preview · Sep 2026":"Recognition batch created"}>
{step==="preview"?<><p className="mb-3 text-xs text-muted-foreground">Amounts are calculated from each record's configured policy. Review before running — nothing is posted to the ledger until the batch is approved.</p><div className="rounded-md border border-border"><RecordTable headers={["Record","Unit","Policy basis","Eligible amount","Checks"]} right={[3]} rows={rows.map(({r,amt,fails})=>[r.id,r.unit,r.basis,amt?A(amt):"—",fails?<span className="text-danger">{fails} failed</span>:"Passed"])}/></div>
<div className="mt-3 flex justify-between text-xs"><span>{ok.length} records eligible</span><strong>{A(total)}</strong></div>
<div className="mt-4 flex justify-end gap-2"><Button variant="secondary" onClick={()=>onOpenChange(false)}>Cancel</Button><Button disabled={!ok.length} onClick={()=>{onRun(ok.map(x=>x.r.id),total);setStep("done")}}>Run recognition</Button></div></>
:<><p className="text-xs">Batch <strong>RRB-2026-09-03</strong> with {ok.length} records ({A(total)}) is in the review queue awaiting Finance Manager approval.</p><div className="mt-4 flex justify-end"><Button onClick={()=>{onOpenChange(false);setStep("preview")}}>Done</Button></div></>}
</ModalShell>}

export function AdjustmentModal({open,onOpenChange,record,onSubmit}:{open:boolean;onOpenChange:(o:boolean)=>void;record:RevenueRecord;onSubmit:(amount:number,reason:string)=>void}){
const [amount,setAmount]=useState("");const [reason,setReason]=useState("");const [err,setErr]=useState("");
const submit=()=>{const n=Number(amount.replace(/,/g,""));if(!n||Number.isNaN(n))return setErr("Enter a non-zero amount (negative to reduce).");if(record.recognized+n<0||record.recognized+n>record.contract)return setErr("Adjusted recognized revenue must stay between AED 0 and the contract value.");if(reason.trim().length<10)return setErr("A reason of at least 10 characters is required for audit.");onSubmit(n,reason);setAmount("");setReason("");setErr("");onOpenChange(false)};
return <ModalShell open={open} onOpenChange={onOpenChange} title={`Revenue adjustment · ${record.id}`}><div className="space-y-3"><p className="text-xs text-muted-foreground">Controlled Finance adjustment. Posted entries are never edited — an approved adjustment creates a new journal.</p><FormField label="Adjustment amount (AED)"><Input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="e.g. -70000"/></FormField><FormField label="Reason"><Textarea value={reason} onChange={e=>setReason(e.target.value)} placeholder="e.g. SPA price amendment CHG-0042"/></FormField>{err&&<p className="text-xs text-danger">{err}</p>}<div className="flex justify-end gap-2"><Button variant="secondary" onClick={()=>onOpenChange(false)}>Cancel</Button><Button onClick={submit}>Submit for approval</Button></div></div></ModalShell>}

export type {RevStatus};
