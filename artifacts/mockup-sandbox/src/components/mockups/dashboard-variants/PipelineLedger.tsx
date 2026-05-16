import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CreditCard, 
  Settings,
  Clock,
  AlertCircle
} from "lucide-react";

export function PipelineLedger() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-[240px] flex-shrink-0 bg-[#0f172a] text-slate-300 flex flex-col">
        <div className="h-16 flex items-center px-6 font-bold text-white text-lg tracking-wide border-b border-slate-800/60">
          Brandex DMS
        </div>
        <nav className="flex-1 py-6 flex flex-col gap-1 px-3">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-blue-600/10 text-blue-400 rounded-md font-medium">
            <LayoutDashboard size={18} />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-md font-medium transition-colors">
            <Users size={18} />
            Clients
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-md font-medium transition-colors">
            <Briefcase size={18} />
            Cases
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-md font-medium transition-colors">
            <CreditCard size={18} />
            Payments
          </a>
        </nav>
        <div className="p-4 border-t border-slate-800/60">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-md font-medium transition-colors">
            <Settings size={18} />
            Settings
          </a>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Financial / Context Row */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-8 shrink-0 justify-between">
          <div className="flex items-center gap-10">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Portfolio</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-slate-800 tracking-tight">9</span>
                <span className="text-sm font-medium text-slate-500">Cases</span>
                <span className="text-slate-300 px-1">/</span>
                <span className="text-xl font-extrabold text-slate-800 tracking-tight">5</span>
                <span className="text-sm font-medium text-slate-500">Clients</span>
              </div>
            </div>
            
            <div className="h-10 w-px bg-slate-100"></div>
            
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Billed</p>
              <p className="text-xl font-bold text-slate-800 font-mono tracking-tight">PKR 712,000</p>
            </div>
            
            <div className="h-10 w-px bg-slate-100"></div>
            
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Collected</p>
              <div className="flex items-center gap-3">
                <p className="text-xl font-bold text-emerald-600 font-mono tracking-tight">PKR 481,000</p>
                <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">
                  67.6%
                </span>
              </div>
            </div>
            
            <div className="h-10 w-px bg-slate-100"></div>
            
            <div>
              <p className="text-[11px] font-bold text-amber-500/80 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                Outstanding <AlertCircle size={12} strokeWidth={3} />
              </p>
              <p className="text-xl font-bold text-amber-600 font-mono tracking-tight">
                PKR 231,000
              </p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Main Pipeline View */}
          <main className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
            <div className="max-w-5xl">
              <div className="mb-10">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Active Pipeline</h1>
                <p className="text-sm text-slate-500 mt-1.5">Case progression and financial exposure by stage.</p>
              </div>

              {/* The Pipeline Bar */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                
                {/* Visual Bar */}
                <div className="flex h-12 rounded-lg overflow-hidden shadow-inner border border-slate-200 my-2">
                  <div className="bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center relative group border-r border-white/50" style={{ width: '33.33%' }}>
                    <span className="font-bold text-slate-600 group-hover:text-slate-800">3</span>
                  </div>
                  <div className="bg-blue-100 hover:bg-blue-200 transition-colors cursor-pointer flex items-center justify-center relative group border-r border-white/50" style={{ width: '33.33%' }}>
                    <span className="font-bold text-blue-700 group-hover:text-blue-900">3</span>
                  </div>
                  <div className="bg-indigo-200 hover:bg-indigo-300 transition-colors cursor-pointer flex items-center justify-center relative group border-r border-white/50" style={{ width: '22.22%' }}>
                    <span className="font-bold text-indigo-800">2</span>
                  </div>
                  <div className="bg-emerald-300 hover:bg-emerald-400 transition-colors cursor-pointer flex items-center justify-center group" style={{ width: '11.11%' }}>
                    <span className="font-bold text-emerald-900">1</span>
                  </div>
                </div>

                {/* Pipeline Stats Columns */}
                <div className="flex gap-4 mt-8">
                  {/* Stage 1 */}
                  <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                      <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Stage 1: Filed</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-extrabold text-slate-800 tracking-tight">3 <span className="text-sm font-medium text-slate-500 tracking-normal">cases</span></p>
                      <p className="text-sm font-mono font-medium text-slate-600 bg-slate-200/50 inline-block px-2.5 py-1 rounded">PKR 185,000</p>
                    </div>
                  </div>

                  {/* Stage 2 */}
                  <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
                      <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wide">Stage 2: Examination</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-extrabold text-slate-800 tracking-tight">3 <span className="text-sm font-medium text-slate-500 tracking-normal">cases</span></p>
                      <p className="text-sm font-mono font-medium text-blue-800 bg-blue-100/70 inline-block px-2.5 py-1 rounded">PKR 275,000</p>
                    </div>
                  </div>

                  {/* Stage 3 */}
                  <div className="flex-1 bg-indigo-50 border border-indigo-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-400"></div>
                      <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-wide">Stage 3: Publication</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-extrabold text-slate-800 tracking-tight">2 <span className="text-sm font-medium text-slate-500 tracking-normal">cases</span></p>
                      <p className="text-sm font-mono font-medium text-indigo-800 bg-indigo-100/70 inline-block px-2.5 py-1 rounded">PKR 195,000</p>
                    </div>
                  </div>

                  {/* Stage 4 */}
                  <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                      <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-wide">Stage 4: Registered</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-extrabold text-slate-800 tracking-tight">1 <span className="text-sm font-medium text-slate-500 tracking-normal">case</span></p>
                      <p className="text-sm font-mono font-medium text-emerald-800 bg-emerald-100/70 inline-block px-2.5 py-1 rounded">PKR 57,000</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>

          {/* Right Activity Column */}
          <aside className="w-[340px] bg-white border-l border-slate-200 flex flex-col shrink-0 shadow-[-4px_0_24px_-12px_rgba(0,0,0,0.05)]">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-slate-400" />
                <h3 className="font-semibold text-slate-800">Recent Activity</h3>
              </div>
              <button className="text-xs font-medium text-blue-600 hover:text-blue-700">View all</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="relative space-y-7 pb-4">
                {/* Timeline Line */}
                <div className="absolute top-2 bottom-0 left-[11px] w-px bg-slate-100" />
                
                {/* Activity Item 1 */}
                <div className="relative pl-8">
                  <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full ring-4 ring-white" />
                  <p className="text-sm text-slate-700 leading-snug"><span className="font-semibold text-slate-900">Case 43334</span> moved to <span className="font-medium text-slate-900">Stage 1</span></p>
                  <p className="text-xs text-slate-400 mt-1">2 mins ago</p>
                </div>

                {/* Activity Item 2 */}
                <div className="relative pl-8">
                  <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-4 ring-white" />
                  <p className="text-sm text-slate-700 leading-snug">Payment <span className="font-mono font-medium text-emerald-600">PKR 70,000</span> received from <span className="font-medium text-slate-900">Multan Auto Parts</span></p>
                  <p className="text-xs text-slate-400 mt-1">12 mins ago</p>
                </div>

                {/* Activity Item 3 */}
                <div className="relative pl-8">
                  <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-4 ring-white" />
                  <p className="text-sm text-slate-700 leading-snug">Payment <span className="font-mono font-medium text-emerald-600">PKR 30,000</span> received from <span className="font-medium text-slate-900">Peshawar Foods Group</span></p>
                  <p className="text-xs text-slate-400 mt-1">12 mins ago</p>
                </div>

                {/* Activity Item 4 */}
                <div className="relative pl-8">
                  <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-4 ring-white" />
                  <p className="text-sm text-slate-700 leading-snug">Payment <span className="font-mono font-medium text-emerald-600">PKR 100,000</span> received from <span className="font-medium text-slate-900">Islamabad Pharma</span></p>
                  <p className="text-xs text-slate-400 mt-1">12 mins ago</p>
                </div>

                {/* Activity Item 5 */}
                <div className="relative pl-8">
                  <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 bg-indigo-500 rounded-full ring-4 ring-white" />
                  <p className="text-sm text-slate-700 leading-snug"><span className="font-semibold text-slate-900">Case 511293</span> updated — <span className="font-medium text-slate-900">Stage 4</span></p>
                  <p className="text-xs text-slate-400 mt-1">15 mins ago</p>
                </div>

                {/* Activity Item 6 */}
                <div className="relative pl-8">
                  <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 bg-slate-300 rounded-full ring-4 ring-white" />
                  <p className="text-sm text-slate-700 leading-snug"><span className="font-semibold text-slate-900">Case 398471</span> created for <span className="font-medium text-slate-900">Lahore Textile Mills</span></p>
                  <p className="text-xs text-slate-400 mt-1">18 mins ago</p>
                </div>

              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
