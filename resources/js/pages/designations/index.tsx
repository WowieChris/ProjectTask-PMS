import React, { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";

import AppLayout from "@/layouts/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import EditDesignation from "./edit";
import CreateDesignation from "./create";

import {
  BriefcaseBusiness,
  ShieldCheck,
  Users,
  Pencil,
  Plus,
  Search,
} from "lucide-react";

interface Designation {
  id: number;
  name: string;
  role: 'user' | 'admin';
  permissions?: string[];
}

interface Props {
  designations: Designation[];
}

export default function DesignationMasterfile({ designations }: Props) {

  const [search, setSearch] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState<Designation | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const filteredDesignations = useMemo(() =>
    designations.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    ), [designations, search]);

  const adminCount = designations.filter(d => d.role === 'admin').length;
  const userCount = designations.filter(d => d.role === 'user').length;

  const permissionColors: Record<string, string> = {
    create: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    read: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    update: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    delete: 'bg-red-500/15 text-red-400 border-red-500/20',
  };

  const dotColors: Record<string, string> = {
    create: 'bg-blue-400',
    read: 'bg-emerald-400',
    update: 'bg-amber-400',
    delete: 'bg-red-400',
  };

  return (
    <AppLayout breadcrumbs={[{ title: "Designation Masterfile", href: "/designations" }]}>
      <Head title="Designation Masterfile" />

      <div className="flex flex-col gap-5 p-6 h-screen overflow-hidden">

        {/* ── HEADER ─────────────────────────────────────── */}
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Designation Masterfile
            </h1>
            <p className="text-sm text-zinc-400 mt-0.5">
              Manage employee designations and system permissions.
            </p>
          </div>

          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2 bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg">
                <Plus className="w-4 h-4" />
                New Designation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-0 border border-white/10 bg-zinc-900 rounded-2xl">
              <DialogHeader className="px-6 pt-5 pb-4 border-b border-white/10">
                <DialogTitle className="text-base font-bold text-white">
                  Create Designation
                </DialogTitle>
              </DialogHeader>
              <CreateDesignation onSuccess={() => setOpenCreate(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* ── STAT CARDS ─────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 shrink-0">

          <Card className="border border-white/8 bg-zinc-900/60 backdrop-blur-sm rounded-xl overflow-hidden">
            <CardContent className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Total</p>
                <h2 className="text-xl font-bold text-white mt-0.5">{designations.length}</h2>
                <p className="text-[10px] text-zinc-600 mt-0.5">designations</p>
              </div>
              <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <BriefcaseBusiness className="w-4 h-4 text-indigo-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-white/8 bg-zinc-900/60 backdrop-blur-sm rounded-xl overflow-hidden">
            <CardContent className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Admins</p>
                <h2 className="text-xl font-bold text-white mt-0.5">{adminCount}</h2>
                <p className="text-[10px] text-zinc-600 mt-0.5">admin roles</p>
              </div>
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-white/8 bg-zinc-900/60 backdrop-blur-sm rounded-xl overflow-hidden">
            <CardContent className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Users</p>
                <h2 className="text-xl font-bold text-white mt-0.5">{userCount}</h2>
                <p className="text-[10px] text-zinc-600 mt-0.5">user roles</p>
              </div>
              <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
            </CardContent>
          </Card>

        </div>

        {/* ── MAIN 2-PANEL LAYOUT ────────────────────────── */}
        <div className="
          flex-1 min-h-0
          grid grid-cols-12
          rounded-2xl overflow-hidden
          border border-white/8
          bg-zinc-900/40
        ">

          {/* LEFT — List */}
          <div className="col-span-4 border-r border-white/8 flex flex-col min-w-0">

            <div className="px-4 pt-4 pb-3 border-b border-white/8 shrink-0">
              <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2.5">
                Designations &middot; {filteredDesignations.length}
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search designations..."
                  className="h-9 pl-9 rounded-xl bg-zinc-950/60 border-zinc-700 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500/50"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredDesignations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-2 p-6">
                  <BriefcaseBusiness className="w-7 h-7 text-zinc-700" />
                  <p className="text-sm text-zinc-600">No designations found</p>
                </div>
              ) : (
                filteredDesignations.map((designation) => {
                  const isActive = selectedDesignation?.id === designation.id;
                  return (
                    <button
                      key={designation.id}
                      onClick={() => setSelectedDesignation(designation)}
                      className={`
                        w-full border-b border-white/5 px-4 py-3 text-left
                        transition-all duration-150 group border-l-2
                        ${isActive
                          ? 'bg-indigo-600/10 border-l-indigo-500'
                          : 'hover:bg-zinc-800/40 border-l-transparent'
                        }
                      `}
                    >
                      <h3 className={`text-sm font-semibold truncate transition-colors ${isActive ? 'text-indigo-300' : 'text-zinc-200 group-hover:text-white'
                        }`}>
                        {designation.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-[10px] px-2 py-0 h-4 border ${designation.role === 'admin'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          }`}>
                          {designation.role}
                        </Badge>
                        <span className="text-[10px] text-zinc-600">
                          {designation.permissions?.length ?? 0} perm{(designation.permissions?.length ?? 0) !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

          </div>

          {/* RIGHT — Detail */}
          <div className="col-span-8 flex flex-col min-w-0 min-h-0">
            {selectedDesignation ? (
              <>
                {/* Detail header with Edit button */}
                <div className="px-6 py-4 border-b border-white/8 shrink-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <BriefcaseBusiness className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base font-bold text-white truncate">
                        {selectedDesignation.name}
                      </h2>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Role overview and assigned permissions
                      </p>
                    </div>
                  </div>

                  {/* EDIT MODAL */}
                  <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="rounded-xl gap-1.5 bg-indigo-600 hover:bg-indigo-500 border-0 text-white shrink-0 text-xs h-8 px-3"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-xl p-0 border border-white/10 bg-zinc-900 rounded-2xl">
                      <DialogHeader className="px-5 pt-5 pb-3.5 border-b border-white/10">
                        <DialogTitle className="text-sm font-bold text-white flex items-center gap-2.5">
                          <div className="h-6 w-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                            <Pencil className="h-3 w-3 text-indigo-400" />
                          </div>
                          Edit — {selectedDesignation.name}
                        </DialogTitle>
                      </DialogHeader>

                      <EditDesignation
                        designation={selectedDesignation}
                        onCancel={() => setOpenEdit(false)}
                        onSuccess={() => setOpenEdit(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Detail body */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-2 gap-3">

                    {/* Role type */}
                    <div className="rounded-xl border border-white/8 bg-zinc-950/40 px-4 py-3">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 font-medium">
                        Role Type
                      </p>
                      <Badge className={`px-3 py-1 rounded-lg text-xs border ${selectedDesignation.role === 'admin'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                        {selectedDesignation.role === 'admin'
                          ? <ShieldCheck className="inline w-3 h-3 mr-1.5" />
                          : <Users className="inline w-3 h-3 mr-1.5" />
                        }
                        {selectedDesignation.role}
                      </Badge>
                    </div>

                    {/* Permission count */}
                    <div className="rounded-xl border border-white/8 bg-zinc-950/40 px-4 py-3">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5 font-medium">
                        Total Permissions
                      </p>
                      <p className="text-xl font-bold text-white">
                        {selectedDesignation.permissions?.length ?? 0}
                        <span className="text-xs font-normal text-zinc-500 ml-1.5">assigned</span>
                      </p>
                    </div>

                    {/* Assigned permission badges */}
                    <div className="col-span-2 rounded-xl border border-white/8 bg-zinc-950/40 px-4 py-3">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2.5 font-medium">
                        Assigned Permissions
                      </p>
                      {selectedDesignation.permissions?.length ? (
                        <div className="flex flex-wrap gap-1.5">
                          {selectedDesignation.permissions.map((perm) => (
                            <Badge
                              key={perm}
                              className={`px-2.5 py-0.5 rounded-lg capitalize text-xs border ${permissionColors[perm] ?? 'bg-zinc-800 text-zinc-300 border-zinc-700'
                                }`}
                            >
                              {perm}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-xl border border-dashed border-white/8 py-4 text-center">
                          <p className="text-xs text-zinc-600">No permissions assigned</p>
                        </div>
                      )}
                    </div>

                    {/* Access matrix */}
                    <div className="col-span-2 rounded-xl border border-white/8 bg-zinc-950/40 px-4 py-3">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-3 font-medium">
                        Access Matrix
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { key: 'create', label: 'Create', color: 'blue', icon: '＋' },
                          { key: 'read', label: 'Read', color: 'emerald', icon: '👁' },
                          { key: 'update', label: 'Update', color: 'amber', icon: '✎' },
                          { key: 'delete', label: 'Delete', color: 'red', icon: '✕' },
                        ].map(({ key, label, color, icon }) => {
                          const has = selectedDesignation.permissions?.includes(key);
                          const styles: Record<string, string> = {
                            blue: has ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' : 'border-white/6 bg-zinc-900/30 text-zinc-700',
                            emerald: has ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-white/6 bg-zinc-900/30 text-zinc-700',
                            amber: has ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' : 'border-white/6 bg-zinc-900/30 text-zinc-700',
                            red: has ? 'border-red-500/30 bg-red-500/10 text-red-400' : 'border-white/6 bg-zinc-900/30 text-zinc-700',
                          };
                          return (
                            <div
                              key={key}
                              className={`rounded-xl border px-3 py-3 flex flex-col items-center gap-1.5 transition-all ${styles[color]}`}
                            >
                              <span className={`text-base leading-none ${has ? '' : 'grayscale opacity-30'}`}>
                                {icon}
                              </span>
                              <span className={`text-[10px] font-semibold uppercase tracking-wider ${has ? '' : 'text-zinc-600'}`}>
                                {label}
                              </span>
                              <div className={`w-1 h-1 rounded-full ${has ? (
                                color === 'blue' ? 'bg-blue-400' :
                                  color === 'emerald' ? 'bg-emerald-400' :
                                    color === 'amber' ? 'bg-amber-400' : 'bg-red-400'
                              ) : 'bg-zinc-700'}`} />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8">
                <div className="h-16 w-16 rounded-2xl border border-dashed border-zinc-700 flex items-center justify-center">
                  <BriefcaseBusiness className="w-6 h-6 text-zinc-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-zinc-500">No designation selected</p>
                  <p className="text-xs text-zinc-700 mt-1">Pick one from the list to view its details</p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </AppLayout>
  );
}