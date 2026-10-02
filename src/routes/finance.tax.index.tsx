import {createFileRoute,Link} from "@tanstack/react-router";
import {AlertTriangle,ArrowDownLeft,ArrowUpRight,Receipt} from "lucide-react";
import {useState} from "react";
import {AppShell} from "@/components/app-shell";
import {taxCodes,taxPeriodReport,taxTransactions} from "@/components/finance/accounting-data";
import {Kpis,Panel,RecordTable,Toolbar,pageMeta} from "@/components/finance/accounting-ui";
import {FinancePage} from "@/components/finance/finance-ui";
import {Button,Tabs} from "@/components/ui/crm";
export const Route=createFileRoute("/finance/tax/")({head:()=>pageMeta("VAT & Tax","VAT codes, tax transactions from AR and AP, review and period return."),component:Page});
function Page(){const [tab,setTab]=useState("tx");const [rows,setRows]=useState(taxTransactions);
const src=(ref:string)=>ref.startsWith("AR")?<Link to="/finance/receivables/$receivableId" params={{receivableId:ref}} className="text-primary">{ref}</Link>:<Link to="/finance/payables/$payableId" params={{payableId:ref}} className="text-primary">{ref}</Link>;
return <AppShell crumbs={["Workspace","Finance ERP","VAT & tax"]}><FinancePage eyebrow="VAT / TAXATION" title="VAT & tax" description="UAE VAT codes and transactions sourced from receivables and payables. Q3 2026 return period.">
<div className="mt-5"><Kpis items={[["Output VAT","AED 1.28M","Q3 2026",<ArrowUpRight/>],["Input VAT","AED 612K","Recoverable",<ArrowDownLeft/>],["Net VAT payable","AED 672K","Due 28 Oct 2026",<Receipt/>],["Exceptions",String(rows.filter(r=>r[8]!=="Reviewed").length),"Need tax review",<AlertTriangle/>]]}/></div>
<div className="mt-4"><Tabs value={tab} onValueChange={setTab} items={[{value:"tx",label:"Tax transactions"},{value:"codes",label:"Tax codes"},{value:"report",label:"Period report"}]}/></div>
<div className="mt-4">{tab==="tx"&&<Panel flush title="Tax transactions" subtitle="Each line links to its source AR / AP document"><Toolbar placeholder="Search transaction, party or source" filters={[["Direction",["All","Output","Input","Exempt"]],["Status",["All","Reviewed","Pending review","Exception"]]]}/><RecordTable headers={["Transaction","Date","Source","Party","Code","Taxable","VAT","Direction","Status","Review"]} badges={[8]} right={[5,6]} rows={rows.map((r,i)=>[r[0],r[1],src(r[2]??""),r[3],r[4],r[5],r[6],r[7],r[8],r[8]!=="Reviewed"?<Button variant="secondary" className="h-7 px-2 text-[11px]" onClick={()=>setRows(x=>x.map((y,j)=>j===i?[...y.slice(0,8),"Reviewed"]:y))}>Mark reviewed</Button>:"—"])}/></Panel>}
{tab==="codes"&&<Panel flush title="Tax codes"><RecordTable headers={["Code","Description","Rate","Type","GL","Status"]} badges={[5]} rows={taxCodes}/></Panel>}
{tab==="report"&&<Panel flush title="VAT return — Q3 2026 (Jul–Sep)" subtitle="Draft · figures from posted tax transactions"><RecordTable headers={["Box","Amount","VAT"]} right={[1,2]} rows={taxPeriodReport}/></Panel>}</div></FinancePage></AppShell>}
