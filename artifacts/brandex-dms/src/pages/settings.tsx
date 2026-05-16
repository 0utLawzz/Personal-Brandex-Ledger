import { AppLayout } from "@/components/layout/app-layout";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="h-14 flex items-center px-6 border-b border-slate-200 bg-white">
        <h1 className="font-semibold text-slate-900">Settings</h1>
      </div>
      <div className="flex-1 overflow-auto bg-slate-50 p-6">
        <div className="max-w-xl space-y-6">

          <section className="bg-white border border-slate-200 rounded-md divide-y divide-slate-100">
            <div className="px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-800 mb-0.5">System</h2>
              <p className="text-xs text-slate-500">Brandex DMS — Trademark & Document Management</p>
            </div>
            <div className="px-5 py-3 flex justify-between items-center">
              <div>
                <div className="text-sm text-slate-700 font-medium">Currency</div>
                <div className="text-xs text-slate-500">All financial values are displayed in PKR</div>
              </div>
              <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">PKR</span>
            </div>
            <div className="px-5 py-3 flex justify-between items-center">
              <div>
                <div className="text-sm text-slate-700 font-medium">Stage System</div>
                <div className="text-xs text-slate-500">Trademark case progress stages</div>
              </div>
              <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">1 — 4</span>
            </div>
            <div className="px-5 py-3 flex justify-between items-center">
              <div>
                <div className="text-sm text-slate-700 font-medium">Trademark Classes</div>
                <div className="text-xs text-slate-500">NICE classification system</div>
              </div>
              <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">1 — 45</span>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-md divide-y divide-slate-100">
            <div className="px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-800">Stage Definitions</h2>
            </div>
            {[
              { stage: 1, label: "Filed", desc: "Application submitted to IP Office" },
              { stage: 2, label: "Examination", desc: "Under review by examiner" },
              { stage: 3, label: "Publication", desc: "Published in Trademark Journal" },
              { stage: 4, label: "Registered", desc: "Certificate of registration issued" },
            ].map(({ stage, label, desc }) => (
              <div key={stage} className="px-5 py-3 flex items-center gap-4">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200 shrink-0">{stage}</span>
                <div>
                  <div className="text-sm text-slate-700 font-medium">{label}</div>
                  <div className="text-xs text-slate-500">{desc}</div>
                </div>
              </div>
            ))}
          </section>

          <section className="bg-white border border-slate-200 rounded-md divide-y divide-slate-100">
            <div className="px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-800">About</h2>
            </div>
            <div className="px-5 py-3 flex justify-between items-center">
              <span className="text-sm text-slate-600">Practice Jurisdiction</span>
              <span className="text-sm text-slate-800 font-medium">Pakistan</span>
            </div>
            <div className="px-5 py-3 flex justify-between items-center">
              <span className="text-sm text-slate-600">IP Office</span>
              <span className="text-sm text-slate-800 font-medium">Intellectual Property Organization of Pakistan</span>
            </div>
            <div className="px-5 py-3 flex justify-between items-center">
              <span className="text-sm text-slate-600">Version</span>
              <span className="text-xs font-mono text-slate-500">1.0.0</span>
            </div>
          </section>

        </div>
      </div>
    </AppLayout>
  );
}
