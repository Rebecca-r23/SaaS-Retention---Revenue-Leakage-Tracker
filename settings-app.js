function App() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 bg-[var(--bg-dark)]">
                <Header />
                <main className="flex-1 p-6 overflow-y-auto">
                    <Settings />
                </main>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);