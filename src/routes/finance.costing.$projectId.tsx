import {createFileRoute,Link,notFound} from "@tanstack/react-router";
import {AppShell} from "@/components/app-shell";
import {directCosts,fmt,indirectCosts,projectCosts} from "@/components/finance/accounting-data";
import {Panel,RecordTable,pageMeta} from "@/components/finance/accounting-ui";
import {BorrowingStrip} from "@/components/finance/borrowing-ui";
import {FinancePage} from "@/components/finance/finance-ui";
import {InfoGrid} from "@/components/sales/sales-ui";
import {ProgressBar} from "@/components/ui/crm";
export const Route=createFileRoute("/finance/costing/$projectId")({loader:({params})=>{const project=projectCosts.find(p=>p.id===params.projectId);if(!project)throw notFound();return {project}},head:({loaderData})=>loaderData?pageMeta(`${loaderData.project.project} · Project cost`,`Budget, committed and actual cost detail for ${loaderData.project.project}.`):{meta:[{title:"Project not found"},{name:"robots",content:"noindex"}]},notFoundComponent:()=><AppShell><div className="p-8 text-sm">Project not found. <Link to="/finance/costing" className="text-primary">Back</Link></div></AppShell>,component:Page});
function Page(){const {project:p}=Route.useLoaderData();return <AppShell crumbs={["Finance ERP","Costing",p.project]}><FinancePage eyebrow={`PROJECT COST · ${p.id}`} title={p.project} description="Cost breakdown by classification with source-document drill-down.">
<BorrowingStrip project={p.project}/>
<div className="mt-5 grid gap-4 xl:grid-cols-2"><Panel title="Budget position"><InfoGrid items={[["Budget",fmt(p.budget)],["Committed",fmt(p.committed)],["Actual",fmt(p.actual)],["Remaining",fmt(p.budget-p.actual-p.committed)],["Forecast at completion",fmt(p.actual+p.committed+(p.budget-p.actual-p.committed)*0.96)],["Status",p.status]]}/><div className="mt-4"><ProgressBar value={(p.actual+p.committed)/p.budget*100}/></div></Panel>
<Panel title="Cost breakdown">{[["Direct",p.direct],["Indirect",p.indirect],["Overhead",p.overhead]].map(([l,v])=><div key={String(l)} className="mb-3"><div className="mb-1 flex justify-between text-xs"><span>{l}</span><strong>{fmt(Number(v))}</strong></div><ProgressBar value={Number(v)/p.actual*100}/></div>)}</Panel></div>
<div className="mt-4 grid gap-4 xl:grid-cols-2"><Panel flush title="Direct costs"><RecordTable headers={["Category","Document","Amount","Status"]} badges={[3]} rows={directCosts.filter(d=>d[0]===p.id).map(d=>[d[1]??"",d[2]??"",d[4]??"",d[6]??""])}/></Panel><Panel flush title="Indirect costs"><RecordTable headers={["Category","Cost centre","Amount","Status"]} badges={[3]} rows={indirectCosts.filter(d=>d[0]===p.id).map(d=>[d[1]??"",d[2]??"",d[3]??"",d[5]??""])}/></Panel></div></FinancePage></AppShell>}
