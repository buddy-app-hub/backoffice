import {User, UserFields, UserPersonalDataFields} from "@/types/User";
import {Dialog} from "@/components/layout/Dialog";
import {useContext, useEffect, useState} from "react";
import {FirebaseMediaService} from "@/services/firebaseMediaService";
import ButtonGroupAccept from "@/components/layout/ButtonGroupAccept";
import {ApiUser} from "@/services/userApi";
import {LoaderContext} from "@/pages/_app";

interface UserBuddyDetailDialogProps {
    user?: User,
    onClose: () => void,
    onSubmit: () => void
}

export function UserBuddyDetailDialog({ user, onClose, onSubmit }: UserBuddyDetailDialogProps) {
    const { showLoader, hideLoader } = useContext(LoaderContext);
     const [srcPresentation, setSrcPresentation] = useState<string>();

    const nameBuddy = user ? `${user?.[UserFields.PersonalData]?.[UserPersonalDataFields.FirstName]} ${user?.[UserFields.PersonalData]?.[UserPersonalDataFields.LastName]}` : ''

    const dialogActions =
        <button type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
            Cerrar
        </button>;

    const onHandleSubmit = (approve: boolean) => {
        if (user) {
            showLoader();

            const promise = approve ? ApiUser.approveBuddy : ApiUser.rejectBuddy;

            promise(user[UserFields.FirebaseUID])
                .then(onSubmit)
                .finally(hideLoader)
        }
    }

    useEffect(() => {
        setSrcPresentation(undefined);
        if (user)
            FirebaseMediaService.getUserVideoPresentation(user[UserFields.FirebaseUID])
                .then(setSrcPresentation);
    }, [user]);

    return (
        <Dialog open={!!user}
                title={"Detalle del Buddy"}
                action={dialogActions}
                onClose={onClose}
        >
            <div className={"grid gap-5"}>
                <div className="grid grid-cols-12 gap-2">
                    <div className={"col-span-6 grid gap-1"}>
                        <p className={"italic text-gray-500"} style={{ fontSize: '12px' }}>Nombre</p>
                        <p className={"font-semibold"} style={{ fontSize: '18px' }}>{nameBuddy}</p>
                    </div>

                    <div className={"col-span-6 grid gap-1"}>
                        <p className={"italic text-gray-500"} style={{ fontSize: '12px' }}>Email</p>
                        <p className={"font-semibold"} style={{ textTransform: 'none', fontSize: '18px' }}>
                            {user?.[UserFields.Email]}
                        </p>
                    </div>
                </div>

                <div className={"grid gap-1"}>
                    <p className={"italic text-gray-500"} style={{ fontSize: '12px' }}>Estado</p>
                    {
                        user ?
                            user[UserFields.IsApplicationToBeBuddyUnderReview] ?
                                <ButtonGroupAccept onSubmit={onHandleSubmit} />
                                :
                                <p className={"font-semibold"} style={{ textTransform: 'none', fontSize: '18px' }}>
                                    {user[UserFields.IsApprovedBuddy] ? "Aprobado" : "Pendiente de carga"}
                                </p>
                            :
                            <div />
                    }
                </div>

                {
                    (user && (user[UserFields.IsApplicationToBeBuddyUnderReview] || user[UserFields.IsApprovedBuddy])) &&
                        <div className={"grid gap-1"}>
                            <p className={"italic text-gray-500"} style={{ fontSize: '12px' }}>Video presentación</p>

                            <div style={{ textAlign: '-webkit-center' }}>
                                {
                                    srcPresentation &&
                                        <video controls>
                                            <source src={srcPresentation} type="video/mp4" />
                                        </video>
                                }
                            </div>
                        </div>
                }
            </div>
        </Dialog>
    )
}