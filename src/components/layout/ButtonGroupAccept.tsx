import classNames from "classnames";
import {useState} from "react";

enum StatusRejectAccept {
    Accept,
    Reject
}

interface ButtonGroupAcceptProps {
    onSubmit: (_: boolean) => void
}

function ButtonGroupAccept({onSubmit}: ButtonGroupAcceptProps) {
    const [value, setValue] = useState<StatusRejectAccept>();

    const classesBase = "inline-block px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0 motion-reduce:transition-none"
    const classesReject = classNames(
        classesBase,
        "rounded-s",
        "border-t-2 border-l-2 border-b-2 border-red-800",
        {
            "text-red-800 bg-white hover:text-white hover:bg-red-800": value !== StatusRejectAccept.Reject
        },
        {
            "text-white bg-red-800 hover:text-white hover:bg-red-800": value === StatusRejectAccept.Reject
        }
    )

    const classesAccept = classNames(
        classesBase,
        "rounded-e",
        "",
        "border-t-2 border-r-2 border-b-2 border-green-800",
        {
            "text-green-800 bg-white hover:text-white hover:bg-green-800": value !== StatusRejectAccept.Accept
        },
        {
            "text-white bg-green-800 hover:text-white hover:bg-green-800": value === StatusRejectAccept.Accept
        }
    )

    const onHandleSubmit = () => {
        if (value != undefined)
            onSubmit(value === StatusRejectAccept.Accept);
    }

    const onClickReject = () => setValue(StatusRejectAccept.Reject);

    const onClickAccept = () => setValue(StatusRejectAccept.Accept);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
                className="inline-flex rounded-md shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-1 dark:focus:shadow-dark-1 dark:active:shadow-dark-1"
                role="group"
            >
                <button type="button"
                        className={classesReject}
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                        onClick={onClickReject}
                        style={{
                            borderTop: "1px solid",
                            borderLeft: "1px solid",
                            borderBottom: "1px solid",
                            borderRight: "1px solid grey",
                        }}
                >
                    Rechazar
                </button>

                <button type="button"
                        className={classesAccept}
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                        onClick={onClickAccept}
                        style={{
                            borderTop: "1px solid",
                            borderBottom: "1px solid",
                            borderRight: "1px solid",
                        }}
                >
                    Aprobar
                </button>
            </div>

            <button className="flex w-40 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={onHandleSubmit}
            >
                Confirmar
            </button>
        </div>
    )
}

export default ButtonGroupAccept;