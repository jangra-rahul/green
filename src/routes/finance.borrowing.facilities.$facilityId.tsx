import {createFileRoute,Link,notFound} from "@tanstack/react-router";
import {useState} from "react";
import {AppShell} from "@/components/app-shell";
import {FinancePage} from "@/components/finance/finance-ui";
import {InfoGrid} from "@/components/sales/sales-ui";
import {Panel,RecordTable,pageMeta} from "@/components/finance/accounting-ui";
import {A} from "@/components/finance/revenue-data";
import {K,bcAudit,facilities} from "@/components/finance/borrowing-data";
import {BcBadge,bcStore} from "@/components/finance/borrowing-ui";
import {Button,Tabs} from "@/components/ui/crm";

export const Route=createFileRoute("/finance/borrowing/facilities/$facilityId")({loader:({params})=>{const f=facilities.find(x=>x.id===params.facilityId);if(!f)throw notFound();return {f}},head:({loaderData})=>loaderData?pageMeta(`${loaderData.f.id} · ${loaderData.f.name}`,"Financing facility detail, finance costs and project allocation."):{meta:[{title:"Unavailable"},{name:"robots",content:"noindex"}]},component:Page});

function Page(){
const {f}=Route.useLoaderData();const [tab,setTab]=useState("overview");const [msg,setMsg]=useState("");
const costs=bcStore.costs.filter(c=>c.facility===f.id);const total=f.projects.reduce((s,p)=>s+p.share,0);
return <AppShell crumbs={["Finance ERP","Borrowing costs",f.id]}><FinancePage eyebrow={`FINANCING FACILITY · ${f.id}`} title={f.name} description={`Related project: ${f.projects.map(p=>p.project).join(", ")}`} actions={<div className="flex gap-2"><BcBadge s={f.status}/><Link to="/finance/borrowing" className="self-center text-xs font-semibold text-primary">Back</Link></div>}>
{msg&&<p className="mt-3 rounded-md border border-border bg-success-soft p-2 text-xs text-success">{msg}</p>}
<div className="mt-4"><Tabs value={tab} onValueChange={setTab} items={["Overview","Finance costs","Project allocation","Accounting","Documents","Activity","History"].map(l=>({value:l.toLowerCase().split(" ")[0]??l,label:l}))}/></div>
<div className="mt-4 space-y-4">
{tab==="overview"&&<Panel title="Facility information"><InfoGrid items={[["Facility ID",f.id],["Facility name",f.name],["Lender / provider",f.lender],["Currency",f.currency],["Facility amount",K(f.amount)],["Start date",f.start],["End date",f.end||"Not applicable"],["Finance owner",f.owner],["Reference",f.reference],["Notes",f.notes]]}/></Panel>}
{tab==="finance"&&<Panel flush title="Finance costs"><RecordTable headers={["Reference","Period","Type","Amount","Capitalized","Expensed","Status"]} right={[3,4,5]} empty="No finance costs recorded for this facility." rows={costs.map(c=>[<Link to="/finance/borrowing/costs/$costId" params={{costId:c.id}} className="font-semibold text-primary">{c.id}</Link>,c.period,c.type,A(c.amount),A(c.capitalized),A(c.expensed),<BcBadge s={c.status}/>])}/></Panel>}
{tab==="project"&&<Panel flush title="Project allocation" subtitle={total===100?"Allocation totals 100%.":`Allocation totals ${total}% — must equal 100% before approval.`}><RecordTable headers={["Project","Share","Allocated facility amount"]} right={[1,2]} rows={f.projects.map(p=>[p.project,`${p.share}%`,K(f.amount*p.share/100)])}/></Panel>}
{tab==="accounting"&&<Panel flush title="Account mapping" subtitle="Per configured borrowing cost policy"><RecordTable headers={["Purpose","Account"]} rows={[["Capitalized borrowing cost","1720 Capitalized borrowing cost (project WIP)"],["Expensed finance cost","7110 Finance cost"],["Accrued interest","2210 Accrued interest payable"],["Facility liability","2510 Bank borrowings"]]}/></Panel>}
{tab==="documents"&&<Panel flush title="Documents" actions={<Button variant="secondary" className="m-4 h-7 px-2 text-[11px]" onClick={()=>setMsg("Upload is simulated in this preview.")}>Upload</Button>}><RecordTable headers={["Document","Type","Uploaded"]} rows={[["Facility agreement.pdf","Agreement","15 Jan 2025"],["Interest notice Sep 2026.pdf","Lender notice","25 Sep 2026"]]}/></Panel>}
{(tab==="activity"||tab==="history")&&<Panel flush title={tab==="activity"?"Activity":"History"}><RecordTable headers={["When","User","Record","Action","From","To"]} empty="No activity yet." rows={bcAudit.filter(a=>a[2]===f.id||costs.some(c=>c.id===a[2]))}/></Panel>}
</div></FinancePage></AppShell>}
