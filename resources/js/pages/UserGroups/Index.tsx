import { Head, router, useForm } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  selectedUserGroup: UserGroup | null;
};

export default function UserGroupsIndex(props: PageProps) {
  const userGroups = props.userGroups ?? null;

  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const form = useForm<{ name: string; base_office: string }>({
    name: '',
    base_office: '',
  });

  const filtered = useMemo(() => {
    return userGroups.filter((g) =>
      g.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [userGroups, search]);

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

        {/* 🔥 STATS */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Total Groups</div>
              <div className="text-2xl font-bold">{userGroups.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">With Office</div>
              <div className="text-2xl font-bold">
                {userGroups.filter(g => g.base_office).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">No Office</div>
              <div className="text-2xl font-bold">
                {userGroups.filter(g => !g.base_office).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center">
          <Input
            placeholder="Search user group..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />

          {/* MODAL BUTTON */}
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

        {/* 🔥 TABLE */}
        <Card>
          <CardContent className="p-0">
            <Table>

              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="pl-6">Name</TableHead>
                  <TableHead>Division Covered</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12">
                      No data found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((g) => (
                    <TableRow
                      key={g.id}
                      className="hover:bg-muted/40 transition"
                    >
                      <TableCell className="pl-6 font-medium">
                        {g.name}
                      </TableCell>

                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-xs ${badgeColor(g.name)}`}>
                          {g.base_office ?? 'No Office'}
                        </span>
                      </TableCell>

                      <TableCell className="text-right pr-6">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="secondary">
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteUG(g.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>

            </Table>
          </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}