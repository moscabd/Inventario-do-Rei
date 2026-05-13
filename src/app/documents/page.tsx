"use client";

import Shell from "@/components/layout/Shell";
import { 
  FileText, 
  Search, 
  Filter, 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  Tag, 
  Folder, 
  Star,
  MoreHorizontal,
  FileCode,
  FileImage,
  Video,
  Music
} from "lucide-react";
import { useState } from "react";

const files = [
  { id: "1", name: "Nota_Fiscal_2024_01.pdf", type: "PDF", size: "1.2 MB", date: "12/03/24", tag: "Fiscal", favorite: true },
  { id: "2", name: "Manual_Servidor_PowerEdge.docx", type: "WORD", size: "3.5 MB", date: "13/03/24", tag: "Manual" },
  { id: "3", name: "Foto_Instalacao_RackA3.jpg", type: "IMAGE", size: "2.1 MB", date: "14/03/24", tag: "Evidência" },
  { id: "4", name: "Relatorio_Auditoria_Q1.xlsx", type: "EXCEL", size: "840 KB", date: "15/03/24", tag: "Relatório" },
];

export default function DocumentsPage() {
  const [dragActive, setDragActive] = useState(false);

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Repositório Documental</h2>
            <p className="text-muted-foreground text-sm">Central de documentos corporativos com rastreabilidade total.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent">
               <Folder className="w-4 h-4" /> Nova Pasta
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all">
               <Upload className="w-4 h-4" /> Upload de Arquivos
             </button>
          </div>
        </div>

        {/* Professional Dropzone */}
        <div 
          className={`h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${
            dragActive ? "border-primary bg-primary/5" : "border-border bg-accent/10"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={() => setDragActive(false)}
        >
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mb-2">
             <Upload className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">Arraste seus arquivos para upload automático</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">PDF, Imagens, Word, Excel (Max 50MB)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="space-y-6">
            <div className="space-y-1">
               <FilterNavItem label="Todos os Arquivos" icon={FileText} active />
               <FilterNavItem label="Favoritos" icon={Star} />
               <FilterNavItem label="Recentes" icon={Clock} />
               <FilterNavItem label="Lixeira" icon={Trash2} />
            </div>

            <div className="pt-6 border-t border-border">
               <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Tipos de Arquivo</p>
               <div className="space-y-1">
                 <TypeItem label="Documentos PDF" count={12} color="bg-rose-500" />
                 <TypeItem label="Imagens & Fotos" count={45} color="bg-blue-500" />
                 <TypeItem label="Planilhas & Dados" count={8} color="bg-emerald-500" />
                 <TypeItem label="Mídia / Vídeos" count={2} color="bg-amber-500" />
               </div>
            </div>
          </aside>

          {/* Files Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-4 bg-card border border-border p-3 rounded-xl">
               <Search className="w-4 h-4 text-muted-foreground ml-2" />
               <input type="text" placeholder="Pesquisar por nome ou conteúdo (OCR)..." className="flex-1 bg-transparent border-none text-sm focus:outline-none" />
               <div className="flex gap-2">
                  <button className="p-2 hover:bg-accent rounded-lg"><Filter className="w-4 h-4" /></button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
               {files.map(file => (
                 <div key={file.id} className="bg-card border border-border p-4 rounded-2xl group hover:border-primary/50 transition-all relative">
                    <div className="flex justify-between items-start mb-4">
                       <div className={`p-3 rounded-xl ${
                         file.type === 'PDF' ? 'bg-rose-500/10 text-rose-500' : 
                         file.type === 'IMAGE' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'
                       }`}>
                          {file.type === 'IMAGE' ? <FileImage className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                       </div>
                       <button className="p-1 text-muted-foreground hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>

                    <h4 className="text-sm font-bold truncate pr-4">{file.name}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase mt-1">{file.size} • {file.date}</p>

                    <div className="mt-4 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <Tag className="w-3 h-3 text-primary" />
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">{file.tag}</span>
                       </div>
                       <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="p-1.5 hover:bg-accent rounded text-muted-foreground" title="Preview"><Eye className="w-4 h-4" /></button>
                          <button className="p-1.5 hover:bg-accent rounded text-muted-foreground" title="Download"><Download className="w-4 h-4" /></button>
                       </div>
                    </div>

                    {file.favorite && <Star className="absolute top-4 right-10 w-3 h-3 text-amber-500 fill-amber-500" />}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function FilterNavItem({ label, icon: Icon, active = false }: { label: string, icon: any, active?: boolean }) {
  return (
    <button className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
    }`}>
       <Icon className="w-4 h-4" /> {label}
    </button>
  );
}

function TypeItem({ label, count, color }: { label: string, count: number, color: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 text-xs">
       <div className="flex items-center gap-3 text-muted-foreground">
          <div className={`w-2 h-2 rounded-full ${color}`}></div>
          {label}
       </div>
       <span className="font-bold">{count}</span>
    </div>
  );
}

const Clock = ({ className }: { className?: string }) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
