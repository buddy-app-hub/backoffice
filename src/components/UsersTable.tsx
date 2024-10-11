import React from 'react';
import {User, UserFields} from '@/types/User';
import {ITableColumn, Table} from "@/components/layout/Table";

interface UsersTableProps {
  users: User[];
}

const columns : ITableColumn[] = [
  {
    label: 'Firebase UID', attribute: UserFields.FirebaseUID, cellClass: 'font-medium'
  },
  { label: 'Tipo', attribute: UserFields.UserType },
  { label: 'Nombre', attribute: UserFields.FirstName },
  { label: 'Apellido', attribute: UserFields.LastName },
  { label: 'Género', attribute: UserFields.Gender },
  { label: 'Email', attribute: UserFields.Email }
]

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <div className="relative overflow-x-auto">
      <Table<User> key={"user_table"}
                   columns={columns}
                   data={users}
      />
    </div>
  );
};

export default UsersTable;
