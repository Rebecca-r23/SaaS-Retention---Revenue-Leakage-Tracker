function MRRWaterfall({ metrics }) {
    const canvasRef = React.useRef(null);
    const chartRef = React.useRef(null);

    React.useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        
        // Destroy previous chart if exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const data = metrics.mrrMovement;
        
        // Calculate cumulative values for waterfall
        // Start: 0
        // New: 0 -> New
        // Expansion: New -> New + Expansion
        // Contraction: (New + Expansion) -> (New + Exp - Contraction)
        // Churn: (New + Exp - Contraction) -> (New + Exp - Contraction - Churn)
        // Net: Final bar
        
        // For a simpler "Movements" view typically used in MRR analysis, we often show independent bars 
        // with colors indicating positive/negative impact.
        
        // Let's implement a standard Waterfall structure
        // 1. New Business (Positive)
        // 2. Expansion (Positive)
        // 3. Contraction (Negative)
        // 4. Churn (Negative)
        // 5. Net Movement (Total)

        const labels = ['New Business', 'Expansion', 'Contraction', 'Churn', 'Net MRR Movement'];
        
        // Values for the bars
        // Positive values are Green, Negative are Red
        const rawValues = [data.new, data.expansion, data.contraction, data.churn, data.net];
        
        // Colors
        const backgroundColors = rawValues.map((val, idx) => {
            if (idx === 4) return '#0ea5e9'; // Blue for Net
            return val >= 0 ? '#39ff14' : '#ff073a';
        });

        // For floating bars implementation in Chart.js, data format is [min, max]
        // But here we want a simple view of "Components of Change" which is a common variation of MRR Waterfall
        // If we strictly want a waterfall where the next bar starts where the previous left off:
        // Bar 1 (New): starts 0, ends New
        // Bar 2 (Exp): starts New, ends New + Exp
        // Bar 3 (Con): starts New + Exp, ends New + Exp - Con (visual drop)
        // ...
        
        // Let's construct the "floating" data points for visual waterfall
        let runningTotal = 0;
        const floatingData = [];
        
        // New Business
        floatingData.push([0, data.new]);
        runningTotal += data.new;
        
        // Expansion
        floatingData.push([runningTotal, runningTotal + data.expansion]);
        runningTotal += data.expansion;
        
        // Contraction (Negative value in data, so we add it to reduce total)
        const afterContraction = runningTotal + data.contraction; // data.contraction is negative
        floatingData.push([afterContraction, runningTotal]); 
        runningTotal = afterContraction;
        
        // Churn
        const afterChurn = runningTotal + data.churn; // data.churn is negative
        floatingData.push([afterChurn, runningTotal]);
        runningTotal = afterChurn;
        
        // Net Result (Total bar from 0 to final)
        floatingData.push([0, runningTotal]);

        chartRef.current = new window.ChartJS(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'MRR Movement',
                    data: floatingData,
                    backgroundColor: backgroundColors,
                    borderRadius: 4,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const val = context.raw[1] - context.raw[0];
                                // Fix for negative bars logic visualization (Contraction/Churn)
                                // If it's contraction/churn, we want to show the magnitude
                                const rawVal = rawValues[context.dataIndex];
                                return `$${Math.abs(rawVal).toFixed(0)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#2d3748',
                            drawBorder: false,
                        },
                        ticks: {
                            color: '#94a3b8',
                            callback: (value) => '$' + value
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                size: 11
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

    return (
        <div className="card h-96">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">MRR Movement Waterfall</h3>
                <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--accent-growth)]"></span> Growth</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--accent-leakage)]"></span> Leakage</span>
                </div>
            </div>
            <div className="h-[300px] w-full">
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
}