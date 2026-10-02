import {createFileRoute} from "@tanstack/react-router";
import {CalendarClock,Clock,Plus,Repeat} from "lucide-react";
import {useState} from "react";
import {AppShell} from "@/components/app-shell";
import {accruals,prepaidSchedule,prepaids} from "@/components/finance/accounting-data";
import {Kpis,Panel,RecordTable,Toolbar,pageMeta} from "@/components/finance/accounting-ui";
import {AccrualModal} from "@/components/finance/accounting-workflows";
import {FinancePage} from "@/components/finance/finance-ui";
import {Button,Tabs} from "@/components/ui/crm";
export const Route=createFileRoute("/finance/accruals/")({head:()=>pageMeta("Accruals & Prepaids","Accrual posting and reversal, prepaid expenses and recognition schedules."),component:Page});
function Page(){const [tab,setTab]=useState("accruals");const [modal,setModal]=useState<""|"accrual"|"prepaid">("");const [rows,setRows]=useState(accruals);
const post=(id:string)=>setRows(r=>r.map(x=>x[0]===id?[...x.slice(0,7),x[7]==="Posted"?"Reversed":"Posted"]:x));
return <AppShell crumbs={["Workspace","Finance ERP","Accruals"]}><FinancePage eyebrow="ACCRUAL & PREPAID ACCOUNTING" title="Accruals" description="Period-end accruals with automatic reversal and prepaid recognition schedules." actions={<Button onClick={()=>setModal(tab==="accruals"?"accrual":"prepaid")}><Plus size={15}/>{tab==="accruals"?"New accrual":"New prepaid"}</Button>}>
<div className="mt-5"><Kpis items={[["Open accruals","AED 573K","3 this period",<Clock/>],["Auto-reversals due","2","01 Oct 2026",<Repeat/>],["Prepaid balance","AED 1.86M","2 active schedules",<CalendarClock/>],["Recognition this month","AED 88K","Scheduled 30 Sep",<CalendarClock/>]]}/></div>
<div className="mt-4"><Tabs value={tab} onValueChange={setTab} items={[{value:"accruals",label:"Accruals"},{value:"prepaids",label:"Prepaids"}]}/></div>
<div className="mt-4 space-y-4">{tab==="accruals"?<Panel flush title="Accrual list"><Toolbar placeholder="Search accrual or counterparty" filters={[["Status",["All","Draft","Pending approval","Posted","Reversed"]]]}/><RecordTable headers={["Accrual","Description","Counterparty","Period","Amount","Dr / Cr","Reversal","Status","Action"]} badges={[7]} right={[4]} rows={rows.map(r=>[...r,r[7]==="Posted"||r[7]==="Pending approval"?<Button variant="secondary" className="h-7 px-2 text-[11px]" onClick={()=>post(r[0]??"")}>{r[7]==="Posted"?"Reverse":"Approve & post"}</Button>:"—"])}/></Panel>:<><Panel flush title="Prepaid list"><RecordTable headers={["Prepaid","Description","Supplier","Total","Period","Monthly","Remaining","Status"]} badges={[7]} right={[3,5,6]} rows={prepaids}/></Panel><Panel flush title="Recognition schedule — PPD-2026-0012" subtitle="Dr 5230 Insurance / Cr 1310 Prepaid expenses"><RecordTable headers={["Period","Amount","Journal","Status"]} badges={[3]} right={[1]} rows={prepaidSchedule}/></Panel></>}</div>
<AccrualModal open={modal==="accrual"} onOpenChange={o=>!o&&setModal("")}/><AccrualModal prepaid open={modal==="prepaid"} onOpenChange={o=>!o&&setModal("")}/></FinancePage></AppShell>}
