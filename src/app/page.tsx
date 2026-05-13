import Shell from "@/components/layout/Shell";
import { 
  Package, 
  CheckCircle2, 
  Wrench, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight 
} from "lucide-react";

const stats = [
  { label: "Total Patrimônios", value: "2,842", icon: Package, color: "text-blue-500", trend: "+12%" },
  { label: "Ativos / Em Uso", value: "2,405", icon: CheckCircle2, color: "text-emerald-500", trend: "94%" },
  { label: "Em Manutenção", value: "32", icon: Wrench, color: "text-amber-500", trend: "-5%" },
  { label: "Extraviados", value: "05", icon: AlertTriangle, color: "text-rose-500", trend: "+2" },
];

export default function Dashboard() {
  return (
    <Shell>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard Executivo</h2>
            <p className="text-muted-foreground mt-1">Visão geral do ecossistema patrimonial do Reino.</p>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Saúde do Patrimônio</p>
              <p className="font-bold text-primary">98.2% Integridade</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg bg-accent`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded">
                  {stat.trend} <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="absolute -bottom-2 -right-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <stat.icon size={80} />
              </div>
            </div>
          ))}
        </div>

        {/* Visual Charts Section (Mock) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-6">Movimentação Mensal</h3>
            <div className="h-64 w-full bg-accent/20 rounded-xl flex items-center justify-center border border-dashed border-border">
              <p className="text-muted-foreground text-sm">Área reservada para Gráfico de Barras/Linha (Recharts)</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-6">Distribuição por Setor</h3>
            <div className="h-64 w-full bg-accent/20 rounded-xl flex items-center justify-center border border-dashed border-border">
              <p className="text-muted-foreground text-sm">Gráfico de Rosca</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-semibold">Últimas Movimentações</h3>
            <button className="text-sm text-primary font-medium hover:underline">Ver tudo</button>
          </div>
          <div className="divide-y divide-border">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-accent/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Package className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">MacBook Pro M3 - TI-00{i}</p>
                    <p className="text-xs text-muted-foreground">Transferência: Sede → Filial Alpha</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium">Há {i * 10} minutos</p>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Concluído</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
