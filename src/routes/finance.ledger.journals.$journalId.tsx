import {createFileRoute,Link,notFound} from "@tanstack/react-router";
import {useState} from "react";
import {AppShell} from "@/components/app-shell";
import {journals,type Journal} from "@/components/finance/accounting-data";
import {AuditPanel,JournalLines,Panel,Placeholder,pageMeta} from "@/components/finance/accounting-ui";
import {ReasonModal} from "@/components/finance/accounting-workflows";
import {FinancePage} from "@/components/finance/finance-ui";
import {InfoGrid} from "@/components/sales/sales-ui";
import {Button,StatusBadge} from "@/components/ui/crm";
export const Route=createFileRoute("/finance/ledger/journals/$journalId")({loader:({params})=>{const journal=journals.find(j=>j.id===params.journalId);if(!journal)throw notFound();return {journal}},head:({loaderData})=>loaderData?pageMeta(`${loaderData.journal.id} · Journal`,`${loaderData.journal.description} — lines, approval, posting and audit history.`):{meta:[{title:"Journal not found"},{name:"robots",content:"noindex"}]},notFoundComponent:Missing,component:Page});
function Missing(){return <AppShell crumbs={["Finance ERP","General ledger"]}><div className="p-8 text-sm">Journal not found. <Link to="/finance/ledger" className="text-primary">Back to General ledger</Link></div></AppShell>}
const sourceLink=(j:Journal)=>j.sourceRef.startsWith("RCT")?<Link to="/finance/receivables/$receivableId" params={{receivableId:"AR-2026-01842"}} className="text-primary">{j.sourceRef}</Link>:j.sourceRef.startsWith("PAY")?<Link to="/finance/payables/$payableId" params={{payableId:"AP-2026-00979"}} className="text-primary">{j.sourceRef}</Link>:j.sourceRef.startsWith("TRF")?<Link to="/finance/cash-bank" className="text-primary">{j.sourceRef}</Link>:j.sourceRef.startsWith("DEP")?<Link to="/finance/assets" className="text-primary">{j.sourceRef}</Link>:j.sourceRef;
function Page(){const {journal:j}=Route.useLoaderData();const [status,setStatus]=useState<Journal["status"]>(j.status);const [log,setLog]=useState<string[][]>([]);const [modal,setModal]=useState<""|"reject"|"reverse">("");
const act=(next:Journal["status"],action:string,reason="")=>{setLog(l=>[["Just now","Maya Joseph",j.id,reason?`${action} — ${reason}`:action,status,next],...l]);setStatus(next)};const locked=status==="Posted"||status==="Reversed";
return <AppShell crumbs={["Finance ERP","General ledger",j.id]}><FinancePage eyebrow={`JOURNAL · ${j.type.toUpperCase()}`} title={j.id} description={j.description} actions={<div className="flex flex-wrap items-center gap-2"><StatusBadge tone={status==="Posted"?"success":status==="Reversed"||status==="Rejected"?"danger":status==="Draft"?"neutral":"warning"}>{status}</StatusBadge>
{status==="Draft"&&<Button onClick={()=>act("Pending Approval","Submitted for approval")}>Submit for approval</Button>}
{status==="Pending Approval"&&<><Button variant="secondary" onClick={()=>setModal("reject")}>Reject</Button><Button onClick={()=>act("Approved","Approved")}>Approve</Button></>}
{status==="Approved"&&<Button onClick={()=>act("Posted","Posted to Sep 2026")}>Post journal</Button>}
{status==="Posted"&&<Button variant="secondary" onClick={()=>setModal("reverse")}>Reverse</Button>}</div>}>
<div className="mt-5 grid gap-4 xl:grid-cols-[1fr_340px]"><Panel title="Journal header"><InfoGrid items={[["Date",j.date],["Period",`${j.period} · Open`],["Type",j.type],["Source",j.source],["Created by",j.createdBy],["Amount",`AED ${j.amount.toLocaleString()}`]]}/><div className="mt-4 text-xs">Source document: <strong>{sourceLink(j)}</strong></div></Panel>
<Panel title="Controls">{locked?<Placeholder title="Immutable record">Posted journals cannot be edited or deleted. Corrections are made through a reversing journal that references this entry.</Placeholder>:<Placeholder title="Approval workflow">Draft → Finance Manager approval → Posting. Segregation of duties prevents the preparer from approving.</Placeholder>}</Panel></div>
<div className="mt-4"><Panel flush title="Journal lines"><JournalLines lines={j.lines}/></Panel></div>
<div className="mt-4"><AuditPanel rows={[...log,["25 Sep · 10:42 AM",j.createdBy,j.id,"Created",  "—",j.status]]}/></div>
<ReasonModal open={modal==="reject"} onOpenChange={o=>!o&&setModal("")} title="Reject journal" label="Reject" onConfirm={r=>act("Rejected","Rejected",r)}/>
<ReasonModal open={modal==="reverse"} onOpenChange={o=>!o&&setModal("")} title="Reverse posted journal" label="Create reversal" note="A new reversing journal with opposite debits and credits will be posted to the current open period." onConfirm={r=>act("Reversed","Reversed",r)}/>
</FinancePage></AppShell>}
