import React, {useState} from 'react';
import {User, UserFields, UserPersonalDataFields} from '@/types/User';
import {ITableColumn, Table, TableColumnType} from "@/components/layout/Table";
import {UserDetailDialog} from "@/components/user/UserDetailDialog";
import {UserTypeStateChip} from "@/components/user/UserTypeStateChip";

interface UsersTableProps {
  users?: User[];
  onReloadTable: () => void
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onReloadTable }) => {
  const [userDetail, setUserDetail] = useState<User>();

  const columns : ITableColumn[] = [
    {
        label: 'Usuario', attribute: '',
        onRenderCell: (user: User) =>
            <div>
                <p className={"font-semibold"} style={{ fontSize: '18px' }}>{`${user[UserFields.PersonalData]?.[UserPersonalDataFields.FirstName]} ${user[UserFields.PersonalData]?.[UserPersonalDataFields.LastName]}`}</p>
                <p className={"text-gray-400"}>{`UID: ${user[UserFields.FirebaseUID]}`}</p>
            </div>
    },
    { label: 'Género', attribute: [UserFields.PersonalData, UserPersonalDataFields.Gender], cellClass: "capitalize" },
    {
        label: 'Tipo',
        attribute: UserFields.UserType, cellClass: "capitalize",
        onRenderCell: (e: User) => <UserTypeStateChip user={e} onSubmit={onReloadTable} />
    },
    { label: 'Fecha de Registro', attribute: UserFields.RegistrationDate, type: TableColumnType.Date },
    {
        label: 'Identidad', attribute: '',
        onRenderCell: (user: User) =>
            <div>

            </div>
    }, // UserFields.IsIdentityValidated
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
