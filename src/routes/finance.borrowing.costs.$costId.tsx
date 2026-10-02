import {createFileRoute,Link,notFound} from "@tanstack/react-router";
import {useState} from "react";
import {AppShell} from "@/components/app-shell";
import {InfoGrid} from "@/components/sales/sales-ui";
import {Panel,RecordTable,pageMeta} from "@/components/finance/accounting-ui";
import {FinancePage} from "@/components/finance/finance-ui";
import {A} from "@/components/finance/revenue-data";
import {bcAudit} from "@/components/finance/borrowing-data";
import {BcBadge,DecisionModal,PolicyNote,bcStore} from "@/components/finance/borrowing-ui";
import {Button,Tabs} from "@/components/ui/crm";

export const Route=createFileRoute("/finance/borrowing/costs/$costId")({loader:({params})=>{if(!bcStore.costs.some(c=>c.id===params.costId))throw notFound();return {id:params.costId}},head:({loaderData})=>loaderData?pageMeta(`${loaderData.id} · Borrowing cost`,"Finance cost detail, capitalization decision and GL linkage."):{meta:[{title:"Unavailable"},{name:"robots",content:"noindex"}]},component:Page});

function Page(){
const {id}=Route.useLoaderData();const [c,setC]=useState(()=>bcStore.costs.find(x=>x.id===id)!);const [tab,setTab]=useState("overview");const [dec,setDec]=useState(false);const [msg,setMsg]=useState("");const [log,setLog]=useState(bcAudit.filter(a=>a[2]===id));
const update=(p:Partial<typeof c>,action:string)=>{bcStore.set(c.id,p);setLog(l=>[["Just now","You",c.id,action,c.status,p.status??c.status],...l]);setC({...c,...p})};
const posted=c.gl==="Posted";
return <AppShell crumbs={["Finance ERP","Borrowing costs",c.id]}><FinancePage eyebrow={`FINANCE COST · ${c.facility}`} title={c.id} description={`${c.type} · ${c.project} · ${c.period}`} actions={<div className="flex flex-wrap gap-2"><BcBadge s={c.status}/>
{["Draft","Under Review"].includes(c.status)&&<Button onClick={()=>setDec(true)}>Capitalization decision</Button>}
{c.status==="Pending Approval"&&c.capitalized+c.expensed===c.amount&&<><Button onClick={()=>{const s=c.capitalized===c.amount?"Capitalized":c.capitalized===0?"Expensed":"Partially Capitalized";update({status:s,gl:"Posted",journal:"JE-2026-04471"},"Approved & posted");setMsg("Approved — journal JE-2026-04471 posted to General ledger and linked to this record.")}}>Approve & post</Button><Button variant="secondary" onClick={()=>{update({status:"Under Review",capitalized:0,expensed:0},"Rejected to preparer");setMsg("Returned to preparer.")}}>Reject</Button></>}
{c.status==="Pending Approval"&&c.capitalized+c.expensed!==c.amount&&<Button onClick={()=>setDec(true)}>Capitalization decision</Button>}
{posted&&<Button variant="secondary" onClick={()=>{update({},"Reclassification requested");setMsg("Reclassification draft created (JE-2026-04480 · reversal + repost). The original journal remains unchanged.")}}>Reclassify / adjust</Button>}
<Link to="/finance/borrowing" className="self-center text-xs font-semibold text-primary">Back</Link></div>}>
{msg&&<p className="mt-3 rounded-md border border-border bg-success-soft p-2 text-xs text-success">{msg}</p>}
<div className="mt-4"><Tabs value={tab} onValueChange={setTab} items={[{value:"overview",label:"Overview"},{value:"accounting",label:"Accounting"},{value:"history",label:"History"}]}/></div>
<div className="mt-4 space-y-4">
{tab==="overview"&&<><Panel title="Finance cost"><InfoGrid items={[["Facility",c.facility],["Project",c.project],["Period",c.period],["Cost type",c.type],["Source",c.source],["Source reference",c.sourceRef],["Amount",A(c.amount)],["Capitalized",A(c.capitalized)],["Expensed",A(c.expensed)],["Policy",c.policy],["Prepared by",c.preparedBy]]}/></Panel><PolicyNote/></>}
{tab==="accounting"&&<Panel flush title="GL posting" subtitle={posted?"Posted — protected. Corrections only via adjustment, reclassification or reversal.":"Not posted — journal is created only on approval."}><RecordTable headers={["Account","Debit","Credit"]} right={[1,2]} rows={[["1720 Capitalized borrowing cost (project WIP)",A(c.capitalized),"—"],["7110 Finance cost (P&L)",A(c.expensed),"—"],["2210 Accrued interest / bank","—",A(c.capitalized+c.expensed)]]}/><p className="border-t border-border p-3 text-xs">Journal: <strong>{c.journal}</strong> · Status <BcBadge s={c.gl}/></p></Panel>}
{tab==="history"&&<Panel flush title="Audit history"><RecordTable headers={["When","User","Record","Action","From","To"]} empty="No history yet." rows={log}/></Panel>}
</div>
<DecisionModal cost={c} open={dec} onOpenChange={setDec} onSubmit={(cap,exp,reason)=>{update({capitalized:cap,expensed:exp,status:"Pending Approval"},`Decision submitted: ${A(cap)} capitalized / ${A(exp)} expensed — ${reason}`);setMsg("Decision submitted for Finance Manager approval.")}}/>
</FinancePage></AppShell>}
