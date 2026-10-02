import {createFileRoute,Link} from "@tanstack/react-router";
import {Building2,CircleDollarSign,TrendingUp,Wallet} from "lucide-react";
import {useState} from "react";
import {AppShell} from "@/components/app-shell";
import {Kpis,Panel,RecordTable,pageMeta} from "@/components/finance/accounting-ui";
import {FinancePage} from "@/components/finance/finance-ui";
import {A,M,projectSales,revenueAudit} from "@/components/finance/revenue-data";
import {RevBadge,SalesDistinction,revStore} from "@/components/finance/revenue-ui";
import {Tabs} from "@/components/ui/crm";

export const Route=createFileRoute("/finance/revenue/projects/$projectId")({head:()=>pageMeta("Project revenue & sales","Project contract value, recognized and unrecognized revenue, collections and accounting."),component:Page});

function Page(){const {projectId}=Route.useParams();const p=projectSales.find(x=>x.id===projectId)??projectSales[0]!;const [tab,setTab]=useState("overview");const units=revStore.records.filter(r=>r.projectId===p.id);
return <AppShell crumbs={["Workspace","Finance ERP","Revenue recognition",p.project]}><FinancePage eyebrow="PROJECT REVENUE & SALES" title={p.project} description={`${p.totalUnits} total units · ${p.sold} sold · linked to Project 360 ${p.id}`}>
<div className="mt-5"><Kpis items={[["Contract value",M(p.contract),`${p.sold} units sold`,<CircleDollarSign/>],["Recognized revenue",M(p.recognized),`Unrecognized ${M(p.contract-p.recognized)}`,<TrendingUp/>],["Collected",M(p.collected),`Outstanding ${M(p.contract-p.collected)}`,<Wallet/>],["Project cost",M(p.cost),"From Project costing",<Building2/>]]}/></div>
<div className="mt-4"><Tabs value={tab} onValueChange={setTab} items={["Overview","Units","Contracts / SPA","Revenue recognition","Collections","Accounting","History"].map(l=>({value:l.toLowerCase().split(" ")[0]!,label:l}))}/></div>
<div className="mt-4 space-y-4">
{tab==="overview"&&<><SalesDistinction/><Panel flush title="Summary"><RecordTable headers={["Measure","Value","Source"]} right={[1]} rows={[["Total units",String(p.totalUnits),"CRM inventory"],["Units sold",String(p.sold),"CRM SPAs"],["Contract value",M(p.contract),"CRM SPAs"],["Recognized revenue",M(p.recognized),"General ledger 4110"],["Unrecognized revenue",M(p.contract-p.recognized),"Calculated"],["Collected",M(p.collected),"Receivables"],["Outstanding",M(p.contract-p.collected),"Receivables"]]}/><div className="border-t border-border p-3 text-right"><Link to="/projects/$projectId" params={{projectId:p.id}} className="text-xs text-primary">Open Project 360 →</Link></div></Panel></>}
{(tab==="units"||tab==="revenue")&&<Panel flush title={tab==="units"?"Unit sales":"Revenue recognition"} subtitle="Sample units for this project"><RecordTable headers={["Unit","Customer","SPA","Contract value","Recognition basis","Recognized","Remaining","Collected","Status","Actions"]} right={[3,5,6,7]} rows={units.map(r=>[r.unit,r.customer,r.spa,A(r.contract),r.basis,A(r.recognized),A(r.contract-r.recognized),A(r.collected),<RevBadge s={r.status}/>,<Link to="/finance/revenue/$revenueId" params={{revenueId:r.id}} className="text-primary">Open</Link>])}/></Panel>}
{tab==="contracts"&&<Panel flush title="Contracts / SPA"><RecordTable headers={["SPA","Unit","Customer","Executed","Status","Value"]} right={[5]} rows={units.map(r=>[r.spa,r.unit,r.customer,r.spaDate,r.spaStatus,A(r.contract)])}/></Panel>}
{tab==="collections"&&<Panel flush title="Collections"><RecordTable headers={["Unit","Customer","Contract","Collected","Outstanding"]} right={[2,3,4]} rows={units.map(r=>[r.unit,r.customer,A(r.contract),A(r.collected),A(r.contract-r.collected)])}/></Panel>}
{tab==="accounting"&&<Panel flush title="Revenue journals"><RecordTable headers={["Journal","Period","Description","Amount","Status"]} badges={[4]} right={[3]} rows={[["JE-2026-04441","Sep 2026",`Revenue recognition batch · ${p.project}`,M(p.recognized*0.06),"Posted"],["JE-2026-04344","Aug 2026",`Revenue recognition batch · ${p.project}`,M(p.recognized*0.08),"Posted"]]}/></Panel>}
{tab==="history"&&<Panel flush title="History"><RecordTable headers={["Time","User","Record","Action","Before","After"]} rows={revenueAudit}/></Panel>}
</div></FinancePage></AppShell>}
