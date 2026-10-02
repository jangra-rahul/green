import {createFileRoute,Link} from "@tanstack/react-router";
import {AlertTriangle,CheckCircle2,FileText,Send} from "lucide-react";
import {AppShell} from "@/components/app-shell";
import {eInvoices} from "@/components/finance/accounting-data";
import {Kpis,Panel,Placeholder,RecordTable,Toolbar,pageMeta} from "@/components/finance/accounting-ui";
import {FinancePage} from "@/components/finance/finance-ui";
export const Route=createFileRoute("/finance/e-invoicing/")({head:()=>pageMeta("E-Invoicing","Electronic invoices generated from receivables with submission status tracking."),component:Page});
function Page(){return <AppShell crumbs={["Workspace","Finance ERP","E-Invoicing"]}><FinancePage eyebrow="E-INVOICING" title="E-Invoicing" description="Structured e-invoices generated from Accounts Receivable, prepared for the UAE e-invoicing framework.">
<div className="mt-5"><Kpis items={[["E-invoices","5","This quarter",<FileText/>],["Ready to submit","1","Validated",<Send/>],["Accepted","1","By accredited provider",<CheckCircle2/>],["Validation failed","1","Needs correction",<AlertTriangle/>]]}/></div>
<div className="mt-4"><Placeholder title="Integration readiness">Provider connection is configured in Settings → Integrations. Submissions shown here are simulated until an accredited service provider is connected.</Placeholder></div>
<div className="mt-4"><Panel flush title="E-invoice list"><Toolbar placeholder="Search e-invoice, AR reference or customer" filters={[["Status",["All","Draft","Ready for submission","Submitted","Accepted","Validation failed"]]]}/><RecordTable headers={["E-invoice","Source AR","Customer","Customer TRN","Issue date","Amount","Type","Status"]} badges={[7]} right={[5]} rows={eInvoices.map(e=>[<Link to="/finance/e-invoicing/$invoiceId" params={{invoiceId:e[0]??""}} className="font-semibold text-primary">{e[0]}</Link>,e[1],e[2],e[3],e[4],e[5],e[6],e[7]])}/></Panel></div></FinancePage></AppShell>}
