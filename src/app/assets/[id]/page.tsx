"use client";

import Shell from "@/components/layout/Shell";
import {
  ArrowLeft,
  Edit3,
  History,
  FileText,
  Info,
  ShieldCheck,
  Download,
  Clock,
  Plus,
  Star
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AssetDetailPage() {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <Shell>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-in flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <Link href="/assets" className="p-2.5 bg-card border border-border hover:bg-secondary/10 hover:border-secondary/20 rounded-xl transition-all">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-secondary bg-secondary/10 border border-secondary/15 px-2.5 py-1 rounded-md">REI-001</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase">Ativo</span>
              </div>
              <h2 className="text-xl lg:text-2xl font-black text-foreground mt-2">Servidor Dell PowerEdge R750</h2>
            </div>
          </div>
          <div className="flex gap-3 ml-12 sm:ml-0">
            <button className="flex items-center gap-2 px-4 py-2 border border-secondary/30 text-secondary rounded-xl text-sm font-semibold hover:bg-secondary/10 transition-all">
              <Edit3 className="w-4 h-4" /> Editar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-background rounded-xl text-sm font-bold hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20">
              <Star className="w-4 h-4" /> Favoritar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="animate-in animate-in-delay-1 flex gap-6 border-b border-border overflow-x-auto">
          {[
            { id: "info", label: "Detalhes", icon: Info },
            { id: "docs", label: "Documentos", icon: FileText },
            { id: "history", label: "Histórico", icon: History },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-semibold transition-all relative whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id ? "text-secondary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full shadow-[0_0_8px_hsla(45,93%,47%,0.4)]" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "info" && (
              <>
                <div className="animate-in grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailCard title="Identificação">
                    <DetailRow label="Número de Série" value="DELL-R750-XJ9283" />
                    <DetailRow label="Marca / Modelo" value="Dell / PowerEdge R750" />
                    <DetailRow label="Categoria" value="TI / Infraestrutura" />
                    <DetailRow label="Data de Compra" value="12/03/2024" />
                  </DetailCard>
                  <DetailCard title="Localização">
                    <DetailRow label="Responsável" value="Carlos Silva" />
                    <DetailRow label="Unidade" value="Matriz" />
                    <DetailRow label="Setor" value="Data Center 01" />
                    <DetailRow label="Posição" value="Rack A3" />
                  </DetailCard>
                </div>

                <div className="animate-in animate-in-delay-1 bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-4">Descrição</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-secondary/30 pl-4">
                    Servidor de alta performance com processadores Intel Xeon de 3ª geração, 256GB RAM DDR4, 4TB SSD NVMe.
                    Utilizado para hospedagem do banco de dados principal de produção.
                  </p>
                </div>
              </>
            )}

            {activeTab === "docs" && (
              <div className="animate-in space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-foreground">Documentos</h3>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-secondary/10 text-secondary rounded-lg text-xs font-bold">
                    <Plus className="w-3 h-3" /> Adicionar
                  </button>
                </div>
                {[
                  { name: "Nota Fiscal.pdf", type: "Fiscal", size: "1.2 MB" },
                  { name: "Manual Técnico.pdf", type: "Técnico", size: "4.5 MB" },
                  { name: "Garantia Estendida.pdf", type: "Garantia", size: "840 KB" },
                ].map((doc, i) => (
                  <div key={i} className="bg-card border border-border p-4 rounded-xl flex items-center gap-4 group card-hover">
                    <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{doc.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{doc.type} • {doc.size}</p>
                    </div>
                    <button className="p-2 opacity-0 group-hover:opacity-100 bg-muted hover:bg-secondary rounded-lg text-muted-foreground hover:text-background transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "history" && (
              <div className="animate-in bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-6">Linha do Tempo</h3>
                <div className="space-y-8 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
                  {[
                    { date: "22/04/2024", user: "Sistema", action: "Movimentação", desc: "Realocado para Data Center 01." },
                    { date: "15/03/2024", user: "Carlos Silva", action: "Atualização", desc: "Manual técnico adicionado." },
                    { date: "12/03/2024", user: "Logística", action: "Criação", desc: "Registrado no sistema." },
                  ].map((item, i) => (
                    <div key={i} className="relative pl-8">
                      <div className="absolute left-0 top-0.5 w-6 h-6 bg-card border-2 border-secondary rounded-lg flex items-center justify-center z-10">
                        <Clock className="w-3 h-3 text-secondary" />
                      </div>
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{item.date}</p>
                      <p className="text-sm font-bold text-foreground mt-1">{item.action}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Por: {item.user}</p>
                      <p className="text-xs text-muted-foreground mt-2 border-l-2 border-border pl-3">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            <div className="animate-in animate-in-delay-2 bg-primary rounded-2xl p-6 border-b-4 border-secondary relative overflow-hidden">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-6">Ciclo de Vida</h3>
              <div className="space-y-4 relative z-10">
                {[
                  { label: "Aquisição", date: "12/03/24", done: true },
                  { label: "Implantação", date: "15/03/24", done: true },
                  { label: "Auditoria", date: "22/04/24", done: true },
                  { label: "Garantia", date: "12/03/27", done: false },
                ].map((step, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${step.done ? "bg-secondary shadow-[0_0_8px_hsla(45,93%,47%,0.5)]" : "bg-white/20"}`} />
                      <span className={step.done ? "text-secondary font-bold" : "text-white/40"}>{step.label}</span>
                    </div>
                    <span className="text-white/40 font-mono">{step.date}</span>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-secondary/10 rounded-full -mb-12 -mr-12 blur-2xl" />
            </div>

            <div className="animate-in animate-in-delay-3 bg-card border border-border rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mx-auto mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-foreground">Bem Protegido</h4>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">Sob vigilância e auditoria automatizada.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function DetailCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-secondary pb-3 border-b border-border">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
