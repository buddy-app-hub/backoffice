import React from "react";
import { X } from "@phosphor-icons/react";

interface DialogProps {
    open: boolean,
    title: string,
    children: React.ReactNode,
    onClose: () => void,
    action?: React.ReactNode
}

export function Dialog({ open, title, children, action, onClose}: DialogProps) {
    return (
        <div className="relative z-10" style={{ display: open ? '' : 'none' }} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                        <div className={"border-b-2 border-neutral-100"}>
                            <div className={"py-4 px-3 flex flex-row justify-between items-center"}>
                                <h1 className="text-2xl font-bold">{title}</h1>

                                <X onClick={onClose} />
                            </div>
                        </div>

                        <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                            {children}
                        </div>

                        {
                            action &&
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    {action}
                                </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

/*
<button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
<button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
* */
