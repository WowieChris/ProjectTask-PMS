import { Head, router, useForm } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import AppLayout from '@/layouts/app-layout';
import {
  Users,
  Search,
  Building2,
} from 'lucide-react';

type UserGroup = {
  id: number;
  name: string;
  base_office?: string | null;
};

type PageProps = {
  userGroups: UserGroup[];
};

export default function UserGroupsIndex(props: PageProps) {
  const userGroups = props.userGroups ?? [];
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<UserGroup | null>(null);

  // ✅ CREATE FORM
  const form = useForm({
    name: '',
    base_office: '',
  });

  // ✅ EDIT FORM (FIXED: this was missing)
  const editForm = useForm({
    name: '',
    base_office: '',
  });

  const filtered = useMemo(() => {
    return userGroups.filter((g) =>
      g.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [userGroups, search]);

  // ✅ CREATE
  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    form.post('/user-groups', {
      onSuccess: () => {
        toast.success('User Group created');
        form.reset();
        setOpen(false);
      },
    });
  };

  // ✅ OPEN EDIT MODAL
  const openEdit = (group: UserGroup) => {
    setEditingGroup(group);

    editForm.setData({
      name: group.name,
      base_office: group.base_office ?? '',
    });

    setEditOpen(true);
  };

  // ✅ UPDATE
  const update = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingGroup) return;

    editForm.put(`/user-groups/${editingGroup.id}`, {
      onSuccess: () => {
        toast.success('Updated successfully');
        setEditOpen(false);
        setEditingGroup(null);
      },
    });
  };

  // ✅ DELETE
  const deleteUG = (id: number) => {
    if (!confirm('Delete this User Group?')) return;

    router.delete(`/user-groups/${id}`, {
      onSuccess: () => toast.success('Deleted successfully'),
    });
  };

  const badgeColor = (name: string) => {
    if (name.includes('Luzon')) return 'bg-blue-500/10 text-blue-400';
    if (name.includes('Visayas')) return 'bg-green-500/10 text-green-400';
    if (name.includes('Mindanao')) return 'bg-purple-500/10 text-purple-400';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'User Groups', href: '/user-groups' },
      ]}
    >
      <Head title="User Groups" />

      <div className="p-6 space-y-5">

        {/* HEADER */}
        <div className="flex items-center justify-between shrink-0">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                User Groups
              </h1>

              <p className="text-sm text-muted-foreground">
                Manage engineer organizational groups
              </p>
            </div>
          </div>

          {/* CREATE MODAL */}
          <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>

              <Button className="rounded-xl">
                Add Group
              </Button>

            </DialogTrigger>

            <DialogContent className="sm:max-w-md">

              <DialogHeader>
                <DialogTitle>
                  Create User Group
                </DialogTitle>
              </DialogHeader>

              <form
                onSubmit={submit}
                className="space-y-4"
              >

                <div className="space-y-2">

                  <label className="text-sm font-medium">
                    Group Name
                  </label>

                  <Input
                    placeholder="e.g. Mindanao Team"
                    value={form.data.name}
                    onChange={(e) =>
                      form.setData('name', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">

                  <label className="text-sm font-medium">
                    Base Office
                  </label>

                  <Input
                    placeholder="e.g. Davao"
                    value={form.data.base_office}
                    onChange={(e) =>
                      form.setData('base_office', e.target.value)
                    }
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl"
                >
                  Save Group
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">

          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Total Groups
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {userGroups.length}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Offices
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {
                      userGroups.filter(
                        (g) => g.base_office
                      ).length
                    }
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Filtered
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {filtered.length}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Search className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEARCH */}
        <div className="flex items-center justify-between gap-3 shrink-0">

          <div className="relative w-full max-w-sm">

            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              placeholder="Search user group..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-xl"
            />
          </div>

          <span className="text-xs text-muted-foreground">
            {filtered.length} result
            {filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* EDIT MODAL */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>

          <DialogContent className="sm:max-w-md">

            <DialogHeader>
              <DialogTitle>
                Edit User Group
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={update}
              className="space-y-4"
            >

              <div className="space-y-2">

                <label className="text-sm font-medium">
                  Group Name
                </label>

                <Input
                  value={editForm.data.name}
                  onChange={(e) =>
                    editForm.setData('name', e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">

                <label className="text-sm font-medium">
                  Base Office
                </label>

                <Input
                  value={editForm.data.base_office}
                  onChange={(e) =>
                    editForm.setData(
                      'base_office',
                      e.target.value
                    )
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl"
              >
                Update Group
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* TABLE */}
        <div className="flex-1 overflow-auto rounded-2xl border border-border bg-card shadow-xl">

          <Table>

            <TableHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border">

              <TableRow className="hover:bg-transparent">

                <TableHead className="px-5 py-4 text-[11px] uppercase tracking-[0.18em]">
                  Group
                </TableHead>

                <TableHead className="px-5 py-4 text-[11px] uppercase tracking-[0.18em]">
                  Base Office
                </TableHead>

                <TableHead className="px-5 py-4 text-right text-[11px] uppercase tracking-[0.18em]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {filtered.length === 0 && (

                <TableRow>

                  <TableCell
                    colSpan={3}
                    className="py-20 text-center"
                  >

                    <div className="flex flex-col items-center gap-2">

                      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">

                        <Users className="w-6 h-6 text-muted-foreground" />
                      </div>

                      <p className="text-sm font-medium text-muted-foreground">
                        No user groups found
                      </p>

                      <p className="text-xs text-muted-foreground/70">
                        Try adjusting your search.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {filtered.map((g, i) => (

                <TableRow
                  key={g.id}
                  className="group border-b border-border/50 hover:bg-muted/20 transition-all"
                >

                  {/* GROUP */}
                  <TableCell className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">

                        <Users className="w-5 h-5 text-primary" />
                      </div>

                      <div>

                        <p className="font-semibold text-sm">
                          {g.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Group {g.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* OFFICE */}
                  <TableCell className="px-5 py-4">

                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium ${badgeColor(g.name)}`}
                    >
                      {g.base_office ?? 'No Office'}
                    </span>
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell className="px-5 py-4 text-right">

                    <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">

                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-xl"
                        onClick={() => openEdit(g)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="rounded-xl"
                        onClick={() => deleteUG(g.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}