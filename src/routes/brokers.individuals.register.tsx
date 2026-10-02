import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { BrokerRegistrationModal } from "@/components/brokers/broker-workflows";
import { useState } from "react";
export const Route=createFileRoute("/brokers/individuals/register")({head:()=>({meta:[{title:"Register Broker | Green Horizon CRM"},{name:"description",content:"Register an individual broker and agency relationship."},{property:"og:title",content:"Register Broker | Green Horizon CRM"},{property:"og:description",content:"Register an individual broker and agency relationship."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),component:Page});
function Page(){const [open,setOpen]=useState(true);return <AppShell crumbs={["Workspace","Brokers & agencies","Register broker"]}><div className="p-6"><h1 className="text-3xl font-bold">Broker registration</h1><p className="mt-2 text-sm text-muted-foreground">Complete the broker identity, registration, relationship and document details.</p></div><BrokerRegistrationModal open={open} onOpenChange={setOpen}/></AppShell>}
