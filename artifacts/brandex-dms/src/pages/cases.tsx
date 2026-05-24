import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { useListCases, useGetCase, useCreateCase, useUpdateCase, useDeleteCase, getListCasesQueryKey, getGetCaseQueryKey, useListClients } from "@workspace/api-client-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { formatPKR, getStageColor, STAGES } from "@/lib/format";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const caseSchema = z.object({
  clientId: z.coerce.number().min(1, "Client is required"),
  trademarkNumber: z.string().min(1, "Required").max(6),
  trademarkClass: z.coerce.number().min(1).max(45),
  stage: z.coerce.number().min(1).max(4),
  requiredDate: z.string().optional(),
  description: z.string().optional(),
  due: z.coerce.number().optional(),
  received: z.coerce.number().optional(),
});

export default function CasesPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");
  const { data: cases, isLoading } = useListCases({ search });

  const handleSelectRow = (id: number) => {
    setSelectedId(id);
    setIsCreating(false);
    setMobileView("detail");
  };

  const handleNewCase = () => {
    setIsCreating(true);
    setSelectedId(null);
    setMobileView("detail");
  };

  const handleMobileBack = () => {
    setMobileView("list");
    setIsCreating(false);
  };

  const ListPane = (
    <>
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200 bg-white shrink-0">
        <h1 className="font-semibold text-slate-900">Cases</h1>
        <Button size="sm" onClick={handleNewCase}>
          <Plus className="h-4 w-4 mr-1.5" />
          New Case
        </Button>
      </div>
      <div className="p-2 border-b border-slate-200 bg-slate-50 shrink-0">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search TM number, client..."
            className="pl-9 bg-white h-9 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-white min-h-0">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-10 bg-slate-100 rounded animate-pulse" />)}
          </div>
        ) : cases?.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No cases found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap min-w-[500px]">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 border-b border-slate-200 shadow-sm z-10">
                <tr>
                  <th className="px-3 py-2 font-medium">TM Number</th>
                  <th className="px-3 py-2 font-medium">Client</th>
                  <th className="px-3 py-2 font-medium hidden sm:table-cell">Class</th>
                  <th className="px-3 py-2 font-medium">Stage</th>
                  <th className="px-3 py-2 font-medium hidden md:table-cell">Required</th>
                  <th className="px-3 py-2 font-medium text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cases?.map((c) => {
                  const balance = (Number(c.due) || 0) - (Number(c.received) || 0);
                  return (
                    <tr
                      key={c.id}
                      onClick={() => handleSelectRow(c.id)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedId === c.id ? "bg-blue-50/50" : ""}`}
                    >
                      <td className="px-3 py-2 font-mono text-xs text-slate-900">{c.trademarkNumber}</td>
                      <td className="px-3 py-2">
                        <div className="text-slate-900 font-medium truncate max-w-[120px]">{c.clientName}</div>
                        <div className="text-slate-400 text-xs font-mono">{c.clientCode}</div>
                      </td>
                      <td className="px-3 py-2 text-slate-600 hidden sm:table-cell">Class {c.trademarkClass}</td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${getStageColor(c.stage)}`}>
                          S{c.stage}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-500 hidden md:table-cell">
                        {c.requiredDate ? formatDistanceToNow(new Date(c.requiredDate), { addSuffix: true }) : "-"}
                      </td>
                      <td className={`px-3 py-2 text-right font-medium ${balance > 0 ? "text-red-600" : "text-slate-500"}`}>
                        {formatPKR(balance)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );

  const DetailPane = (
    <div className="h-full bg-slate-50 overflow-auto">
      <div className="md:hidden h-11 flex items-center px-3 border-b border-slate-200 bg-white shrink-0">
        <button onClick={handleMobileBack} className="flex items-center gap-1.5 text-sm text-blue-600 font-medium">
          <ArrowLeft size={15} />
          Cases
        </button>
      </div>
      {isCreating ? (
        <CaseForm
          mode="create"
          onCancel={() => { setIsCreating(false); setMobileView("list"); }}
          onSuccess={(id) => { setIsCreating(false); setSelectedId(id); }}
        />
      ) : selectedId ? (
        <CaseForm
          id={selectedId}
          mode="edit"
          onCancel={() => { setSelectedId(null); setMobileView("list"); }}
          onSuccess={() => {}}
        />
      ) : (
        <div className="h-full flex items-center justify-center text-slate-400 text-sm">
          Select a case to view details
        </div>
      )}
    </div>
  );

  return (
    <AppLayout>
      {/* Mobile layout */}
      <div className="flex flex-col h-full md:hidden">
        {mobileView === "list" ? (
          <div className="flex flex-col flex-1 min-h-0">{ListPane}</div>
        ) : (
          <div className="flex flex-col flex-1 min-h-0">{DetailPane}</div>
        )}
      </div>

      {/* Desktop layout */}
      <ResizablePanelGroup direction="horizontal" className="h-full hidden md:flex items-stretch">
        <ResizablePanel defaultSize={60} minSize={40} className="flex flex-col border-r border-slate-200">
          {ListPane}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          {DetailPane}
        </ResizablePanel>
      </ResizablePanelGroup>
    </AppLayout>
  );
}

