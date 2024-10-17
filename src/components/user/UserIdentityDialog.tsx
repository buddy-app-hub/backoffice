import {User, UserFields, UserPersonalDataFields} from "@/types/User";
import {useEffect, useState} from "react";
import {FirebaseMediaService} from "@/services/firebaseMediaService";
import {Dialog} from "@/components/layout/Dialog";

interface UserIdentityDialogProps {
    user?: User,
    onClose: () => void,
}

interface IdentityMediaType {
    front?: string,
    back?: string,
    selfie?: string
}

export function UserIdentityDialog({ user, onClose }: UserIdentityDialogProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [dataMedia, setDataMedia] = useState<IdentityMediaType>({});

    const nameBuddy = user ? `${user?.[UserFields.PersonalData]?.[UserPersonalDataFields.FirstName]} ${user?.[UserFields.PersonalData]?.[UserPersonalDataFields.LastName]}` : ''

    const dialogActions =
        <button type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
            Cerrar
        </button>;

    const searchIdentityMedia = (id: string) => {
        setLoading(true);
        setDataMedia({});

        FirebaseMediaService.getUserIdentityMedia(id)
            .then(response => {
                const media : IdentityMediaType = {};

                response.forEach(urlPhoto => {
                    if (urlPhoto.includes("front_id")) {
                        media.front = urlPhoto
                    }
                    else if (urlPhoto.includes("back_id")) {
                        media.back = urlPhoto
                    }
                    else if (urlPhoto.includes("selfie")) {
                        media.selfie = urlPhoto
                    }
                });

                setDataMedia(media)
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        setDataMedia({});
        if (user)
            searchIdentityMedia(user[UserFields.FirebaseUID]);
    }, [user]);

    return (
        <Dialog open={!!user}
                title={"Datos de la Identidad"}
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
            </div>

            <div className={"grid gap-5 mt-5"}>
                <p className={"italic text-gray-500"} style={{ fontSize: '12px' }}>Documentación</p>

                <IdentityMediaComponent label={"Frente DNI"}
                                        loading={loading}
                                        media={dataMedia?.front}
                />

                <IdentityMediaComponent label={"Dorso DNI"}
                                        loading={loading}
                                        media={dataMedia?.back}
                />

                <IdentityMediaComponent label={"Prueba de Vida"}
                                        loading={loading}
                                        media={dataMedia?.selfie}
                />
            </div>
        </Dialog>
    )
}

interface IdentityMediaComponentProps {
    label: string,
    loading: boolean,
    media?: string
}

function IdentityMediaComponent({ label, media, loading}: IdentityMediaComponentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const imgStyle = { borderRadius: '4px' };

    return (
        <div className="flex flex-row justify-between bg-gray-100 p-4 items-center" style={{ borderRadius: '16px' }}>
            <span className="font-semibold" style={{ fontSize: '16px' }} >{label}</span>

            {
                loading ?
                    <div className="w-[60px] h-[60px] bg-gray-300 animate-pulse" style={imgStyle}></div>
                    :
                    media ?
                        <img src={media} height={60} width={60}
                             alt={`${label.replace(/ /g, "")}`}
                             className={"hover:cursor-pointer"}
                             style={imgStyle}
                             onClick={() => setIsOpen(true)} />
                        :
                        <p className={"italic text-gray-500"} style={{ fontSize: '12px' }}>Pendiente de carga</p>
            }

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setIsOpen(false)}
                >
                    <img
                        src={media}
                        alt={`${label.replace(/ /g, "")}_zoom`}
                        className="w-2/3 h-auto max-h-screen"
                    />
                </div>
            )}
        </div>
    )
}