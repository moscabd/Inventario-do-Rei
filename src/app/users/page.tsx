import Shell from "@/components/layout/Shell";
import { 
  Users, 
  ShieldCheck, 
  Plus, 
  UserPlus, 
  Key, 
  Lock, 
  History,
  MoreVertical,
  Mail,
  ShieldAlert
} from "lucide-react";

const users = [
  { id: "1", name: "Eder D.", email: "eder@rei.com", role: "Super Admin", status: "Ativo", company: "Matriz" },
  { id: "2", name: "Carlos Auditor", email: "carlos@rei.com", role: "Auditor", status: "Ativo", company: "Filial SP" },
  { id: "3", name: "Ana Técnica", email: "ana@rei.com", role: "Técnico", status: "Offline", company: "Filial RJ" },
];

export default function UsersPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Usuários & Permissões</h2>
            <p className="text-muted-foreground text-sm">Controle de acesso granular e gestão de identidades (RBAC).</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent">
               <ShieldCheck className="w-4 h-4" /> Níveis de Acesso
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all">
               <UserPlus className="w-4 h-4" /> Novo Usuário
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main User List */}
          <div className="xl:col-span-2 space-y-4">
             <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-accent/20 border-b border-border">
                         <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Usuário</th>
                         <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Nível</th>
                         <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Empresa</th>
                         <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                         <th className="p-4"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-border">
                      {users.map(user => (
                        <tr key={user.id} className="hover:bg-accent/10 transition-colors group">
                           <td className="p-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center font-bold text-primary">
                                    {user.name.charAt(0)}
                                 </div>
                                 <div>
                                    <p className="text-sm font-semibold">{user.name}</p>
                                    <p className="text-[10px] text-muted-foreground">{user.email}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-4">
                              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                                user.role === 'Super Admin' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                              }`}>
                                 {user.role}
                              </span>
                           </td>
                           <td className="p-4 text-xs text-muted-foreground">{user.company}</td>
                           <td className="p-4">
                              <div className="flex items-center gap-1.5">
                                 <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Ativo' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-muted'}`}></div>
                                 <span className="text-[10px] font-medium">{user.status}</span>
                              </div>
                           </td>
                           <td className="p-4">
                              <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent rounded-lg">
                                 <MoreVertical className="w-4 h-4" />
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>

          {/* Permissions & Security Summary */}
          <aside className="space-y-6">
             <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                   <Lock className="w-3 h-3" /> Segurança & Logs
                </h3>
                <div className="space-y-4">
                   <SecurityAction label="Autenticação 2FA" status="Habilitado" active />
                   <SecurityAction label="Rate Limiting" status="Monitorando" active />
                   <SecurityAction label="Logs de Auditoria" status="Ativo" active />
                </div>
                <button className="w-full mt-6 py-2 bg-accent hover:bg-accent/80 rounded-lg text-xs font-bold transition-colors">
                   Ver Histórico de Acessos
                </button>
             </div>

             <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                   <ShieldAlert className="w-3 h-3 text-rose-500" /> Alertas Críticos
                </h3>
                <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                   <p className="text-xs font-bold text-rose-500">Tentativa de Acesso Negada</p>
                   <p className="text-[10px] text-muted-foreground mt-1">IP: 192.168.1.45 tentou acesso em módulo restrito.</p>
                   <p className="text-[10px] text-muted-foreground mt-2 font-mono">13/05/2024 - 11:24</p>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </Shell>
  );
}

function SecurityAction({ label, status, active = false }: { label: string, status: string, active?: boolean }) {
  return (
    <div className="flex justify-between items-center">
       <span className="text-xs text-muted-foreground">{label}</span>
       <span className={`text-[10px] font-bold ${active ? 'text-emerald-500' : 'text-muted-foreground'}`}>{status}</span>
    </div>
  );
}