function CaseForm({ id, mode, onCancel, onSuccess }: { id?: number; mode: "create" | "edit"; onCancel: () => void; onSuccess: (id: number) => void }) {
  const { data: c, isLoading } = useGetCase(id!, { query: { enabled: mode === "edit" && !!id, queryKey: getGetCaseQueryKey(id!) } });
  const { data: clients } = useListClients({});
  const createMutation = useCreateCase();
  const updateMutation = useUpdateCase();
  const deleteMutation = useDeleteCase();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof caseSchema>>({
    resolver: zodResolver(caseSchema),
    values: {
      clientId: c?.clientId || 0,
      trademarkNumber: c?.trademarkNumber || "",
      trademarkClass: c?.trademarkClass || 1,
      stage: c?.stage || 1,
      requiredDate: c?.requiredDate ? new Date(c.requiredDate).toISOString().split("T")[0] : "",
      description: c?.description || "",
      due: c?.due || 0,
      received: c?.received || 0,
    },
  });

  const onSubmit = (data: z.infer<typeof caseSchema>) => {
    if (mode === "create") {
      createMutation.mutate({ data: { ...data, requiredDate: data.requiredDate || undefined } }, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: getListCasesQueryKey() });
          toast({ title: "Case created" });
          onSuccess(res.id);
        },
      });
    } else {
      updateMutation.mutate({ id: id!, data: { ...data, requiredDate: data.requiredDate || undefined } }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListCasesQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetCaseQueryKey(id!) });
          toast({ title: "Case updated" });
          onSuccess(id!);
        },
      });
    }
  };

  if (mode === "edit" && isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          {mode === "create" ? "New Case" : "Case Details"}
        </h2>
        {mode === "edit" && (
          <Button variant="outline" size="icon" className="text-red-600 hover:text-red-700" onClick={() => {
            if (confirm("Delete case?")) {
              deleteMutation.mutate({ id: id! }, {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: getListCasesQueryKey() });
                  toast({ title: "Case deleted" });
                  onCancel();
                },
              });
            }
          }}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="clientId" render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value ? field.value.toString() : undefined}>
                <FormControl>
                  <SelectTrigger className="bg-white"><SelectValue placeholder="Select a client" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clients?.map((client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name} ({client.clientCode})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="trademarkNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>TM Number</FormLabel>
                <FormControl><Input {...field} className="bg-white font-mono" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="trademarkClass" render={({ field }) => (
              <FormItem>
                <FormLabel>Class (1-45)</FormLabel>
                <FormControl><Input {...field} type="number" min={1} max={45} className="bg-white" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="stage" render={({ field }) => (
              <FormItem>
                <FormLabel>Stage</FormLabel>
                <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value ? field.value.toString() : undefined}>
                  <FormControl>
                    <SelectTrigger className="bg-white"><SelectValue placeholder="Select stage" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {STAGES.map((s) => (
                      <SelectItem key={s} value={s.toString()}>
                        {s === 1 ? "1 — Filed" : s === 2 ? "2 — Examination" : s === 3 ? "3 — Publication" : "4 — Registered"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="requiredDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Required Date</FormLabel>
                <FormControl><Input {...field} type="date" className="bg-white" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="due" render={({ field }) => (
              <FormItem>
                <FormLabel>Billed (PKR)</FormLabel>
                <FormControl><Input {...field} type="number" className="bg-white" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="received" render={({ field }) => (
              <FormItem>
                <FormLabel>Received (PKR)</FormLabel>
                <FormControl><Input {...field} type="number" className="bg-white" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description / Notes</FormLabel>
              <FormControl>
                <textarea {...field} className="flex min-h-[80px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 mt-4">
            <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {mode === "create" ? "Create Case" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
