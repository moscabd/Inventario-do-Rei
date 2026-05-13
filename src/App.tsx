import { useState, useEffect } from 'react';
import { 
  listActiveItems, 
  listTrash, 
  softDeleteItem, 
  restoreFromTrash, 
  permanentlyDeleteItem,
  listItemHistory,
  restoreVersion,
  exportFiscalCsv,
  exportBackupJson,
  ItemWithLastChange,
  Item,
  ItemHistory
} from './inventoryFlow';

// --- Ícones SVG Customizados ---
const IconBox = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
const IconTrash = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>;
const IconHistory = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconExport = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
const IconShield = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;

export default function App() {
  const [view, setView] = useState<'active' | 'trash' | 'history'>('active');
  const [items, setItems] = useState<ItemWithLastChange[]>([]);
  const [trashItems, setTrashItems] = useState<Item[]>([]);
  const [selectedItemHistory, setSelectedItemHistory] = useState<{ id: string, history: ItemHistory[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState('');
  const [showPinModal, setShowPinModal] = useState<string | null>(null);

  useEffect(() => { refreshData(); }, [view]);

  const refreshData = async () => {
    setLoading(true);
    try {
      if (view === 'active') setItems(await listActiveItems());
      else if (view === 'trash') setTrashItems(await listTrash());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleAction = async (action: () => Promise<any>) => {
    try { await action(); refreshData(); }
    catch (err: any) { alert(err.message || 'Erro ao processar'); }
  };

  const handleExportCSV = async () => {
    const csv = await exportFiscalCsv();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'relatorio_fiscal.csv'; a.click();
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <IconShield />
          <span>INVENTÁRIO REI</span>
        </div>
        
        <nav className="nav-group">
          <div className={`nav-item ${view === 'active' ? 'active' : ''}`} onClick={() => setView('active')}>
            <IconBox /> Estoque Principal
          </div>
          <div className={`nav-item ${view === 'trash' ? 'active' : ''}`} onClick={() => setView('trash')}>
            <IconTrash /> Lixeira de Ativos
          </div>
        </nav>

        <div style={{ marginTop: 'auto' }} className="nav-group">
          <div className="nav-item" onClick={handleExportCSV}>
            <IconExport /> Exportar Fiscal
          </div>
          <div className="nav-item" onClick={() => exportBackupJson().then(b => console.log(b))}>
            <IconHistory /> Backup Completo
          </div>
        </div>
      </aside>

      <main className="main-view">
        <header className="header-row">
          <div className="page-title">
            <h1>{view === 'active' ? 'Dashboard de Ativos' : view === 'trash' ? 'Gestão de Resíduos' : 'Linha do Tempo'}</h1>
            <p>{view === 'active' ? 'Gerencie o patrimônio real em tempo real.' : 'Itens aguardando exclusão definitiva.'}</p>
          </div>
          {view === 'history' && <button className="btn btn-outline" onClick={() => setView('active')}>Voltar ao Dashboard</button>}
        </header>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
            <div className="loader">Sincronizando com o Reino...</div>
          </div>
        ) : (
          <div className="inventory-grid">
            {view === 'active' && items.map(item => (
              <article key={item.id} className="item-card">
                <span className="item-badge">{item.location || 'Sem Local'}</span>
                <h3 className="item-name">{item.name}</h3>
                
                <div className="item-meta">
                  <div className="meta-box">
                    <span className="meta-label">Patrimônio</span>
                    <span className="meta-value">{item.patrimony_code || '---'}</span>
                  </div>
                  <div className="meta-box">
                    <span className="meta-label">Avaliação</span>
                    <span className="meta-value">R$ {item.acquisition_value?.toLocaleString() || '0,00'}</span>
                  </div>
                </div>

                <div className="btn-group">
                  <button className="btn btn-outline" onClick={() => {
                    listItemHistory(item.id).then(h => {
                      setSelectedItemHistory({ id: item.id, history: h });
                      setView('history');
                    });
                  }}>
                    <IconHistory /> Histórico
                  </button>
                  <button className="btn btn-primary" style={{ backgroundColor: 'var(--danger)' }} onClick={() => handleAction(() => softDeleteItem(item.id))}>
                    Arquivar
                  </button>
                </div>

                {item.last_changed_at && (
                  <footer>
                    Editado por {item.last_changed_by_email?.split('@')[0]} • {new Date(item.last_changed_at).toLocaleDateString()}
                  </footer>
                )}
              </article>
            ))}

            {view === 'trash' && trashItems.map(item => (
              <article key={item.id} className="item-card trash-card">
                <h3 className="item-name">{item.name}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  Aguardando autorização mestre para destruição.
                </p>
                <div className="btn-group">
                  <button className="btn btn-primary" onClick={() => handleAction(() => restoreFromTrash(item.id))}>
                    Restaurar Ativo
                  </button>
                  <button className="btn btn-outline" style={{ color: 'var(--danger)' }} onClick={() => setShowPinModal(item.id)}>
                    Destruir
                  </button>
                </div>
              </article>
            ))}

            {view === 'history' && selectedItemHistory && (
              <div className="timeline-container" style={{ gridColumn: '1 / -1' }}>
                {selectedItemHistory.history.map(entry => (
                  <div key={entry.uuid} className="timeline-card">
                    <div className="timeline-dot"></div>
                    <div style={{ flex: 1 }}>
                      <div className="timeline-date">{new Date(entry.changed_at).toLocaleString()}</div>
                      <p style={{ fontWeight: 600, margin: '4px 0' }}>{entry.change_summary}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Alteração capturada por {entry.changed_by || 'Sistema'}</p>
                    </div>
                    <button className="btn btn-outline" style={{ flex: 'none', width: '200px' }} onClick={() => handleAction(() => restoreVersion(entry.uuid))}>
                      Reverter para este estado
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {showPinModal && (
          <div className="modal-backdrop">
            <div className="modal-sheet">
              <IconShield />
              <h2 style={{ marginTop: '1rem', fontFamily: 'Outfit' }}>Autorização Crítica</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Esta ação é irreversível e exige a senha mestra de 4 dígitos.
              </p>
              <input 
                className="pin-input"
                type="password" 
                maxLength={4} 
                value={pin} 
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                autoFocus
              />
              <div className="btn-group">
                <button className="btn btn-primary" style={{ backgroundColor: 'var(--danger)' }} onClick={() => {
                  permanentlyDeleteItem(showPinModal, pin)
                    .then(() => { setShowPinModal(null); setPin(''); refreshData(); })
                    .catch(e => alert(e.message));
                }}>
                  Confirmar Destruição
                </button>
                <button className="btn btn-outline" onClick={() => setShowPinModal(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
