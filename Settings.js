function Settings() {
    const [activeTab, setActiveTab] = React.useState('integrations');
    const [isConnecting, setIsConnecting] = React.useState(false);
    const [tableauConnected, setTableauConnected] = React.useState(false);
    const [tableauConfig, setTableauConfig] = React.useState({
        serverUrl: '',
        siteId: '',
        tokenName: '',
        tokenSecret: ''
    });

    const handleConnect = (e) => {
        e.preventDefault();
        setIsConnecting(true);
        // Simulate API connection delay
        setTimeout(() => {
            setIsConnecting(false);
            setTableauConnected(true);
        }, 1500);
    };

    const handleDisconnect = () => {
        setTableauConnected(false);
        setTableauConfig({
            serverUrl: '',
            siteId: '',
            tokenName: '',
            tokenSecret: ''
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">Configuration</h2>
                <p className="text-[var(--text-secondary)]">Manage your account and integrations</p>
            </div>

            <div className="flex gap-6 mb-8 border-b border-[var(--border-color)]">
                <button 
                    onClick={() => setActiveTab('general')}
                    className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'general' ? 'text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-white'}`}
                >
                    General
                </button>
                <button 
                    onClick={() => setActiveTab('integrations')}
                    className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'integrations' ? 'text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-white'}`}
                >
                    Integrations
                </button>
                <button 
                    onClick={() => setActiveTab('api')}
                    className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'api' ? 'text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-white'}`}
                >
                    API Keys
                </button>
            </div>

            {activeTab === 'integrations' && (
                <div className="space-y-6">
                    {/* Tableau Integration Card */}
                    <div className="card">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png" alt="Tableau" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Tableau</h3>
                                    <p className="text-sm text-[var(--text-secondary)]">Connect your Tableau Server or Online account to sync dashboards.</p>
                                </div>
                            </div>
                            {tableauConnected ? (
                                <span className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-xs font-medium border border-green-400/20">
                                    <div className="icon-check w-3 h-3"></div>
                                    Connected
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 text-[var(--text-secondary)] bg-[var(--bg-dark)] px-3 py-1 rounded-full text-xs font-medium border border-[var(--border-color)]">
                                    Not Connected
                                </span>
                            )}
                        </div>

                        {!tableauConnected ? (
                            <form onSubmit={handleConnect} className="space-y-4 max-w-lg">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Server URL</label>
                                    <input 
                                        type="url" 
                                        required
                                        placeholder="https://prod-useast-a.online.tableau.com"
                                        className="input-field"
                                        value={tableauConfig.serverUrl}
                                        onChange={(e) => setTableauConfig({...tableauConfig, serverUrl: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Site ID</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="mysite"
                                        className="input-field"
                                        value={tableauConfig.siteId}
                                        onChange={(e) => setTableauConfig({...tableauConfig, siteId: e.target.value})}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Token Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            placeholder="my-token"
                                            className="input-field"
                                            value={tableauConfig.tokenName}
                                            onChange={(e) => setTableauConfig({...tableauConfig, tokenName: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Token Secret</label>
                                        <input 
                                            type="password" 
                                            required
                                            placeholder="••••••••••••••••"
                                            className="input-field"
                                            value={tableauConfig.tokenSecret}
                                            onChange={(e) => setTableauConfig({...tableauConfig, tokenSecret: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button 
                                        type="submit" 
                                        disabled={isConnecting}
                                        className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isConnecting ? (
                                            <>
                                                <div className="icon-loader animate-spin"></div>
                                                Connecting...
                                            </>
                                        ) : (
                                            <>
                                                Connect Tableau
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-[var(--bg-dark)] rounded-lg p-4 border border-[var(--border-color)]">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-sm font-medium text-white">Connection Details</div>
                                        <div className="text-xs text-[var(--text-secondary)]">Last synced: Just now</div>
                                    </div>
                                    <button 
                                        onClick={handleDisconnect}
                                        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                                    >
                                        Disconnect
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-[var(--text-secondary)] text-xs">Server</div>
                                        <div className="text-white truncate">{tableauConfig.serverUrl}</div>
                                    </div>
                                    <div>
                                        <div className="text-[var(--text-secondary)] text-xs">Site ID</div>
                                        <div className="text-white">{tableauConfig.siteId}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Salesforce Card (Placeholder) */}
                    <div className="card opacity-60">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" alt="Salesforce" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Salesforce</h3>
                                    <p className="text-sm text-[var(--text-secondary)]">Sync opportunities and account data.</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] text-sm font-medium hover:text-white hover:border-[var(--text-secondary)] transition-colors">
                                Connect
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'general' && (
                <div className="card text-center py-12">
                    <div className="icon-settings text-4xl text-[var(--text-secondary)] mx-auto mb-4"></div>
                    <h3 className="text-white text-lg font-medium">General Settings</h3>
                    <p className="text-[var(--text-secondary)]">Profile and preference settings are currently read-only in this demo.</p>
                </div>
            )}
        </div>
    );
}