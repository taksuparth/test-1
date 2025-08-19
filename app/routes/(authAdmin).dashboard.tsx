import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { ViewLayout } from '~/components/layout/ViewLayout.tsx';
import {
  ActionsCell,
  BadgeCell,
  DateCell,
  EntityTable,
  TextCell,
} from '~/components/organisms/entityTable';
import {
  Link,
} from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Sample data
const users = [
  {
    id: 'usr_1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: 'usr_2',
    name: 'Bob Williams',
    email: 'bob@example.com',
    role: 'User',
    status: 'Active',
    createdAt: '2023-02-20T11:30:00Z',
  },
  {
    id: 'usr_3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'User',
    status: 'Inactive',
    createdAt: '2023-03-10T09:00:00Z',
  },
  {
    id: 'usr_4',
    name: 'Diana Prince',
    email: 'diana@example.com',
    role: 'Moderator',
    status: 'Active',
    createdAt: '2023-04-05T14:20:00Z',
  },
  {
    id: 'usr_5',
    name: 'Ethan Hunt',
    email: 'ethan@example.com',
    role: 'User',
    status: 'Pending',
    createdAt: '2023-05-22T18:00:00Z',
  },
  {
    id: 'usr_6',
    name: 'Fiona Glenanne',
    email: 'fiona@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2023-06-18T12:00:00Z',
  },
  {
    id: 'usr_7',
    name: 'George Costanza',
    email: 'george@example.com',
    role: 'User',
    status: 'Inactive',
    createdAt: '2023-07-30T16:45:00Z',
  },
  {
    id: 'usr_8',
    name: 'Hannah Montana',
    email: 'hannah@example.com',
    role: 'User',
    status: 'Active',
    createdAt: '2023-08-11T08:15:00Z',
  },
];


// Define columns
const userColumns: ColumnDef<{
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => <TextCell value={getValue() as string} />,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => (
      <a
        href={`mailto:${getValue() as string}`}
        className="text-blue-600 hover:underline"
      >
        {getValue() as string}
      </a>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => (
      <BadgeCell
        value={getValue() as string}
        variantMap={{
          active: 'success',
          inactive: 'destructive',
          pending: 'warning',
        }}
      />
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ getValue }) => <TextCell value={getValue() as string} />,
  },
  {
    accessorKey: 'createdAt',
    header: 'Joined On',
    cell: ({ getValue }) => (
      <DateCell dateString={getValue() as string | number} />
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <ActionsCell
        row={row.original}
        onEdit={(r) => alert(`Editing ${r.name}`)}
        onDelete={(r) => confirm(`Are you sure you want to delete ${r.name}?`)}
      />
    ),
    enableHiding: false,
  },
];

export default function UserTable() {
  const [search, setSearch] = useState('');

  return (
    <ViewLayout>
      <ViewLayout.Header>
        <ViewLayout.Header.Title>Parth</ViewLayout.Header.Title>
        <ViewLayout.Header.Actions>
          <Link to="/entityForm">
            <Button variant="default">Add Entity</Button>
          </Link>
        </ViewLayout.Header.Actions>
      </ViewLayout.Header>
      <ViewLayout.Body>
        <EntityTable
          data={users}
          columns={userColumns}
          pageSize={5}
          filtersSlot={
            <Input
              className="w-64"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      </ViewLayout.Body>
    </ViewLayout>
  );
}
