import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { useListClients, useGetClient, useCreateClient, useUpdateClient, useDeleteClient, getListClientsQueryKey, getGetClientQueryKey } from "@workspace/api-client-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Trash2, ChevronRight, FileText } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { format } from "date-fns";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

const clientSchema = z.object({
  clientCode: z.string().min(1, "Required"),
  name: z.string().min(1, "Required"),
  city: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  notes: z.string().optional(),
});

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { data: clients, isLoading } = useListClients({ search });
  const [_, setLocation] = useLocation();

  return (
    <AppLayout>
      <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
        <ResizablePanel defaultSize={50} minSize={30} className="flex flex-col border-r border-slate-200">
          <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200 bg-white">
            <h1 className="font-semibold text-slate-900">Clients</h1>
            <Button size="sm" onClick={() => { setIsCreating(true); setSelectedId(null); }}>
              <Plus className="h-4 w-4 mr-2" />
              New Client
            </Button>
          </div>
          <div className="p-2 border-b border-slate-200 bg-slate-50">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search clients by name, code..."
                className="pl-9 bg-white h-9 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-white">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-12 bg-slate-100 rounded animate-pulse" />)}
              </div>
            ) : clients?.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No clients found</div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-2 font-medium">Code</th>
                    <th className="px-4 py-2 font-medium">Name</th>
                    <th className="px-4 py-2 font-medium">City</th>
                    <th className="px-4 py-2 font-medium">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {clients?.map((client) => (
                    <tr 
                      key={client.id} 
                      onClick={() => { setSelectedId(client.id); setIsCreating(false); }}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedId === client.id ? 'bg-blue-50/50' : ''}`}
                    >
                      <td className="px-4 py-2 font-mono text-xs text-slate-600">{client.clientCode}</td>
                      <td className="px-4 py-2 font-medium text-slate-900">{client.name}</td>
                      <td className="px-4 py-2 text-slate-600">{client.city || '-'}</td>
                      <td className="px-4 py-2 text-slate-600">{client.email || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50}>
          <div className="h-full bg-slate-50 overflow-auto">
            {isCreating ? (
              <ClientForm mode="create" onCancel={() => setIsCreating(false)} onSuccess={(id) => { setIsCreating(false); setSelectedId(id); }} />
            ) : selectedId ? (
              <ClientDetail id={selectedId} onDeleted={() => setSelectedId(null)} />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                Select a client to view details
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </AppLayout>
  );
}

function ClientForm({ id, mode, onCancel, onSuccess }: { id?: number, mode: 'create' | 'edit', onCancel: () => void, onSuccess: (id: number) => void }) {
  const { data: client, isLoading } = useGetClient(id!, { query: { enabled: mode === 'edit' && !!id, queryKey: getGetClientQueryKey(id!) } });
  const createMutation = useCreateClient();
  const updateMutation = useUpdateClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    values: {
      clientCode: client?.clientCode || "",
      name: client?.name || "",
      city: client?.city || "",
      email: client?.email || "",
      notes: client?.notes || "",
    }
  });

  const onSubmit = (data: z.infer<typeof clientSchema>) => {
    if (mode === 'create') {
      createMutation.mutate({ data }, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: getListClientsQueryKey() });
          toast({ title: "Client created" });
          onSuccess(res.id);
        }
      });
    } else {
      updateMutation.mutate({ id: id!, data }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListClientsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetClientQueryKey(id!) });
          toast({ title: "Client updated" });
          onSuccess(id!);
        }
      });
    }
  };

  if (mode === 'edit' && isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-6">{mode === 'create' ? 'New Client' : 'Edit Client'}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="clientCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. X-413" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <textarea 
                    {...field} 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {mode === 'create' ? 'Create' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function ClientDetail({ id, onDeleted }: { id: number, onDeleted: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const { data: client, isLoading } = useGetClient(id, { query: { enabled: !!id, queryKey: getGetClientQueryKey(id) } });
  const deleteMutation = useDeleteClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!client) return null;

  if (isEditing) {
    return <ClientForm id={id} mode="edit" onCancel={() => setIsEditing(false)} onSuccess={() => setIsEditing(false)} />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-slate-200 bg-white flex justify-between items-start">
        <div>
          <div className="text-sm text-slate-500 font-mono mb-1">{client.clientCode}</div>
          <h2 className="text-xl font-semibold text-slate-900">{client.name}</h2>
          <div className="text-sm text-slate-600 mt-2 flex gap-4">
            {client.city && <span>{client.city}</span>}
            {client.email && <span>{client.email}</span>}
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/clients/${id}/ledger`}>
            <Button variant="secondary" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View Ledger
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => {
            if (confirm("Are you sure?")) {
              deleteMutation.mutate({ id }, {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: getListClientsQueryKey() });
                  toast({ title: "Client deleted" });
                  onDeleted();
                }
              })
            }
          }}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-6 flex-1 overflow-auto">
        <div className="space-y-6 max-w-2xl">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wide">Notes</h3>
            <div className="bg-white border border-slate-200 rounded-md p-4 text-sm text-slate-700 whitespace-pre-wrap min-h-[100px]">
              {client.notes || <span className="text-slate-400 italic">No notes</span>}
            </div>
          </div>
          <div className="text-xs text-slate-400">
            Added on {format(new Date(client.createdAt), "MMM d, yyyy")}
          </div>
        </div>
      </div>
    </div>
  );
}
