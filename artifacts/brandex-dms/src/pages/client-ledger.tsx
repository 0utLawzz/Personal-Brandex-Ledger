import { AppLayout } from "@/components/layout/app-layout";
import { useGetClientLedger, getGetClientLedgerQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { formatPKR, getStageColor } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ClientLedgerPage() {
  const params = useParams();
  const id = Number(params.id);
  const { data: ledger, isLoading } = useGetClientLedger(id, { query: { enabled: !!id, queryKey: getGetClientLedgerQueryKey(id) } });

  if (isLoading || !ledger) {
    return (
      <AppLayout>
        <div className="p-6 h-full overflow-auto">
          <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-6"></div>
        </div>
      </AppLayout>
    );
  }

  const { client, cases, payments, totalDue, totalReceived, balance } = ledger;

  const chartData = payments.reduce((acc: any[], payment) => {
    const month = format(new Date(payment.date), "MMM yyyy");
    let existing = acc.find(item => item.month === month);
    if (!existing) {
      existing = { month, due: 0, received: 0 };
      acc.push(existing);
    }
    if (payment.type === "due") existing.due += payment.amount;
    else existing.received += payment.amount;
    return acc;
  }, []);

  return (
    <AppLayout>
      <div className="h-full flex flex-col bg-slate-50">
        <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center gap-4">
          <Link href="/clients">
            <Button variant="ghost" size="icon" className="-ml-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="text-xs text-slate-500 font-mono">{client.clientCode}</div>
            <h1 className="text-xl font-semibold text-slate-900">{client.name} - Ledger</h1>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Billed</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-semibold text-slate-900">{formatPKR(totalDue)}</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Received</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-semibold text-green-600">{formatPKR(totalReceived)}</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">Outstanding Balance</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className={`text-2xl font-semibold ${balance > 0 ? 'text-red-600' : 'text-slate-900'}`}>
                  {formatPKR(balance)}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-2 shadow-sm border-slate-200">
              <CardHeader className="py-3 px-4 border-b border-slate-100">
                <CardTitle className="text-sm font-semibold">Payment History</CardTitle>
              </CardHeader>
              <CardContent className="p-4 h-[300px]">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} width={80} />
                      <Tooltip 
                        formatter={(value: number) => formatPKR(value)}
                        contentStyle={{ fontSize: '12px', borderRadius: '6px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                      />
                      <Bar dataKey="due" name="Billed" fill="#94A3B8" radius={[2, 2, 0, 0]} maxBarSize={40} />
                      <Bar dataKey="received" name="Received" fill="#22C55E" radius={[2, 2, 0, 0]} maxBarSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-sm">No payment data available</div>
                )}
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-slate-200 flex flex-col">
              <CardHeader className="py-3 px-4 border-b border-slate-100">
                <CardTitle className="text-sm font-semibold">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-auto max-h-[300px]">
                <div className="divide-y divide-slate-100">
                  {payments.slice(0, 10).map(payment => (
                    <div key={payment.id} className="p-3 flex justify-between items-center hover:bg-slate-50">
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {payment.type === 'due' ? 'Billed' : 'Payment Received'}
                        </div>
                        <div className="text-xs text-slate-500 flex gap-2 mt-0.5">
                          <span>{format(new Date(payment.date), "MMM d, yyyy")}</span>
                          {payment.trademarkNumber && <span>• TM: {payment.trademarkNumber}</span>}
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${payment.type === 'received' ? 'text-green-600' : 'text-slate-900'}`}>
                        {payment.type === 'received' ? '+' : ''}{formatPKR(payment.amount)}
                      </div>
                    </div>
                  ))}
                  {payments.length === 0 && <div className="p-6 text-center text-sm text-slate-500">No transactions</div>}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="py-3 px-4 border-b border-slate-100">
              <CardTitle className="text-sm font-semibold">Cases ({cases.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-2 font-medium">TM Number</th>
                    <th className="px-4 py-2 font-medium">Class</th>
                    <th className="px-4 py-2 font-medium">Stage</th>
                    <th className="px-4 py-2 font-medium text-right">Billed</th>
                    <th className="px-4 py-2 font-medium text-right">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cases.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="px-4 py-2 font-mono text-xs text-blue-600 hover:underline">
                        <Link href={`/cases?id=${c.id}`}>{c.trademarkNumber}</Link>
                      </td>
                      <td className="px-4 py-2 text-slate-600">Class {c.trademarkClass}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStageColor(c.stage)}`}>
                          Stage {c.stage}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right text-slate-900">{formatPKR(c.due)}</td>
                      <td className="px-4 py-2 text-right text-green-600">{formatPKR(c.received)}</td>
                    </tr>
                  ))}
                  {cases.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">No cases found</td></tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>

        </div>
      </div>
    </AppLayout>
  );
}
