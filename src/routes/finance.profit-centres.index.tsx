import {createFileRoute,Link} from "@tanstack/react-router";
import {Building2,Percent,TrendingUp,Wallet} from "lucide-react";
import {AppShell} from "@/components/app-shell";
import {fmt,profitCentres} from "@/components/finance/accounting-data";
import {Kpis,Panel,RecordTable,Toolbar,pageMeta} from "@/components/finance/accounting-ui";
import {FinancePage} from "@/components/finance/finance-ui";
export const Route=createFileRoute("/finance/profit-centres/")({head:()=>pageMeta("Profit Centres","Revenue, cost and margin by project and business unit."),component:Page});
function Page(){const r=profitCentres.reduce((s,p)=>s+(p.revenue??0),0),c=profitCentres.reduce((s,p)=>s+p.actual,0);return <AppShell crumbs={["Workspace","Finance ERP","Profit centres"]}><FinancePage eyebrow="PROFIT CENTRE ACCOUNTING" title="Profit centres" description="Revenue and cost view per project and business unit.">
<div className="mt-5"><Kpis items={[["Profit centres",String(profitCentres.length),"3 projects · 1 unit",<Building2/>],["Recognised revenue",`AED ${(r/1e6).toFixed(1)}M`,"FY2026 to date",<TrendingUp/>],["Attributed cost",`AED ${(c/1e6).toFixed(1)}M`,"Direct + allocated",<Wallet/>],["Gross margin",`${Math.round((r-c)/r*100)}%`,`AED ${((r-c)/1e6).toFixed(1)}M`,<Percent/>]]}/></div>
<div className="mt-4"><Panel flush title="Profit centres"><Toolbar placeholder="Search profit centre"/><RecordTable headers={["ID","Name","Group","Level","Manager","Revenue","Cost","Margin","Margin %","Status"]} badges={[9]} right={[5,6,7,8]} rows={profitCentres.map(p=>{const rev=p.revenue??0;return [<Link to="/finance/profit-centres/$centreId" params={{centreId:p.id}} className="font-semibold text-primary">{p.id}</Link>,p.name,p.parent,p.level,p.manager,fmt(rev),fmt(p.actual),fmt(rev-p.actual),rev?`${Math.round((rev-p.actual)/rev*100)}%`:"—",p.status]})}/></Panel></div></FinancePage></AppShell>}
