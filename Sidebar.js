function Sidebar() {
    return (
        <aside className="w-64 bg-[var(--bg-card)] border-r border-[var(--border-color)] flex-col hidden md:flex h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--accent-growth)] to-[var(--accent-primary)] flex items-center justify-center">
                    <div className="icon-chart-bar text-black text-lg"></div>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white">SaaS Analytics</h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider px-4 mb-2">Dashboards</div>
                
                <a href="index.html" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--accent-primary)]/10 hover:text-[var(--accent-primary)] text-[var(--text-secondary)] font-medium transition-colors">
                    <div className="icon-layout-dashboard text-lg"></div>
                    Overview
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors">
                    <div className="icon-users text-lg"></div>
                    Retention
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors">
                    <div className="icon-wallet text-lg"></div>
                    Revenue Leakage
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors">
                    <div className="icon-chart-bar text-lg"></div>
                    Cohorts
                </a>

                <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider px-4 mb-2 mt-8">Settings</div>
                <a href="settings.html" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors">
                    <div className="icon-settings text-lg"></div>
                    Configuration
                </a>
            </nav>

            <div className="p-4 border-t border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <div className="icon-user text-gray-400"></div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-white">Rebecca Rodrigues</div>
                        <div className="text-xs text-[var(--text-secondary)]">Recent Graduate</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}