import Shell from "@/components/layout/Shell";
import { 
  Building2, 
  MapPin, 
  Plus, 
  MoreVertical, 
  Globe, 
  ShieldCheck,
  Package
} from "lucide-react";

const companies = [
  { id: "1", name: "Corporação Rei - Holding", cnpj: "12.345.678/0001-99", branches: 3, assets: 1240, status: "Matriz" },
  { id: "2", name: "Logística Imperial Ltda", cnpj: "98.765.432/0001-00", branches: 1, assets: 850, status: "Filial" },
];

export default function CompaniesPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Estrutura Organizacional</h2>
            <p className="text-muted-foreground text-sm">Gestão de empresas, unidades e centros de custo.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all">
            <Plus className="w-4 h-4" /> Nova Empresa
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {companies.map(company => (
            <div key={company.id} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{company.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{company.cnpj}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${company.status === 'Matriz' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
                  {company.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
                <div className="text-center border-r border-border">
                  <p className="text-xs text-muted-foreground uppercase">Unidades</p>
                  <p className="text-xl font-bold">{company.branches}</p>
                </div>
                <div className="text-center border-r border-border">
                  <p className="text-xs text-muted-foreground uppercase">Ativos</p>
                  <p className="text-xl font-bold">{company.assets}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground uppercase">Usuários</p>
                  <p className="text-xl font-bold">12</p>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="w-3 h-3" /> multi-tenant-isolated
                </div>
                <div className="flex gap-2">
                  <button className="text-xs font-medium text-primary hover:underline">Ver Filiais</button>
                  <button className="text-xs font-medium text-muted-foreground hover:text-white">Configurações</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Unidades/Filiais View */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" /> Unidades Estratégicas
          </h3>
          <div className="space-y-4">
            <BranchItem name="Sede Administrativa - SP" assets={450} manager="Ana Clara" />
            <BranchItem name="Centro de Distribuição - RJ" assets={680} manager="Ricardo Porto" />
            <BranchItem name="Fábrica Alpha - MG" assets={112} manager="Sérgio Mendes" />
          </div>
        </div>
      </div>
    </Shell>
  );
}

function BranchItem({ name, assets, manager }: { name: string, assets: number, manager: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-accent/10 border border-border rounded-xl hover:bg-accent/20 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Responsável: {manager}</p>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="text-xs font-bold">{assets} Ativos</p>
          <p className="text-[10px] text-muted-foreground uppercase">Patrimônio</p>
        </div>
        <button className="p-2 hover:bg-accent rounded-lg">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
