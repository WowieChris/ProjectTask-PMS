import { Head, router, useForm } from '@inertiajs/react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

type UserGroup = { id: number; name: string };
type Division = { id: number; name: string; user_group_id: number };
type District = { id: number; name: string; division_id: number };

type PageProps = {
  userGroups: UserGroup[];
  selectedUserGroup: UserGroup | null;

  divisions: Division[];
  selectedDivision: Division | null;

  districts: District[];
};

export default function UserGroupsIndex(props: PageProps) {
  const userGroups = props.userGroups ?? [];
  const selectedUserGroup = props.selectedUserGroup ?? null;

  const divisions = props.divisions ?? [];
  const selectedDivision = props.selectedDivision ?? null;

  const districts = props.districts ?? [];

  // LEFT: user groups entry
  const ugForm = useForm<{ name: string }>({ name: '' });

  const submitUG = (e: React.FormEvent) => {
    e.preventDefault();
    ugForm.post('/user-groups', { onSuccess: () => ugForm.reset('name') });
  };

  const deleteUG = (id: number) => {
    if (!confirm('Delete this User Group?')) return;
    router.delete(`/user-groups/${id}`);
  };

  // RIGHT: divisions form (depends on selectedUserGroup)
  const divisionForm = useForm<{ user_group_id: number | ''; name: string }>({
    user_group_id: selectedUserGroup?.id ?? '',
    name: '',
  });

  React.useEffect(() => {
    divisionForm.setData('user_group_id', selectedUserGroup?.id ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserGroup?.id]);

  const submitDivision = (e: React.FormEvent) => {
    e.preventDefault();
    divisionForm.setData('user_group_id', selectedUserGroup?.id ?? '');
    divisionForm.post('/divisions', {
      onSuccess: () => divisionForm.reset('name'),
      preserveScroll: true,
    });
  };

  const deleteDivision = (id: number) => {
    if (!confirm('Delete this Division?')) return;
    router.delete(`/divisions/${id}`, { preserveScroll: true });
  };

  // RIGHT: districts form (depends on selectedDivision)
  const districtForm = useForm<{ division_id: number | ''; name: string }>({
    division_id: selectedDivision?.id ?? '',
    name: '',
  });

  React.useEffect(() => {
    districtForm.setData('division_id', selectedDivision?.id ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDivision?.id]);

  const submitDistrict = (e: React.FormEvent) => {
    e.preventDefault();
    districtForm.setData('division_id', selectedDivision?.id ?? '');
    districtForm.post('/districts', {
      onSuccess: () => districtForm.reset('name'),
      preserveScroll: true,
    });
  };

  const deleteDistrict = (id: number) => {
    if (!confirm('Delete this District?')) return;
    router.delete(`/districts/${id}`, { preserveScroll: true });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'User Groups', href: '/user-groups' },
      ]}
    >
      <Head title="User Groups" />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Group Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitUG} className="flex gap-3">
                <div className="w-full">
                  <Input
                    placeholder="e.g. Luzon A"
                    value={ugForm.data.name}
                    onChange={(e) => ugForm.setData('name', e.target.value)}
                  />
                  {ugForm.errors.name && (
                    <p className="mt-1 text-sm text-red-500">{ugForm.errors.name}</p>
                  )}
                </div>

                <Button type="submit" disabled={ugForm.processing}>
                  {ugForm.processing ? 'Saving...' : 'Save'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* ✅ USERGROUPS TABLE IS CLICKABLE */}
          <Card>
            <CardHeader>
              <CardTitle>User Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[160px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {userGroups.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-muted-foreground">
                        No user groups yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    userGroups.map((ug) => {
                      const active = selectedUserGroup?.id === ug.id;

                      return (
                        <TableRow key={ug.id} className={active ? 'bg-muted/50' : ''}>
                          <TableCell className="font-medium">
                            <button
                              type="button"
                              onClick={() =>
                                router.get('/user-groups', { ug: ug.id }, { preserveScroll: true })
                              }
                              className="w-full text-left hover:underline"
                            >
                              {ug.name}
                            </button>
                          </TableCell>

                          <TableCell className="text-right">
                            <Button variant="destructive" size="sm" onClick={() => deleteUG(ug.id)}>
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Group → Divisions → Districts</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* DIVISIONS */}
              <div className="space-y-3">
                <div className="text-sm font-semibold">
                  Divisions {selectedUserGroup ? `for ${selectedUserGroup.name}` : ''}
                </div>

                {!selectedUserGroup ? (
                  <p className="text-sm text-muted-foreground">
                    Select a User Group (Luzon/Visayas/Mindanao) to view divisions.
                  </p>
                ) : (
                  <>
                    <form onSubmit={submitDivision} className="flex gap-3">
                      <div className="w-full">
                        <Input
                          placeholder="e.g. Division 1"
                          value={divisionForm.data.name}
                          onChange={(e) => divisionForm.setData('name', e.target.value)}
                        />
                        {divisionForm.errors.name && (
                          <p className="mt-1 text-sm text-red-500">{divisionForm.errors.name}</p>
                        )}
                      </div>
                      <Button type="submit" disabled={divisionForm.processing}>
                        Add
                      </Button>
                    </form>

                    {divisions.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No divisions yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {divisions.map((d) => (
                          <div
                            key={d.id}
                            className={`flex items-center justify-between rounded-md border p-3 ${
                              selectedDivision?.id === d.id ? 'bg-muted/50' : ''
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                router.get(
                                  '/user-groups',
                                  { ug: selectedUserGroup.id, division: d.id },
                                  { preserveScroll: true },
                                )
                              }
                              className="text-left font-medium hover:underline"
                            >
                              {d.name}
                            </button>

                            <Button variant="destructive" size="sm" onClick={() => deleteDivision(d.id)}>
                              Delete
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* DISTRICTS */}
              <div className="space-y-3">
                <div className="text-sm font-semibold">
                  Districts {selectedDivision ? `for ${selectedDivision.name}` : ''}
                </div>

                {!selectedDivision ? (
                  <p className="text-sm text-muted-foreground">Select a Division to view districts.</p>
                ) : (
                  <>
                    <form onSubmit={submitDistrict} className="flex gap-3">
                      <div className="w-full">
                        <Input
                          placeholder="e.g. District 1"
                          value={districtForm.data.name}
                          onChange={(e) => districtForm.setData('name', e.target.value)}
                        />
                        {districtForm.errors.name && (
                          <p className="mt-1 text-sm text-red-500">{districtForm.errors.name}</p>
                        )}
                      </div>
                      <Button type="submit" disabled={districtForm.processing}>
                        Add
                      </Button>
                    </form>

                    {districts.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No districts yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {districts.map((x) => (
                          <div key={x.id} className="flex items-center justify-between rounded-md border p-3">
                            <span className="font-medium">{x.name}</span>
                            <Button variant="destructive" size="sm" onClick={() => deleteDistrict(x.id)}>
                              Delete
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}