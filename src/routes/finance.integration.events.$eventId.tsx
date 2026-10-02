import {createFileRoute,Link,notFound} from "@tanstack/react-router";
import {useState} from "react";
import {AppShell} from "@/components/app-shell";
import {AuditPanel,Panel,Placeholder,pageMeta} from "@/components/finance/accounting-ui";
import {FinancePage} from "@/components/finance/finance-ui";
import {syncEvents,type SyncStatus} from "@/components/finance/integration-data";
import {SyncBadge} from "@/components/finance/integration-ui";
import {InfoGrid} from "@/components/sales/sales-ui";
import {Button} from "@/components/ui/crm";
export const Route=createFileRoute("/finance/integration/events/$eventId")({loader:({params})=>{const event=syncEvents.find(e=>e.id===params.eventId);if(!event)throw notFound();return {event}},head:({loaderData})=>loaderData?pageMeta(`${loaderData.event.id} · Sync event`,`${loaderData.event.event} for ${loaderData.event.customer} — status, references and retry.`):{meta:[{title:"Sync event not found"},{name:"robots",content:"noindex"}]},notFoundComponent:()=><AppShell><div className="p-8 text-sm">Sync event not found. <Link to="/finance/integration" className="text-primary">Back</Link></div></AppShell>,component:Page});
function Page(){const {event:e}=Route.useLoaderData();const [status,setStatus]=useState<SyncStatus>(e.status);const [attempts,setAttempts]=useState(e.attempts);const [log,setLog]=useState<string[][]>([]);const [note,setNote]=useState("");
const retry=()=>{setAttempts(a=>a+1);setLog(l=>[["Just now","Maya Joseph",e.id,`Retry #${attempts+1} · key ${e.idempotencyKey}`,status,e.status==="Failed"?"Failed":"Synced"],...l]);if(e.status==="Failed"){setNote("Retry did not create a duplicate. Still failing: link the customer to a Finance account first.")}else{setStatus("Synced");setNote("")}};
return <AppShell crumbs={["Finance ERP","Integration monitor",e.id]}><FinancePage eyebrow={`SYNC EVENT · ${e.direction}`} title={e.event} description={`${e.customer} · ${e.amount}`} actions={<div className="flex items-center gap-2"><SyncBadge status={status}/>{(status==="Failed"||status==="Manual Review Required"||status==="Pending")&&<Button onClick={retry}>{status==="Manual Review Required"?"Confirm & sync":"Retry"}</Button>}{status==="Conflict"&&<Link to="/finance/integration"><Button variant="secondary">Open conflict queue</Button></Link>}</div>}>
{note&&<p className="mt-4 rounded-md bg-warning-soft p-3 text-xs font-medium text-warning">{note}</p>}
<div className="mt-5 grid gap-4 xl:grid-cols-[1fr_360px]"><Panel title="Sync details"><InfoGrid items={[["Source system",e.source],["Source reference",e.sourceRef],["Target",e.target],["Target reference",e.targetRef],["Time",e.time],["Attempts",String(attempts)]]}/><p className="mt-4 text-xs"><span className="text-muted-foreground">Outcome: </span>{e.message}</p></Panel>
<Placeholder title="Duplicate prevention">Every event carries a unique key ({e.idempotencyKey}). Retries reuse the same key, so a receivable or receipt is never created twice.</Placeholder></div>
<div className="mt-4"><AuditPanel rows={[...log,[e.time,"System",e.id,"Event received","—",e.status]]}/></div></FinancePage></AppShell>}
