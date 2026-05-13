import Shell from "@/components/layout/Shell";
import { 
  Plus, 
  Filter, 
  Download, 
  MoreVertical, 
  Search,
  QrCode,
  History,
  FileText
} from "lucide-react";

const assets = [
  { id: "1", tag: "PAT-001", name: "Servidor Dell PowerEdge R750", category: "TI / Hardware", status: "Em Uso", sector: "Data Center", value: "R$ 45.000,00" },
  { id: "2", tag: "PAT-002", name: "Licença Adobe Creative Cloud", category: "Software / SaaS", status: "Ativo", sector: "Marketing", value: "R$ 3.500,00" },
  { id: "3", tag: "PAT-003", name: "Cadeira Ergonômica Herman Miller", category: "Móveis", status: "Em Manutenção", sector: "Administração", value: "R$ 8.200,00" },
  { id: "4", tag: "PAT-004", name: "Ar Condicionado Split 12k BTU", category: "Infraestrutura", status: "Ativo", sector: "Sala 102", value: "R$ 2.800,00" },
];

const statusStyles: Record<string, string> = {
  "Ativo": "bg-emerald-500/10 text-emerald-500",
  "Em Uso": "bg-blue-500/10 text-blue-500",
  "Em Manutenção": "bg-amber-500/10 text-amber-500",
  "Baixado": "bg-rose-500/10 text-rose-500",
};

export default function AssetsPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Gestão de Patrimônio</h2>
            <p className="text-muted-foreground text-sm">Controle total dos ativos da corporação.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              <Download className="w-4 h-4" /> Exportar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4" /> Novo Patrimônio
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Pesquisar por nome, código, setor..." 
              className="w-full bg-accent/30 border-none rounded-lg py-2 pl-10 text-sm focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent/50 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        {/* Assets Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-accent/30 border-b border-border">
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Patrimônio</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Item</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Setor</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Valor</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-accent/10 transition-colors group">
                  <td className="p-4">
                    <span className="font-mono text-sm font-bold bg-accent px-2 py-1 rounded">{asset.tag}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{asset.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{asset.category}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${statusStyles[asset.status] || "bg-accent text-muted-foreground"}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {asset.sector}
                  </td>
                  <td className="p-4 text-sm font-medium">
                    {asset.value}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-primary transition-colors" title="Ver QR Code">
                        <QrCode className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-primary transition-colors" title="Histórico">
                        <History className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-primary transition-colors" title="Documentos">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-foreground">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination (Minimal) */}
          <div className="p-4 bg-accent/20 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
            <span>Exibindo 4 de 2,842 itens</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-border rounded hover:bg-accent">Anterior</button>
              <button className="px-3 py-1 bg-primary text-primary-foreground rounded">1</button>
              <button className="px-3 py-1 border border-border rounded hover:bg-accent">2</button>
              <button className="px-3 py-1 border border-border rounded hover:bg-accent">Próximo</button>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
