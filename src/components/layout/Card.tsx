import React from "react";

interface CardProps {
    title?: string,
    children?: React.ReactNode,
    addPaddingContent?: boolean
}

export function Card({ title, children, addPaddingContent = false }: CardProps) {
    return (
        <div className="block rounded-lg bg-white text-surface shadow-secondary-1">

            { title && <CardHeader title={title} /> }

            <CardContent content={children} addPadding={addPaddingContent} />
        </div>
    )
}

interface CardHeaderProps {
    title: string
}

function CardHeader({ title }: CardHeaderProps) {
    return (
        <div className={"border-b-2 border-neutral-100"}>
            <div className={"py-4 px-3 "}>
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
        </div>
    )
}

interface CardContentProps {
    content?: React.ReactNode,
    addPadding?: boolean
}

function CardContent({ content, addPadding }: CardContentProps) {
    const paddingClass = addPadding ? "p-6" : "p-0"

    return (
        <div className={paddingClass}>
            { content && content }
        </div>
    )
}