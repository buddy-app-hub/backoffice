import {User, UserFields, UserPersonalDataFields} from "@/types/User";
import {Dialog} from "@/components/layout/Dialog";

interface UserDetailDialogProps {
    user?: User,
    onClose: () => void
}

export function UserDetailDialog({ user, onClose }: UserDetailDialogProps) {

    const dialogActions =
        <button type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
            Cerrar
        </button>;

    return (
        <Dialog open={!!user}
                title={user?.[UserFields.PersonalData]?.[UserPersonalDataFields.LastName] || ''}
                action={dialogActions}
                onClose={onClose}
        >
            Hola
        </Dialog>
    )
}