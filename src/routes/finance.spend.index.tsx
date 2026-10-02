import {createFileRoute} from "@tanstack/react-router";
import {Building2,PieChart,TrendingUp,Users} from "lucide-react";
import {AppShell} from "@/components/app-shell";
import {Kpis,Panel,RecordTable,pageMeta} from "@/components/finance/accounting-ui";
import {FinancePage} from "@/components/finance/finance-ui";
import {budgets,spendByCategory,spendBySupplier,spendTrend} from "@/components/finance/spend-data";
import {fmt} from "@/components/finance/accounting-data";
import {ProgressBar,SelectMenu} from "@/components/ui/crm";
export const Route=createFileRoute("/finance/spend/")({head:()=>pageMeta("Spend Analytics","Spend by project, supplier, category and cost centre with concentration and budget comparison."),component:Page});
function Page(){return <AppShell crumbs={["Workspace","Finance ERP","Spend analytics"]}><FinancePage eyebrow="SPEND ANALYTICS" title="Spend analytics" description="Consolidated spend from AP invoices and expenses." actions={<div className="flex gap-2"><SelectMenu label="FY2026" items={["FY2026","Q3 2026","Sep 2026"]}/><SelectMenu label="All projects" items={["All projects","Horizon Residences","Green Park","Creek Vista"]}/></div>}>
<div className="mt-5"><Kpis items={[["Total spend YTD","AED 19.3M","AP + expenses",<TrendingUp/>],["Active suppliers","64","12 new this year",<Users/>],["Top 5 concentration","68%","BuildTech 32%",<PieChart/>],["Projects","3","+ corporate",<Building2/>]]}/></div>
<div className="mt-4 grid gap-4 xl:grid-cols-2"><Panel title="Spend trend" subtitle="AED millions per month"><div className="grid h-36 grid-cols-6 items-end gap-3 border-b border-border px-2">{spendTrend.map(([m,v])=><div key={m} className="mx-auto w-5 rounded-t-sm bg-primary" style={{height:`${v/4*100}%`}} title={`AED ${v}M`}/>)}</div><div className="mt-2 grid grid-cols-6 text-center text-[10px] text-muted-foreground">{spendTrend.map(([m])=><span key={m}>{m}</span>)}</div></Panel>
<Panel title="Spend by category">{spendByCategory.map(([l,v])=><div key={l} className="mb-2"><div className="mb-1 flex justify-between text-xs"><span>{l}</span><strong>{v}%</strong></div><ProgressBar value={v}/></div>)}</Panel></div>
<div className="mt-4 grid gap-4 xl:grid-cols-2"><Panel flush title="Top suppliers" subtitle="Sourced from Accounts payable"><RecordTable headers={["Supplier","Spend","Share","Invoices","Category"]} right={[1,2,3]} rows={spendBySupplier}/></Panel>
<Panel flush title="Budget vs spend by cost centre"><RecordTable headers={["Cost centre","Budget","Spend","Utilisation"]} right={[1,2]} rows={budgets.filter(b=>b.fy==="FY2026").map(b=>[`${b.costCentre} · ${b.name}`,fmt(b.amount),fmt(b.actual),<div className="flex w-28 items-center gap-2"><ProgressBar value={Math.min(100,b.actual/b.amount*100)}/><span>{Math.round(b.actual/b.amount*100)}%</span></div>])}/></Panel></div></FinancePage></AppShell>}
