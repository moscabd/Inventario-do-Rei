import Shell from "@/components/layout/Shell";
import { 
  ClipboardCheck, 
  Search, 
  QrCode, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Clock,
  User,
  ArrowRight
} from "lucide-react";

const audits = [
  { id: "1", title: "Inventário Geral 2024", type: "ANUAL", status: "Em Andamento", progress: 65, auditor: "Carlos Silva" },
  { id: "2", title: "Conferência de TI - Unidade SP", type: "SETOR", status: "Pendente", progress: 0, auditor: "Ana Clara" },
  { id: "3", title: "Auditoria Cíclica de Móveis", type: "CÍCLICO", status: "Concluído", progress: 100, auditor: "Ricardo Porto" },
];

export default function AuditPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Auditoria & Inventário</h2>
            <p className="text-muted-foreground text-sm">Controle de integridade patrimonial através de conferência física.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all">
            <Plus className="w-4 h-4" /> Novo Inventário
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {audits.map(audit => (
            <div key={audit.id} className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">
                  {audit.type}
                </span>
                <span className={`text-[10px] font-bold uppercase ${
                  audit.status === 'Concluído' ? 'text-emerald-500' : audit.status === 'Pendente' ? 'text-muted-foreground' : 'text-amber-500'
                }`}>
                  {audit.status}
                </span>
              </div>
              
              <h3 className="text-lg font-bold mb-2">{audit.title}</h3>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                <User className="w-3 h-3" /> Auditor: {audit.auditor}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progresso da Conferência</span>
                  <span className="font-bold">{audit.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-accent rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${audit.progress}%` }}></div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                <button className="text-xs font-bold text-primary flex items-center gap-1">
                   {audit.status === 'Concluído' ? 'Ver Relatório' : 'Continuar Checklist'} <ArrowRight className="w-3 h-3" />
                </button>
                <div className="flex gap-2">
                   <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                     <QrCode className="w-4 h-4" />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time Checklist Visualization */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-bold">Resumo de Divergências Recentes</h3>
            <div className="flex gap-4">
               <SummaryMini icon={CheckCircle2} label="Encontrados" value="1,240" color="text-emerald-500" />
               <SummaryMini icon={XCircle} label="Não Encontrados" value="12" color="text-rose-500" />
               <SummaryMini icon={AlertCircle} label="Divergentes" value="08" color="text-amber-500" />
            </div>
          </div>
          
          <div className="p-0">
             <div className="bg-accent/10 p-4 border-b border-border flex items-center justify-between text-xs text-muted-foreground font-bold uppercase tracking-widest">
                <span>Ativo</span>
                <span className="w-64 text-center">Tipo de Divergência</span>
                <span className="w-48 text-right">Ação</span>
             </div>
             <DivergenceItem tag="PAT-122" name="Câmera Canon EOS" issue="Localização Incorreta" severity="low" />
             <DivergenceItem tag="PAT-092" name="Nobreak 2kVA" issue="Etiqueta Danificada" severity="mid" />
             <DivergenceItem tag="PAT-004" name="MacBook Pro 14" issue="Patrimônio não localizado" severity="high" />
          </div>
        </div>
      </div>
    </Shell>
  );
}

function SummaryMini({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="flex flex-col items-center">
       <div className={`flex items-center gap-1 font-bold ${color}`}>
          <Icon className="w-3 h-3" /> {value}
       </div>
       <span className="text-[10px] text-muted-foreground uppercase">{label}</span>
    </div>
  );
}

function DivergenceItem({ tag, name, issue, severity }: { tag: string, name: string, issue: string, severity: 'low' | 'mid' | 'high' }) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-accent/10 transition-colors border-b border-border last:border-0">
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs font-bold bg-accent px-2 py-1 rounded">{tag}</span>
        <span className="text-sm font-medium">{name}</span>
      </div>
      
      <div className="w-64 flex items-center justify-center gap-2">
         <span className={`w-2 h-2 rounded-full ${severity === 'high' ? 'bg-rose-500' : severity === 'mid' ? 'bg-amber-500' : 'bg-blue-500'}`}></span>
         <span className="text-xs font-semibold">{issue}</span>
      </div>

      <div className="w-48 flex justify-end">
         <button className="text-[10px] font-bold text-primary hover:underline uppercase">Tratar agora</button>
      </div>
    </div>
  );
}
