"use client";

import Shell from "@/components/layout/Shell";
import { 
  ArrowLeft, 
  Edit3, 
  Share2, 
  QrCode, 
  History, 
  FileText, 
  Info,
  Calendar,
  User,
  MapPin,
  ShieldCheck,
  Download,
  Trash2,
  Clock,
  Eye,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AssetDetailPage() {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <Shell>
      <div className="space-y-6">
        {/* Sub-Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/assets" className="p-2 hover:bg-accent rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">PAT-001</span>
                <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Ativo</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Servidor Dell PowerEdge R750</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-border rounded-lg hover:bg-accent transition-colors">
              <Share2 className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              <Edit3 className="w-4 h-4" /> Editar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              <QrCode className="w-4 h-4" /> Gerar Etiqueta
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-8 border-b border-border">
          {[
            { id: "info", label: "Informações Gerais", icon: Info },
            { id: "docs", label: "Documentos & Arquivos", icon: FileText },
            { id: "movements", label: "Movimentações", icon: Share2 },
            { id: "history", label: "Histórico / Auditoria", icon: History },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium transition-all relative ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </div>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {activeTab === "info" && (
              <>
                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Identificação Técnica</h3>
                    <div className="space-y-3">
                      <DetailRow label="Número de Série" value="DELL-R750-XJ9283" />
                      <DetailRow label="Marca / Modelo" value="Dell / PowerEdge R750" />
                      <DetailRow label="Categoria" value="TI / Servidores" />
                      <DetailRow label="Data de Compra" value="12/03/2024" />
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Localização & Responsável</h3>
                    <div className="space-y-3">
                      <DetailRow label="Responsável" value="Carlos Silva (Eng. TI)" />
                      <DetailRow label="Unidade" value="Matriz / São Paulo" />
                      <DetailRow label="Setor" value="Data Center 01" />
                      <DetailRow label="Sala" value="Rack A3" />
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4">Descrição Detalhada</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Servidor de alta performance com processadores Intel Xeon de 3ª geração, 256GB RAM DDR4, 4TB SSD NVMe. 
                    Utilizado para hospedagem do banco de dados principal de produção. Inclui redundância de fonte e placa de rede 10Gbps.
                  </p>
                </div>
              </>
            )}

            {activeTab === "docs" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Repositório de Documentos</h3>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                    <Plus className="w-4 h-4" /> Novo Upload
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DocumentCard name="Nota Fiscal de Compra.pdf" type="INVOICE" size="1.2 MB" date="12/03/2024" />
                  <DocumentCard name="Manual de Configuração.pdf" type="MANUAL" size="4.5 MB" date="13/03/2024" />
                  <DocumentCard name="Termo de Garantia Estendida.pdf" type="WARRANTY" size="840 KB" date="15/03/2024" />
                  <DocumentCard name="Foto Lateral Rack.jpg" type="PHOTO" size="2.1 MB" date="20/03/2024" />
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-6">Linha do Tempo de Auditoria</h3>
                <div className="space-y-8 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border"></div>
                  <TimelineItem date="22/04/2024 - 14:30" user="Sistema" action="Movimentação Automatizada" desc="Item transferido da Sala 101 para Rack A3 após conferência de rede." />
                  <TimelineItem date="15/03/2024 - 09:15" user="Carlos Silva" action="Edição de Atributos" desc="Alteração do campo 'Responsável' e adição de manual técnico." />
                  <TimelineItem date="12/03/2024 - 10:00" user="Logística" action="Criação de Patrimônio" desc="Item registrado no sistema após recebimento fiscal." />
                </div>
              </div>
            )}
          </div>

          {/* Side Panels */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">QR Code de Rastreio</h3>
              <div className="aspect-square bg-white rounded-xl p-4 flex items-center justify-center border border-border">
                <div className="w-full h-full bg-slate-900 rounded flex items-center justify-center text-white text-xs text-center p-4">
                  [QR CODE PAT-001]
                </div>
              </div>
              <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-widest">Acesso rápido via Mobile</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Status do Ciclo de Vida</h3>
              <div className="space-y-4">
                <StatusStep label="Aquisição" date="12/03/24" active />
                <StatusStep label="Implementação" date="15/03/24" active />
                <StatusStep label="Garantia" date="12/03/27" />
                <StatusStep label="Depreciação Total" date="12/03/29" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function DocumentCard({ name, type, size, date }: { name: string, type: string, size: string, date: string }) {
  return (
    <div className="bg-accent/20 border border-border p-4 rounded-xl flex items-center gap-4 group hover:border-primary/50 transition-colors">
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
        <FileText className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{name}</p>
        <p className="text-[10px] text-muted-foreground uppercase">{type} • {size}</p>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 hover:bg-accent rounded text-muted-foreground"><Eye className="w-4 h-4" /></button>
        <button className="p-1.5 hover:bg-accent rounded text-muted-foreground"><Download className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

function TimelineItem({ date, user, action, desc }: { date: string, user: string, action: string, desc: string }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-1.5 w-6 h-6 bg-accent border border-border rounded-full flex items-center justify-center z-10">
        <Clock className="w-3 h-3 text-muted-foreground" />
      </div>
      <div>
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{date}</p>
        <p className="text-sm font-semibold mt-1">{action}</p>
        <p className="text-xs text-primary font-medium">Por: {user}</p>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function StatusStep({ label, date, active = false }: { label: string, date: string, active?: boolean }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${active ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-muted"}`}></div>
        <span className={active ? "font-bold" : "text-muted-foreground"}>{label}</span>
      </div>
      <span className="text-muted-foreground">{date}</span>
    </div>
  );
}
