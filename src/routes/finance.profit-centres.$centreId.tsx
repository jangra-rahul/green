import {createFileRoute,Link,notFound} from "@tanstack/react-router";
import {AppShell} from "@/components/app-shell";
import {fmt,profitCentres} from "@/components/finance/accounting-data";
import {AuditPanel,Panel,RecordTable,pageMeta} from "@/components/finance/accounting-ui";
import {FinancePage} from "@/components/finance/finance-ui";
import {InfoGrid} from "@/components/sales/sales-ui";
import {StatusBadge} from "@/components/ui/crm";
export const Route=createFileRoute("/finance/profit-centres/$centreId")({loader:({params})=>{const centre=profitCentres.find(c=>c.id===params.centreId);if(!centre)throw notFound();return {centre}},head:({loaderData})=>loaderData?pageMeta(`${loaderData.centre.name} · Profit centre`,`Revenue, cost and margin for ${loaderData.centre.name}.`):{meta:[{title:"Profit centre not found"},{name:"robots",content:"noindex"}]},notFoundComponent:()=><AppShell><div className="p-8 text-sm">Profit centre not found. <Link to="/finance/profit-centres" className="text-primary">Back</Link></div></AppShell>,component:Page});
function Page(){const {centre:p}=Route.useLoaderData();const rev=p.revenue??0;const rows=[["4110 Property sales revenue","Revenue",fmt(rev*0.97)],["4210 Admin & transfer fees","Revenue",fmt(rev*0.03)],["5110 Construction cost","Direct cost",fmt(-p.actual*0.86)],["5210 Project management","Indirect cost",fmt(-p.actual*0.08)],["6100 Allocated overhead","Overhead",fmt(-p.actual*0.06)],["Gross margin","Result",fmt(rev-p.actual)]];
return <AppShell crumbs={["Finance ERP","Profit centres",p.id]}><FinancePage eyebrow={`PROFIT CENTRE · ${p.id}`} title={p.name} description={`${p.level} · ${p.parent} · Manager: ${p.manager}`} actions={<StatusBadge tone="success">{p.status}</StatusBadge>}>
<div className="mt-5"><Panel title="Summary"><InfoGrid items={[["Revenue",fmt(rev)],["Cost",fmt(p.actual)],["Margin",fmt(rev-p.actual)],["Margin %",rev?`${Math.round((rev-p.actual)/rev*100)}%`:"—"],["Project",p.project],["Revenue source","AR · SPA milestones"]]}/></Panel></div>
<div className="mt-4"><Panel flush title="Revenue / cost view" subtitle="FY2026 to date"><RecordTable headers={["Account","Classification","Amount"]} right={[2]} rows={rows}/></Panel></div><div className="mt-4"><AuditPanel/></div></FinancePage></AppShell>}
