function RevenueLeakage({ metrics }) {
    const canvasRef = React.useRef(null);
    const chartRef = React.useRef(null);

    React.useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const labels = Object.keys(metrics.leakageData);
        const values = Object.values(metrics.leakageData);
        
        // Colors for leakage types: Various shades of Red/Orange/Pink
        const colors = [
            '#ff073a', // Neon Red
            '#ff5e78', // Light Red
            '#ff9900', // Orange
        ];

        chartRef.current = new window.ChartJS(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors,
                    borderColor: '#1a1d2d', // Match card bg
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#94a3b8',
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` $${context.raw.toFixed(0)}`;
                            }
                        }
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) chartRef.current.destroy();
        };
    }, [metrics]);

    const totalLeakage = Object.values(metrics.leakageData).reduce((a, b) => a + b, 0);

    return (
        <div className="card h-96 relative">
            <h3 className="text-lg font-bold text-white mb-2">Revenue Leakage Sources</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">Breakdown by category</p>
            
            <div className="h-[250px] relative">
                <canvas ref={canvasRef}></canvas>
                
                {/* Center text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[var(--text-secondary)] text-xs uppercase tracking-wide">Total Loss</span>
                    <span className="text-2xl font-bold text-white neon-text-red">${(totalLeakage/1000).toFixed(1)}k</span>
                </div>
            </div>
        </div>
    );
}