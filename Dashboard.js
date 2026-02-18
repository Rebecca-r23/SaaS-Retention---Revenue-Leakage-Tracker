function Dashboard() {
    // Generate data on mount
    const [data, setData] = React.useState([]);
    const [metrics, setMetrics] = React.useState(null);

    React.useEffect(() => {
        const rawData = generateData();
        setData(rawData);
        const calculatedMetrics = calculateMetrics(rawData);
        setMetrics(calculatedMetrics);
    }, []);

    if (!metrics) {
        return (
            <div className="flex h-screen items-center justify-center text-[var(--text-secondary)]">
                <div className="flex flex-col items-center gap-4">
                    <div className="icon-loader animate-spin text-4xl text-[var(--accent-primary)]"></div>
                    <p>Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            
            <div className="flex-1 flex flex-col min-w-0 bg-[var(--bg-dark)]">
                <Header />
                
                <main className="flex-1 p-6 overflow-y-auto">
                    {/* Top Stats */}
                    <KPIGrid metrics={metrics} />

                    {/* Main Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="lg:col-span-2">
                            <MRRWaterfall metrics={metrics} />
                        </div>
                        <div className="lg:col-span-1">
                            <RevenueLeakage metrics={metrics} />
                        </div>
                    </div>

                    {/* Secondary Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-3">
                            <CohortAnalysis />
                        </div>
                    </div>
                    
                    {/* Recent Alerts Section */}
                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-white mb-4">Recent Churn & Risk Alerts</h3>
                        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#22263a] text-xs uppercase text-[var(--text-secondary)] font-semibold">
                                    <tr>
                                        <th className="p-4">Customer</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Risk/Reason</th>
                                        <th className="p-4 text-right">MRR Impact</th>
                                        <th className="p-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-[var(--border-color)]">
                                    {data
                                        .filter(d => d.Status === 'Cancelled' || d.Leakage_Type)
                                        .slice(0, 5)
                                        .map((row, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-medium text-white">
                                                {row.Customer_Name}
                                                <div className="text-xs text-[var(--text-secondary)]">{row.Subscription_ID}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${row.Status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                    {row.Status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-[var(--text-secondary)]">
                                                {row.Churn_Reason || row.Leakage_Type}
                                            </td>
                                            <td className="p-4 text-right font-mono text-white">
                                                ${row.MRR}
                                            </td>
                                            <td className="p-4 text-center">
                                                <button className="text-[var(--accent-primary)] hover:text-white transition-colors">
                                                    <div className="icon-ellipsis"></div>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}