import Shell from "@/components/layout/Shell";
import {
  Plus,
  User,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const audits = [
  { id: "1", title: "Censo Patrimonial 2024", type: "ANUAL", status: "Em Andamento", progress: 65, auditor: "Carlos Silva" },
  { id: "2", title: "Conferência TI", type: "SETORIAL", status: "Pendente", progress: 0, auditor: "Ana Clara" },
  { id: "3", title: "Bens Móveis", type: "CÍCLICA", status: "Concluído", progress: 100, auditor: "Ricardo Porto" },
];

export default function AuditPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="animate-in flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight">Auditoria</h2>
            <p className="text-muted-foreground text-sm mt-1">Conferência e integridade do tesouro patrimonial.</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-background rounded-xl text-sm font-bold hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20">
            <Plus className="w-4 h-4" /> Nova Auditoria
          </button>
        </div>

        {/* Audit Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {audits.map((audit, i) => (
            <div
              key={audit.id}
              className={`animate-in animate-in-delay-${i + 1} bg-card border border-border rounded-2xl p-6 card-hover relative overflow-hidden group`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary bg-secondary/10 border border-secondary/15 px-2.5 py-1 rounded-md">
                  {audit.type}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  audit.status === "Concluído" ? "text-emerald-400" : audit.status === "Pendente" ? "text-muted-foreground" : "text-amber-400"
                }`}>
                  {audit.status}
                </span>
              </div>

              <h3 className="text-xl font-black text-foreground mb-2 leading-tight">{audit.title}</h3>

              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                <User className="w-3.5 h-3.5 text-secondary" /> {audit.auditor}
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="text-secondary">{audit.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all duration-1000"
                    style={{ width: `${audit.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                <button className="text-xs font-bold text-secondary flex items-center gap-1.5 hover:text-secondary/80 transition-colors">
                  {audit.status === "Concluído" ? "Ver Laudo" : "Continuar"} <ArrowRight className="w-3 h-3" />
                </button>
                <ShieldCheck className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
              </div>

              {audit.status === "Concluído" && (
                <div className="absolute top-3 right-3">
                  <Star className="w-5 h-5 text-secondary fill-secondary" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="animate-in animate-in-delay-4 bg-primary rounded-2xl p-6 lg:p-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <div>
              <h3 className="text-xl font-black text-white">Resumo de Integridade</h3>
              <p className="text-sm text-white/60 mt-1">Status em tempo real do acervo.</p>
            </div>
            <div className="flex gap-8 lg:gap-12">
              <div className="text-center">
                <p className="text-3xl font-black text-secondary">2.842</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1">Conferidos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-amber-400">12</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1">Divergentes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-emerald-400">0</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1">Em Risco</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/8 rounded-full -mb-32 -mr-32 blur-3xl" />
        </div>
      </div>
    </Shell>
  );
}
