import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { useListPayments, useGetPayment, useCreatePayment, useUpdatePayment, useDeletePayment, getListPaymentsQueryKey, getGetPaymentQueryKey, useListClients, useListCases } from "@workspace/api-client-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Receipt, ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { formatPKR } from "@/lib/format";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const paymentSchema = z.object({
  clientId: z.coerce.number().min(1, "Client is required"),
  caseId: z.coerce.number().optional().or(z.literal(0).transform(() => undefined)),
  type: z.enum(["due", "received"]),
  amount: z.coerce.number().min(1, "Amount is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

export default function PaymentsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");
  const { data: payments, isLoading } = useListPayments({});

  const handleSelectRow = (id: number) => {
    setSelectedId(id);
    setIsCreating(false);
    setMobileView("detail");
  };

  const handleNewEntry = () => {
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
        <h1 className="font-semibold text-slate-900">Payments & Billings</h1>
        <Button size="sm" onClick={handleNewEntry}>
          <Plus className="h-4 w-4 mr-1.5" />
          New Entry
        </Button>
      </div>
      <div className="flex-1 overflow-auto bg-white min-h-0">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-12 bg-slate-100 rounded animate-pulse" />)}
          </div>
        ) : payments?.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <Receipt className="h-8 w-8 text-slate-300 mb-3" />
            <p className="text-sm">No payment records found.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 border-b border-slate-200">
              <tr>
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Client</th>
                <th className="px-4 py-2 font-medium hidden sm:table-cell">Type</th>
                <th className="px-4 py-2 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments?.map((payment) => (
                <tr
                  key={payment.id}
                  onClick={() => handleSelectRow(payment.id)}
                  className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedId === payment.id ? "bg-blue-50/50" : ""}`}
                >
                  <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap text-xs md:text-sm">
                    {format(new Date(payment.date), "dd MMM yyyy")}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="font-medium text-slate-900 truncate max-w-[120px] md:max-w-none">{payment.clientName}</div>
                    {payment.trademarkNumber && (
                      <div className="text-xs text-slate-400 font-mono">TM: {payment.trademarkNumber}</div>
                    )}
                  </td>
                  <td className="px-4 py-2.5 hidden sm:table-cell">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      payment.type === "received"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}>
                      {payment.type === "received" ? "Payment" : "Bill"}
                    </span>
                  </td>
                  <td className={`px-4 py-2.5 text-right font-medium text-xs md:text-sm ${payment.type === "received" ? "text-green-600" : "text-slate-900"}`}>
                    {formatPKR(payment.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );

  const DetailPane = (
    <div className="h-full bg-slate-50 overflow-auto">
      <div className="md:hidden h-11 flex items-center px-3 border-b border-slate-200 bg-white shrink-0">
        <button onClick={handleMobileBack} className="flex items-center gap-1.5 text-sm text-blue-600 font-medium">
          <ArrowLeft size={15} />
          Payments
        </button>
      </div>
      {isCreating ? (
        <PaymentForm
          mode="create"
          onCancel={() => { setIsCreating(false); setMobileView("list"); }}
          onSuccess={(id) => { setIsCreating(false); setSelectedId(id); }}
        />
      ) : selectedId ? (
        <PaymentForm
          id={selectedId}
          mode="edit"
          onCancel={() => { setSelectedId(null); setMobileView("list"); }}
          onSuccess={() => {}}
        />
      ) : (
        <div className="h-full flex items-center justify-center text-slate-400 text-sm">
          Select an entry to view details
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

function PaymentForm({ id, mode, onCancel, onSuccess }: { id?: number; mode: "create" | "edit"; onCancel: () => void; onSuccess: (id: number) => void }) {
  const { data: payment, isLoading } = useGetPayment(id!, { query: { enabled: mode === "edit" && !!id, queryKey: getGetPaymentQueryKey(id!) } });
  const { data: clients } = useListClients({});
  const createMutation = useCreatePayment();
  const updateMutation = useUpdatePayment();
  const deleteMutation = useDeletePayment();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    values: {
      clientId: payment?.clientId || 0,
      caseId: payment?.caseId || 0,
      type: payment?.type || "received",
      amount: payment?.amount || 0,
      date: payment?.date ? new Date(payment.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      notes: payment?.notes || "",
    },
  });

  const selectedClientId = form.watch("clientId");
  const { data: clientCases } = useListCases({ clientId: selectedClientId }, { query: { enabled: !!selectedClientId } });

  const onSubmit = (data: z.infer<typeof paymentSchema>) => {
    const payload = { ...data, caseId: data.caseId || undefined };
    if (mode === "create") {
      createMutation.mutate({ data: payload as any }, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: getListPaymentsQueryKey() });
          toast({ title: "Entry created" });
          onSuccess(res.id);
        },
      });
    } else {
      updateMutation.mutate({ id: id!, data: payload as any }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListPaymentsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetPaymentQueryKey(id!) });
          toast({ title: "Entry updated" });
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
          {mode === "create" ? "New Ledger Entry" : "Entry Details"}
        </h2>
        {mode === "edit" && (
          <Button variant="outline" size="icon" className="text-red-600 hover:text-red-700" onClick={() => {
            if (confirm("Delete entry?")) {
              deleteMutation.mutate({ id: id! }, {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: getListPaymentsQueryKey() });
                  toast({ title: "Entry deleted" });
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
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="type" render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white"><SelectValue placeholder="Select type" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="due">Bill (Due)</SelectItem>
                    <SelectItem value="received">Payment (Received)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="date" render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl><Input {...field} type="date" className="bg-white" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="clientId" render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <Select
                onValueChange={(val) => { field.onChange(Number(val)); form.setValue("caseId", 0); }}
                value={field.value ? field.value.toString() : undefined}
                disabled={mode === "edit"}
              >
                <FormControl>
                  <SelectTrigger className="bg-white"><SelectValue placeholder="Select client" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clients?.map((client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="caseId" render={({ field }) => (
            <FormItem>
              <FormLabel>Related Case (Optional)</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value ? field.value.toString() : "0"}
                disabled={!selectedClientId}
              >
                <FormControl>
                  <SelectTrigger className="bg-white"><SelectValue placeholder="None" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">None (General Account)</SelectItem>
                  {clientCases?.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      TM: {c.trademarkNumber} (Class {c.trademarkClass})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="amount" render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (PKR)</FormLabel>
              <FormControl><Input {...field} type="number" className="bg-white font-medium" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="notes" render={({ field }) => (
            <FormItem>
              <FormLabel>Notes / Description</FormLabel>
              <FormControl>
                <textarea {...field} className="flex min-h-[80px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 mt-4">
            <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {mode === "create" ? "Save Entry" : "Update Entry"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
