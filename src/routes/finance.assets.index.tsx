import {createFileRoute,Link} from "@tanstack/react-router";
import {Archive,Boxes,TrendingDown,Wallet} from "lucide-react";
import {useState} from "react";
import {AppShell} from "@/components/app-shell";
import {assetCategories,assets,fmt} from "@/components/finance/accounting-data";
import {Kpis,Panel,RecordTable,Toolbar,pageMeta} from "@/components/finance/accounting-ui";
import {FinancePage} from "@/components/finance/finance-ui";
import {Tabs} from "@/components/ui/crm";
export const Route=createFileRoute("/finance/assets/")({head:()=>pageMeta("Fixed Assets","Asset register, categories, depreciation and disposals."),component:Page});
function Page(){const [tab,setTab]=useState("register");const cost=assets.reduce((s,a)=>s+a.cost,0),acc=assets.reduce((s,a)=>s+a.accumulated,0);return <AppShell crumbs={["Workspace","Finance ERP","Assets"]}><FinancePage eyebrow="ASSET ACCOUNTING" title="Assets" description="Fixed asset register with acquisition, depreciation and disposal linked to AP and the ledger.">
<div className="mt-5"><Kpis items={[["Registered assets","101","5 categories",<Boxes/>],["Gross cost",`AED ${(cost/1e6).toFixed(2)}M`,"Shown: top assets",<Wallet/>],["Net book value",`AED ${((cost-acc)/1e6).toFixed(2)}M`,`Accumulated ${fmt(acc)}`,<TrendingDown/>],["Pending disposal","1","Awaiting approval",<Archive/>]]}/></div>
<div className="mt-4"><Tabs value={tab} onValueChange={setTab} items={[{value:"register",label:"Asset register"},{value:"categories",label:"Categories"}]}/></div>
<div className="mt-4">{tab==="register"?<Panel flush title="Asset register"><Toolbar placeholder="Search asset, tag or location" filters={[["Category",["All categories",...assetCategories.map(c=>c[0]??"")]],["Status",["All","In use","Pending disposal","Disposed"]]]}/><RecordTable headers={["Asset","Name","Category","Location","Acquired","Cost","Accum. dep.","NBV","Status"]} badges={[8]} right={[5,6,7]} rows={assets.map(a=>[<Link to="/finance/assets/$assetId" params={{assetId:a.id}} className="font-semibold text-primary">{a.id}</Link>,a.name,a.category,a.location,a.acquired,fmt(a.cost),fmt(a.accumulated),fmt(a.cost-a.accumulated),a.status])}/></Panel>:<Panel flush title="Asset categories" subtitle="Default GL, useful life and method per category"><RecordTable headers={["Category","Asset GL","Useful life","Method","Assets","Gross cost"]} right={[4,5]} rows={assetCategories}/></Panel>}</div></FinancePage></AppShell>}
