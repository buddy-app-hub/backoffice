import React, {useState} from 'react';
import {User, UserFields, UserPersonalDataFields} from '@/types/User';
import {ITableColumn, Table} from "@/components/layout/Table";
import {UserDetailDialog} from "@/components/user/UserDetailDialog";

interface UsersTableProps {
  users?: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [userDetail, setUserDetail] = useState<User>();

  const columns : ITableColumn[] = [
    {
      label: 'Firebase UID', attribute: UserFields.FirebaseUID, cellClass: 'font-medium'
    },
    { label: 'Tipo', attribute: UserFields.UserType, cellClass: "capitalize" },
    { label: 'Nombre', attribute: [UserFields.PersonalData, UserPersonalDataFields.FirstName] },
    { label: 'Nombre', attribute: [UserFields.PersonalData, UserPersonalDataFields.LastName] },
    { label: 'Género', attribute: [UserFields.PersonalData, UserPersonalDataFields.Gender], cellClass: "capitalize" },
    { label: 'Email', attribute: UserFields.Email }
  ]

  const onCloseDialogDetail = () => setUserDetail(undefined)


  return (
    <div className="relative overflow-x-auto">
      <Table<User> key={"user_table"}
                   columns={columns}
                   data={users}
      />

      <UserDetailDialog user={userDetail}
                        onClose={onCloseDialogDetail}
      />
    </div>
  );
};

export default UsersTable;
