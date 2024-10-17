import React from "react";
import classNames from 'classnames';

export type ChipColor = 'default' | 'warning' | 'success' | 'error'

interface ChipProps {
    label: string
    color?: ChipColor,
    onClick?: () => void,
    icon?: React.ReactNode
}

const mapClassesByColor : Record<ChipColor, { text: string, textHover: string, bg: string, bgHover: string }> = {
    'default': { text: 'text-blue-800', textHover: 'hover:text-blue-100', bg: 'bg-blue-100', bgHover: 'hover:text-blue-800' },
    'warning': { text: 'text-yellow-800', textHover: 'hover:text-yellow-100', bg: 'bg-yellow-100', bgHover: 'hover:bg-yellow-800' },
    'success': { text: 'text-green-800', textHover: 'hover:text-green-100', bg: 'bg-green-100', bgHover: 'hover:bg-green-800' },
    'error': { text: 'text-red-800', textHover: 'hover:text-red-100', bg: 'bg-red-100', bgHover: 'hover:bg-red-800' }
}

function Chip({ label, color = 'default', onClick, icon }: ChipProps) {
    const classesBase = classNames(
        "flex flex-row gap-1 justify-between items-center text-xs font-medium me-2 px-2.5 py-0.5 rounded-full",
        mapClassesByColor[color].text,
        mapClassesByColor[color].bg,
        {
            "hover:cursor-pointer": onClick,
            [mapClassesByColor[color].textHover]: onClick,
            [mapClassesByColor[color].bgHover]: onClick
        }
    )

    return (
        <span className={classesBase} onClick={onClick}>
            {label}

            {icon}
        </span>
    )
}

export default Chip;