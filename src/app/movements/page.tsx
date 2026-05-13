import Shell from "@/components/layout/Shell";
import { 
  ArrowLeftRight, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Search, 
  Filter,
  Package,
  Calendar,
  User,
  ArrowRight
} from "lucide-react";

const movements = [
  { id: "1", asset: "Workstation Dell XPS", code: "PAT-088", type: "TRANSFER", origin: "Marketing", dest: "Engenharia", date: "Há 2 horas", user: "André Lima", status: "Concluído" },
  { id: "2", asset: "Monitor LG UltraWide", code: "PAT-112", type: "LOAN", origin: "Estoque", dest: "Home Office - Maria", date: "Ontem", user: "Sandro Silva", status: "Em Aberto" },
  { id: "3", asset: "Projetor Epson 4K", code: "PAT-005", type: "RETURN", origin: "Vendas", dest: "Logística", date: "12/03/24", user: "Ana Paula", status: "Concluído" },
];

export default function MovementsPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Fluxo de Movimentação</h2>
            <p className="text-muted-foreground text-sm">Controle de transferências, empréstimos e custódia de ativos.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all">
            <Plus className="w-4 h-4" /> Nova Movimentação
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatMini icon={ArrowLeftRight} label="Transferências" value="128" />
          <StatMini icon={ArrowUpRight} label="Empréstimos Ativos" value="42" />
          <StatMini icon={ArrowDownLeft} label="Devoluções Pendentes" value="03" />
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 bg-accent/20 border-b border-border flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Filtrar movimentações..." className="w-full bg-accent/30 border-none rounded-lg py-2 pl-10 text-sm" />
            </div>
            <button className="p-2 bg-accent rounded-lg hover:bg-accent/80"><Filter className="w-4 h-4" /></button>
          </div>

          <div className="divide-y divide-border">
            {movements.map(mov => (
              <div key={mov.id} className="p-6 hover:bg-accent/10 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    mov.type === 'TRANSFER' ? 'bg-blue-500/10 text-blue-500' : 
                    mov.type === 'LOAN' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {mov.type === 'TRANSFER' ? <ArrowLeftRight className="w-6 h-6" /> : 
                     mov.type === 'LOAN' ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownLeft className="w-6 h-6" />}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{mov.asset}</span>
                      <span className="text-[10px] bg-accent px-2 py-0.5 rounded font-mono">{mov.code}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground">{mov.origin}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs font-semibold text-primary">{mov.dest}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-xs font-medium">
                      <User className="w-3 h-3" /> {mov.user}
                    </div>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3" /> {mov.date}
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    mov.status === 'Concluído' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {mov.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function StatMini({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-primary">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}
