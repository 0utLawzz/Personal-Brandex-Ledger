import { AppLayout } from "@/components/layout/app-layout";
import { useGetClientLedger, getGetClientLedgerQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { formatPKR, getStageColor } from "@/lib/format";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ClientLedgerPage() {
  const params = useParams();
  const id = Number(params.id);
  const { data: ledger, isLoading } = useGetClientLedger(id, { query: { enabled: !!id, queryKey: getGetClientLedgerQueryKey(id) } });

  if (isLoading || !ledger) {
    return (
      <AppLayout>
        <div className="p-4 md:p-6 h-full overflow-auto">
          <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-6" />
        </div>
      </AppLayout>
    );
  }

  const { client, cases, payments, totalDue, totalReceived, balance } = ledger;

  const chartData = payments.reduce((acc: any[], payment) => {
    const month = format(new Date(payment.date), "MMM yy");
    let existing = acc.find((item) => item.month === month);
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
      <div className="h-full flex flex-col bg-slate-50 overflow-hidden">

        {/* Page header */}
        <div className="px-4 md:px-6 py-3 border-b border-slate-200 bg-white flex items-center gap-3 shrink-0">
          <Link href="/clients">
            <Button variant="ghost" size="icon" className="-ml-1 shrink-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="min-w-0">
            <div className="text-xs text-slate-500 font-mono">{client.clientCode}</div>
            <h1 className="text-base md:text-xl font-semibold text-slate-900 truncate">
              {client.name} — Ledger
            </h1>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-auto p-4 md:p-6 space-y-5">

          {/* Summary stats: 1 col on xs, 3 col on md */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Total Billed", value: formatPKR(totalDue), color: "text-slate-900" },
              { label: "Total Received", value: formatPKR(totalReceived), color: "text-green-600" },
              { label: "Outstanding", value: formatPKR(balance), color: balance > 0 ? "text-red-600" : "text-slate-900" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</div>
                <div className={`text-xl md:text-2xl font-semibold ${color}`}>{value}</div>
              </div>
            ))}
          </div>

          {/* Chart + Transactions: stacked on mobile, side-by-side on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-800">Payment History</h3>
              </div>
              <div className="p-4 h-56 md:h-72">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748B" }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748B" }} width={70} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip
                        formatter={(value: number) => formatPKR(value)}
                        contentStyle={{ fontSize: "12px", borderRadius: "6px", border: "1px solid #E2E8F0", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
                      />
                      <Bar dataKey="due" name="Billed" fill="#94A3B8" radius={[2, 2, 0, 0]} maxBarSize={36} />
                      <Bar dataKey="received" name="Received" fill="#22C55E" radius={[2, 2, 0, 0]} maxBarSize={36} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-sm">No payment data</div>
                )}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-slate-100 shrink-0">
                <h3 className="text-sm font-semibold text-slate-800">Recent Transactions</h3>
              </div>
              <div className="flex-1 overflow-auto max-h-56 md:max-h-72 divide-y divide-slate-100">
                {payments.slice(0, 10).map((payment) => (
                  <div key={payment.id} className="p-3 flex justify-between items-center hover:bg-slate-50">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-slate-900">
                        {payment.type === "due" ? "Billed" : "Payment Received"}
                      </div>
                      <div className="text-xs text-slate-500 flex gap-2 mt-0.5 flex-wrap">
                        <span>{format(new Date(payment.date), "MMM d, yyyy")}</span>
                        {payment.trademarkNumber && <span>• TM: {payment.trademarkNumber}</span>}
                      </div>
                    </div>
                    <div className={`text-sm font-medium shrink-0 ml-3 ${payment.type === "received" ? "text-green-600" : "text-slate-900"}`}>
                      {payment.type === "received" ? "+" : ""}{formatPKR(payment.amount)}
                    </div>
                  </div>
                ))}
                {payments.length === 0 && (
                  <div className="p-6 text-center text-sm text-slate-500">No transactions</div>
                )}
              </div>
            </div>
          </div>

          {/* Cases table — horizontally scrollable on mobile */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-800">Cases ({cases.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[480px]">
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
                      <td className="px-4 py-2.5 font-mono text-xs text-blue-600 hover:underline">
                        <Link href={`/cases?id=${c.id}`}>{c.trademarkNumber}</Link>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">Class {c.trademarkClass}</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStageColor(c.stage)}`}>
                          Stage {c.stage}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right text-slate-900">{formatPKR(c.due)}</td>
                      <td className="px-4 py-2.5 text-right text-green-600">{formatPKR(c.received)}</td>
                    </tr>
                  ))}
                  {cases.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">No cases found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
