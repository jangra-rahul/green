import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return <button className={cn("inline-flex h-control items-center justify-center gap-2 rounded-[10px] px-4 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50", variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90", variant === "secondary" && "border border-border bg-surface text-foreground hover:bg-muted", variant === "ghost" && "text-muted-foreground hover:bg-muted hover:text-foreground", className)} {...props} />;
}

export function IconButton({ label, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return <button aria-label={label} title={label} className={cn("inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)} {...props} />;
}

export function DashboardCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <section className={cn("rounded-card border border-border bg-surface", className)} {...props} />;
}

const badgeStyles = { success: "bg-success-soft text-success", warning: "bg-warning-soft text-warning", danger: "bg-danger-soft text-danger", info: "bg-info-soft text-info", neutral: "bg-muted text-muted-foreground" };
export function StatusBadge({ tone = "neutral", children, className }: { tone?: keyof typeof badgeStyles; children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex min-h-5 items-center rounded-md px-2 py-0.5 text-[11px] font-semibold", badgeStyles[tone], className)}>{children}</span>;
}

export function Avatar({ initials, tone = "mint", className }: { initials: string; tone?: "mint" | "blue" | "green"; className?: string }) {
  const tones = { mint: "bg-success-soft text-success", blue: "bg-info-soft text-info", green: "bg-sidebar-profile text-sidebar-foreground" };
  return <span className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold", tones[tone], className)}>{initials}</span>;
}

export function SelectMenu({ label, items }: { label: string; items: string[] }) {
  return <DropdownMenu.Root><DropdownMenu.Trigger asChild><Button variant="secondary" className="min-w-28 justify-between">{label}<ChevronDown size={15} /></Button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content align="end" sideOffset={6} className="z-50 min-w-40 rounded-md border border-border bg-surface p-1 shadow-menu">{items.map(item => <DropdownMenu.Item key={item} className="cursor-pointer rounded-sm px-3 py-2 text-sm outline-none hover:bg-muted focus:bg-muted">{item}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>;
}

export function Tabs({ value, onValueChange, items }: { value: string; onValueChange: (value: string) => void; items: { value: string; label: string }[] }) {
  return <TabsPrimitive.Root value={value} onValueChange={onValueChange}><TabsPrimitive.List className="flex gap-5 overflow-x-auto border-b border-border">{items.map(item => <TabsPrimitive.Trigger key={item.value} value={item.value} className="-mb-px shrink-0 border-b-2 border-transparent px-1 pb-2 text-[13px] font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary">{item.label}</TabsPrimitive.Trigger>)}</TabsPrimitive.List></TabsPrimitive.Root>;
}

export function ProgressBar({ value }: { value: number }) { return <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} /></div>; }
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) { return <input {...props} className={cn("h-control w-full rounded-md border border-input bg-surface px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20", props.className)} />; }
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea {...props} className={cn("min-h-20 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20", props.className)} />; }
export function FormField({ label, children }: { label: string; children: ReactNode }) { return <label className="grid gap-1.5 text-[13px] font-medium text-foreground"><span>{label}</span>{children}</label>; }
export function FilterButton(props: ButtonHTMLAttributes<HTMLButtonElement>) { return <Button variant="secondary" {...props} />; }
export function DataTable({ children }: { children: ReactNode }) { return <div className="overflow-x-auto"><table className="w-full min-w-[620px] border-collapse text-left text-sm">{children}</table></div>; }
export function TableRow({ children, className }: { children: ReactNode; className?: string }) { return <tr className={cn("border-b border-border transition-colors hover:bg-muted/50", className)}>{children}</tr>; }
export function EmptyState({ title, message }: { title: string; message: string }) { return <div className="grid min-h-44 place-items-center text-center"><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{message}</p></div></div>; }
export function DatePickerStyle(props: React.InputHTMLAttributes<HTMLInputElement>) { return <Input type="date" {...props} />; }
export function Pagination() { return <nav aria-label="Pagination" className="flex items-center gap-1"><IconButton label="Previous page"><ChevronLeft size={16} /></IconButton><span className="px-2 text-xs text-muted-foreground">1 / 1</span><IconButton label="Next page"><ChevronRight size={16} /></IconButton></nav>; }
export function ModalShell({ open, onOpenChange, title, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; children: ReactNode }) { return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-50 bg-overlay"/><Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-32px)] w-[min(560px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-card border border-border bg-surface p-card shadow-modal"><div className="mb-4 flex items-center justify-between"><Dialog.Title className="text-lg font-bold">{title}</Dialog.Title><Dialog.Close asChild><IconButton label="Close"><X size={18}/></IconButton></Dialog.Close></div>{children}</Dialog.Content></Dialog.Portal></Dialog.Root>; }
export function DrawerShell({ children }: { children: ReactNode }) { return <aside className="fixed inset-y-0 right-0 z-40 w-full max-w-md border-l border-border bg-surface p-card shadow-modal">{children}</aside>; }
export function Drawer({ open, onOpenChange, title, subtitle, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; subtitle?: string; children: ReactNode }) { return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-50 bg-overlay"/><Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[590px] flex-col border-l border-border bg-surface shadow-modal"><div className="flex items-start justify-between border-b border-border px-5 py-4"><div><Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>{subtitle&&<Dialog.Description className="mt-1 text-[13px] text-muted-foreground">{subtitle}</Dialog.Description>}</div><Dialog.Close asChild><IconButton label="Close"><X size={18}/></IconButton></Dialog.Close></div>{children}</Dialog.Content></Dialog.Portal></Dialog.Root>; }
export function FieldError({ children }: { children?: ReactNode }) { return children ? <span className="text-xs font-medium text-danger">{children}</span> : null; }
export function MetricCard({ children, className }: { children: ReactNode; className?: string }) { return <div className={cn("min-w-0 p-card", className)}>{children}</div>; }
export function ChartCard({ children, className }: { children: ReactNode; className?: string }) { return <DashboardCard className={className}>{children}</DashboardCard>; }
export function ActionList({ children }: { children: ReactNode }) { return <div className="divide-y divide-border">{children}</div>; }
export function ActionListItem({ children }: { children: ReactNode }) { return <div className="flex min-h-[62px] items-center gap-3 px-4">{children}</div>; }
