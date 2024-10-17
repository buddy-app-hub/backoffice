import React, {useState} from 'react';
import {User, UserFields, UserPersonalDataFields} from '@/types/User';
import {ITableColumn, Table, TableColumnType} from "@/components/layout/Table";
import {UserDetailDialog} from "@/components/user/UserDetailDialog";
import {UserTypeStateChip} from "@/components/user/UserTypeStateChip";
import {UserIdentityDialog} from "@/components/user/UserIdentityDialog";

interface UsersTableProps {
  users?: User[];
  onReloadTable: () => void
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onReloadTable }) => {
  const [userDetail, setUserDetail] = useState<User>();
  const [userIdentity, setUserIdentity] = useState<User>();

  const columns : ITableColumn<User>[] = [
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
    { label: 'Email', attribute: UserFields.Email },
      {
          label: '', attribute: '',
          onRenderCell: (user: User) =>
              <button onClick={() => setUserIdentity(user)}
                      className="flex w-20 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                  Identidad
              </button>
      }, // UserFields.IsIdentityValidated
  ]

  const onCloseDialogDetail = () => setUserDetail(undefined);

  const onCloseDialogIdentity = () => setUserIdentity(undefined);


  return (
    <div className="relative overflow-x-auto">
      <Table<User> key={"user_table"}
                   columns={columns}
                   data={users}
      />

      <UserDetailDialog user={userDetail}
                        onClose={onCloseDialogDetail}
      />

      <UserIdentityDialog user={userIdentity}
                          onClose={onCloseDialogIdentity}
      />
    </div>
  );
};

export default UsersTable;
