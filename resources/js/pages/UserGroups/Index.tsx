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

      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <Input
            placeholder="Search user group..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />

          {/* CREATE MODAL */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add Group</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create User Group</DialogTitle>
              </DialogHeader>

              <form onSubmit={submit} className="space-y-4">
                <Input
                  placeholder="Group name"
                  value={form.data.name}
                  onChange={(e) => form.setData('name', e.target.value)}
                />

                <Input
                  placeholder="Base Office"
                  value={form.data.base_office}
                  onChange={(e) => form.setData('base_office', e.target.value)}
                />

                <Button type="submit" className="w-full">
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* EDIT MODAL */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User Group</DialogTitle>
            </DialogHeader>

            <form onSubmit={update} className="space-y-4">
              <Input
                value={editForm.data.name}
                onChange={(e) => editForm.setData('name', e.target.value)}
              />

              <Input
                value={editForm.data.base_office}
                onChange={(e) => editForm.setData('base_office', e.target.value)}
              />

              <Button type="submit" className="w-full">
                Update
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* TABLE */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group</TableHead>
                  <TableHead>Base Office</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((g) => (
                  <TableRow key={g.id}>
                    <TableCell>{g.name}</TableCell>

                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs ${badgeColor(g.name)}`}>
                        {g.base_office ?? 'No Office'}
                      </span>
                    </TableCell>

                    <TableCell className="text-right space-x-2">
                      {/* ✅ FIXED EDIT BUTTON */}
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => openEdit(g)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteUG(g.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}