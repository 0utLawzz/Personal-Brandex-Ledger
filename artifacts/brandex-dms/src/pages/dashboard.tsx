import { AppLayout } from "@/components/layout/app-layout";
import { useGetDashboardSummary } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPKR } from "@/lib/format";
import { Users, Briefcase, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { data: summary, isLoading } = useGetDashboardSummary();

  if (isLoading || !summary) {
    return (
      <AppLayout>
        <div className="p-6 h-full overflow-auto">
          <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-200 rounded-lg animate-pulse"></div>)}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 h-full overflow-auto bg-slate-50/50">
        <h1 className="text-2xl font-semibold tracking-tight mb-6 text-slate-900">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-sm border-slate-200 rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-semibold text-slate-900">{summary.totalClients.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-slate-200 rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Cases</CardTitle>
              <Briefcase className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-semibold text-slate-900">{summary.totalCases.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-slate-200 rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Due</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-semibold text-red-600">{formatPKR(summary.totalDue)}</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Received</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-semibold text-green-600">{formatPKR(summary.totalReceived)}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2 shadow-sm border-slate-200 rounded-lg">
            <CardHeader className="border-b border-slate-100 py-3 px-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4 text-slate-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {summary.recentActivity.map((activity) => (
                  <div key={activity.id} className="py-3 px-4 flex justify-between items-start hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="text-sm text-slate-900 font-medium">{activity.action}</p>
                      {activity.details && (
                        <p className="text-xs text-slate-500 mt-0.5">{activity.details}</p>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap ml-4">
                      {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                ))}
                {summary.recentActivity.length === 0 && (
                  <div className="py-8 text-center text-sm text-slate-500">No recent activity</div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 shadow-sm border-slate-200 rounded-lg">
            <CardHeader className="border-b border-slate-100 py-3 px-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-slate-500" />
                Cases by Stage
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 max-h-[400px] overflow-auto">
                {summary.casesByStage.map((item) => (
                  <div key={item.stage} className="py-2.5 px-4 flex justify-between items-center">
                    <span className="text-sm text-slate-700">Stage {item.stage}</span>
                    <span className="text-sm font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-700">{item.count}</span>
                  </div>
                ))}
                {summary.casesByStage.length === 0 && (
                  <div className="py-8 text-center text-sm text-slate-500">No cases found</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
