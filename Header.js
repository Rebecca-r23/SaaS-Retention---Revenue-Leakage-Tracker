function Header() {
    // Check if we are on the settings page to adjust title
    const isSettings = window.location.pathname.includes('settings.html');
    const title = isSettings ? 'Configuration & Settings' : 'Retention & Revenue Overview';

    return (
        <header className="h-16 border-b border-[var(--border-color)] bg-[var(--bg-dark)] flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button className="md:hidden text-[var(--text-secondary)]">
                    <div className="icon-menu text-xl"></div>
                </button>
                <h2 className="text-lg font-semibold text-white">{title}</h2>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="icon-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-sm"></div>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-[var(--accent-primary)] w-64"
                    />
                </div>
                <button className="relative p-2 text-[var(--text-secondary)] hover:text-white transition-colors">
                    <div className="icon-bell text-xl"></div>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent-leakage)]"></span>
                </button>
            </div>
        </header>
    );
}