import React from "react"
import { LayoutDashboard, Users, Briefcase, CreditCard, Settings } from "lucide-react"

export function CommandStrip() {
  return (
    <div className="flex h-[800px] w-[1280px] overflow-hidden bg-slate-50 font-sans text-slate-900 shadow-2xl ring-1 ring-slate-900/10">
      {/* Sidebar */}
      <div className="flex w-[240px] shrink-0 flex-col bg-[#0f172a] text-slate-300">
        <div className="flex h-14 items-center px-6 font-semibold text-white">
          Brandex DMS
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4 text-sm font-medium">
          <a href="#" className="flex items-center gap-3 rounded-md bg-white/10 px-3 py-2 text-white">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/5 hover:text-white transition-colors">
            <Users className="h-4 w-4" />
            Clients
          </a>
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/5 hover:text-white transition-colors">
            <Briefcase className="h-4 w-4" />
            Cases
          </a>
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/5 hover:text-white transition-colors">
            <CreditCard className="h-4 w-4" />
            Payments
          </a>
        </nav>
        <div className="p-3">
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-white/5 hover:text-white transition-colors">
            <Settings className="h-4 w-4" />
            Settings
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden bg-white">
        {/* Command Strip */}
        <div className="flex h-10 shrink-0 items-center border-b border-slate-200 bg-slate-50/80 px-6 text-xs font-medium text-slate-600 backdrop-blur-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-slate-900">
              <span className="font-mono text-slate-500">CLIENTS</span> 5
            </span>
            <div className="h-4 w-px bg-slate-300" />
            <span className="flex items-center gap-2 text-slate-900">
              <span className="font-mono text-slate-500">CASES</span> 9
            </span>
            <div className="h-4 w-px bg-slate-300" />
            <span className="flex items-center gap-2">
              <span className="font-mono text-slate-500">BILLED</span> PKR 712k
            </span>
            <div className="h-4 w-px bg-slate-300" />
            <span className="flex items-center gap-2 text-emerald-700">
              <span className="font-mono text-slate-500">RECEIVED</span> PKR 481k
            </span>
            <div className="h-4 w-px bg-slate-300" />
            <span className="flex items-center gap-2 text-amber-700">
              <span className="font-mono text-slate-500">OUTSTANDING</span> PKR 231k
            </span>
            <div className="h-4 w-px bg-slate-300" />
            <span className="flex items-center gap-2">
              <span className="font-mono text-slate-500">COLLECTION RATE</span> 67.6%
            </span>
          </div>
        </div>

        {/* Two Pane Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT PANE: Activity Feed (55%) */}
          <div className="flex w-[55%] flex-col border-r border-slate-200 bg-white">
            <div className="flex h-12 items-center border-b border-slate-100 px-6">
              <h2 className="text-xs font-bold tracking-wider text-slate-500">LIVE ACTIVITY</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {/* Activity Items */}
              <ActivityItem 
                type="CASE" 
                text={<span><span className="font-semibold text-slate-900">Case 43334</span> moved to <span className="font-medium text-slate-700">Stage 1</span></span>}
                time="2 mins ago"
              />
              <ActivityItem 
                type="PAYMENT" 
                text={<span>Payment <span className="font-medium text-emerald-700">PKR 70,000</span> received from Multan Auto Parts</span>}
                time="12 mins ago"
              />
              <ActivityItem 
                type="PAYMENT" 
                text={<span>Payment <span className="font-medium text-emerald-700">PKR 30,000</span> received from Peshawar Foods Group</span>}
                time="12 mins ago"
              />
              <ActivityItem 
                type="PAYMENT" 
                text={<span>Payment <span className="font-medium text-emerald-700">PKR 100,000</span> received from Islamabad Pharma</span>}
                time="12 mins ago"
              />
              <ActivityItem 
                type="CASE" 
                text={<span><span className="font-semibold text-slate-900">Case 511293</span> updated — Stage 4</span>}
                time="15 mins ago"
              />
              <ActivityItem 
                type="CLIENT" 
                text={<span><span className="font-semibold text-slate-900">Case 398471</span> created for Lahore Textile Mills</span>}
                time="18 mins ago"
              />
            </div>
          </div>

          {/* RIGHT PANE: Case Board (45%) */}
          <div className="flex w-[45%] flex-col bg-slate-50/50">
            <div className="flex h-12 items-center border-b border-slate-200 px-4 bg-white">
              <h2 className="text-xs font-bold tracking-wider text-slate-500">ACTIVE CASES</h2>
            </div>
            
            <div className="flex flex-1 gap-2 p-4 overflow-x-auto">
              {/* Stage 1 */}
              <StageColumn name="FILED" count={3} bgClass="bg-slate-100/80">
                <CaseCard tm="TM-43334" client="LTM-01" balance={0} />
                <CaseCard tm="TM-43335" client="LTM-01" balance={15000} />
                <CaseCard tm="TM-43340" client="PFG-02" balance={45000} />
              </StageColumn>

              {/* Stage 2 */}
              <StageColumn name="EXAMINATION" count={3} bgClass="bg-blue-50/50">
                <CaseCard tm="TM-42110" client="MAP-01" balance={0} />
                <CaseCard tm="TM-42111" client="MAP-01" balance={0} />
                <CaseCard tm="TM-42112" client="MAP-01" balance={21000} />
              </StageColumn>

              {/* Stage 3 */}
              <StageColumn name="PUBLICATION" count={2} bgClass="bg-amber-50/50">
                <CaseCard tm="TM-41005" client="ISB-04" balance={150000} />
                <CaseCard tm="TM-41008" client="ISB-04" balance={0} />
              </StageColumn>

              {/* Stage 4 */}
              <StageColumn name="REGISTERED" count={1} bgClass="bg-emerald-50/50">
                <CaseCard tm="TM-511293" client="KHI-09" balance={0} />
              </StageColumn>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ActivityItem({ type, text, time }: { type: 'CASE' | 'PAYMENT' | 'CLIENT', text: React.ReactNode, time: string }) {
  const styles = {
    CASE: { wrapper: "border-blue-500 bg-white", badge: "bg-blue-50 text-blue-700 ring-blue-600/20" },
    PAYMENT: { wrapper: "border-emerald-500 bg-emerald-50/30", badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/20" },
    CLIENT: { wrapper: "border-slate-500 bg-white", badge: "bg-slate-100 text-slate-700 ring-slate-600/20" }
  }

  const style = styles[type]

  return (
    <div className={`flex items-center justify-between gap-3 border-l-2 py-2 pl-3 pr-4 hover:bg-slate-50 transition-colors ${style.wrapper}`}>
      <div className="flex items-center gap-3">
        <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${style.badge}`}>
          {type}
        </span>
        <span className="text-[13px] text-slate-600">
          {text}
        </span>
      </div>
      <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
        {time}
      </span>
    </div>
  )
}

function StageColumn({ name, count, bgClass, children }: { name: string, count: number, bgClass: string, children: React.ReactNode }) {
  return (
    <div className={`flex w-[140px] shrink-0 flex-col rounded-md border border-slate-200 ${bgClass}`}>
      <div className="flex items-center justify-between border-b border-slate-200/60 px-3 py-2">
        <span className="text-[10px] font-bold tracking-wider text-slate-600">{name}</span>
        <span className="flex h-4 items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-bold text-slate-500 shadow-sm ring-1 ring-slate-200">
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-2">
        {children}
      </div>
    </div>
  )
}

function CaseCard({ tm, client, balance }: { tm: string, client: string, balance: number }) {
  return (
    <div className="flex flex-col rounded bg-white p-2 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow">
      <div className="mb-1 flex items-start justify-between">
        <span className="font-mono text-[11px] font-semibold text-slate-700">{tm}</span>
        {balance === 0 ? (
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" title="Settled" />
        ) : (
          <span className="text-[10px] font-bold text-amber-600">{(balance / 1000)}k</span>
        )}
      </div>
      <span className="text-[10px] font-medium text-slate-400">{client}</span>
    </div>
  )
}
