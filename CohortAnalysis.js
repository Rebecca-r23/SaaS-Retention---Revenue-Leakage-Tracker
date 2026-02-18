function CohortAnalysis() {
    // Simulated Cohort Data
    const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    const cohorts = [
        { month: 'Aug', size: 120, retention: [100, 94, 88, 85, 82, 79] },
        { month: 'Sep', size: 145, retention: [100, 92, 86, 83, 80, null] },
        { month: 'Oct', size: 132, retention: [100, 95, 89, 87, null, null] },
        { month: 'Nov', size: 156, retention: [100, 91, 85, null, null, null] },
        { month: 'Dec', size: 164, retention: [100, 93, null, null, null, null] },
        { month: 'Jan', size: 178, retention: [100, null, null, null, null, null] },
    ];

    const getBgColor = (val) => {
        if (!val) return 'transparent';
        // Dark theme heatmap scale (Green intensity)
        if (val >= 95) return 'bg-[#39ff14] bg-opacity-90 text-black font-bold';
        if (val >= 90) return 'bg-[#39ff14] bg-opacity-70 text-black';
        if (val >= 85) return 'bg-[#39ff14] bg-opacity-50 text-white';
        if (val >= 80) return 'bg-[#39ff14] bg-opacity-30 text-white';
        return 'bg-[#39ff14] bg-opacity-10 text-[var(--text-secondary)]';
    };

    return (
        <div className="card h-full overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Cohort Retention Analysis</h3>
                    <p className="text-sm text-[var(--text-secondary)]">User retention month-over-month</p>
                </div>
                <button className="text-[var(--accent-primary)] hover:text-white text-sm font-medium">Download CSV</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-center border-collapse">
                    <thead>
                        <tr>
                            <th className="p-3 text-left text-[var(--text-secondary)] font-medium border-b border-[var(--border-color)]">Cohort</th>
                            <th className="p-3 text-[var(--text-secondary)] font-medium border-b border-[var(--border-color)]">Users</th>
                            {months.map((m, i) => (
                                <th key={i} className="p-3 text-[var(--text-secondary)] font-medium border-b border-[var(--border-color)]">M + {i}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cohorts.map((row, i) => (
                            <tr key={i}>
                                <td className="p-3 text-left font-medium text-white border-b border-[var(--border-color)] border-opacity-30">{row.month} '25</td>
                                <td className="p-3 text-[var(--text-secondary)] border-b border-[var(--border-color)] border-opacity-30">{row.size}</td>
                                {months.map((_, colIndex) => {
                                    const val = row.retention[colIndex];
                                    return (
                                        <td key={colIndex} className="p-1 border-b border-[var(--border-color)] border-opacity-30">
                                            <div className={`w-full h-10 flex items-center justify-center rounded ${getBgColor(val)}`}>
                                                {val ? `${val}%` : ''}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}