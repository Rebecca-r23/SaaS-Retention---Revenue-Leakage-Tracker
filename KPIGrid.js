function KPIGrid({ metrics }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-[var(--text-secondary)] text-sm font-medium">Net Revenue Retention</p>
                        <h3 className="text-3xl font-bold mt-1 text-white">{metrics.nrr}%</h3>
                    </div>
                    <div className={`p-2 rounded-lg ${metrics.nrr >= 100 ? 'bg-[var(--accent-growth)]/10 text-[var(--accent-growth)]' : 'bg-[var(--accent-leakage)]/10 text-[var(--accent-leakage)]'}`}>
                        <div className="icon-trending-up text-xl"></div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-[var(--accent-growth)] flex items-center gap-1">
                        <div className="icon-arrow-up text-xs"></div> 2.4%
                    </span>
                    <span className="text-[var(--text-secondary)]">vs last month</span>
                </div>
            </div>

            <div className="card">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-[var(--text-secondary)] text-sm font-medium">Gross Churn Rate</p>
                        <h3 className="text-3xl font-bold mt-1 text-white">{metrics.grossChurnRate}%</h3>
                    </div>
                    <div className="p-2 rounded-lg bg-[var(--accent-leakage)]/10 text-[var(--accent-leakage)]">
                        <div className="icon-activity text-xl"></div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-[var(--accent-growth)] flex items-center gap-1">
                        <div className="icon-arrow-down text-xs"></div> 0.8%
                    </span>
                    <span className="text-[var(--text-secondary)]">improvement</span>
                </div>
            </div>

            <div className="card">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-[var(--text-secondary)] text-sm font-medium">Current MRR</p>
                        <h3 className="text-3xl font-bold mt-1 text-white">${(metrics.currentMRR / 1000).toFixed(1)}k</h3>
                    </div>
                    <div className="p-2 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                        <div className="icon-dollar-sign text-xl"></div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-[var(--accent-growth)] flex items-center gap-1">
                        <div className="icon-arrow-up text-xs"></div> 5.2%
                    </span>
                    <span className="text-[var(--text-secondary)]">vs last month</span>
                </div>
            </div>

            <div className="card">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-[var(--text-secondary)] text-sm font-medium">Active Customers</p>
                        <h3 className="text-3xl font-bold mt-1 text-white">{metrics.activeCustomers}</h3>
                    </div>
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                        <div className="icon-users text-xl"></div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-[var(--accent-growth)] flex items-center gap-1">
                        <div className="icon-plus text-xs"></div> 12
                    </span>
                    <span className="text-[var(--text-secondary)]">new this week</span>
                </div>
            </div>
        </div>
    );
}