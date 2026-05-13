import Shell from "@/components/layout/Shell";
import {
  ArrowLeftRight,
  ArrowRight,
  Plus,
  Search,
  Calendar,
  User,
  Package,
  Zap
} from "lucide-react";

const movements = [
  { id: "1", asset: "MacBook Pro M3", code: "REI-088", type: "TRANSFER", origin: "Marketing", dest: "Engenharia", date: "Há 2 horas", user: "André Lima", status: "Concluído" },
  { id: "2", asset: "Estação Dell XPS", code: "REI-112", type: "LOAN", origin: "Estoque", dest: "Home Office", date: "Ontem", user: "Sandro Silva", status: "Em Aberto" },
  { id: "3", asset: "Projetor Epson 4K", code: "REI-005", type: "RETURN", origin: "Vendas", dest: "Logística", date: "12/03/24", user: "Ana Paula", status: "Concluído" },
];

const typeConfig: Record<string, { icon: typeof ArrowLeftRight; color: string; bg: string; label: string }> = {
  TRANSFER: { icon: ArrowLeftRight, color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/20", label: "Transferência" },
  LOAN: { icon: Zap, color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/20", label: "Empréstimo" },
  RETURN: { icon: Package, color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/20", label: "Devolução" },
};

export default function MovementsPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="animate-in flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight">Movimentações</h2>
            <p className="text-muted-foreground text-sm mt-1">Rastreabilidade completa de cada bem patrimonial.</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-background rounded-xl text-sm font-bold hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20">
            <Plus className="w-4 h-4" /> Nova Movimentação
          </button>
        </div>

        {/* Stats */}
        <div className="animate-in animate-in-delay-1 grid grid-cols-3 gap-4">
          {[
            { icon: ArrowLeftRight, label: "Transferências", value: "128", color: "text-blue-400" },
            { icon: Zap, label: "Empréstimos", value: "42", color: "text-amber-400" },
            { icon: Package, label: "Devoluções", value: "03", color: "text-emerald-400" },
          ].map((s, i) => (
            <div key={i} className="bg-card border border-border p-4 lg:p-6 rounded-2xl flex items-center gap-4 card-hover">
              <div className={`p-3 rounded-xl bg-muted ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-black text-foreground">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Movement List */}
        <div className="animate-in animate-in-delay-2 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="divide-y divide-border">
            {movements.map((mov) => {
              const cfg = typeConfig[mov.type];
              const Icon = cfg.icon;
              return (
                <div key={mov.id} className="p-4 lg:p-6 hover:bg-muted/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 lg:gap-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cfg.bg} ${cfg.color} shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm lg:text-base font-bold text-foreground">{mov.asset}</span>
                        <span className="text-[10px] bg-secondary/10 text-secondary border border-secondary/15 px-2 py-0.5 rounded font-bold">{mov.code}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                        <span>{mov.origin}</span>
                        <ArrowRight className="w-3 h-3 text-secondary" />
                        <span className="font-semibold text-foreground">{mov.dest}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:gap-10 ml-16 sm:ml-0">
                    <div className="text-right text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground justify-end">
                        <User className="w-3 h-3 text-secondary" /> {mov.user}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground mt-1 justify-end">
                        <Calendar className="w-3 h-3" /> {mov.date}
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border ${
                      mov.status === "Concluído"
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/15 text-amber-400 border-amber-500/20"
                    }`}>
                      {mov.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Shell>
  );
}
