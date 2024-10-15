import React, { useState } from 'react';

interface TooltipProps {
    tooltipText?: string,
    children?: React.ReactNode
}

function Tooltip ({ children, tooltipText }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const onMouseEnter = () => setIsVisible(true);

    const onMouseLeave = () => setIsVisible(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}

            {
                (isVisible && tooltipText) && (
                    <div data-tooltip="tooltip-animation" data-tooltip-mount="opacity-100 scale-100"
                         data-tooltip-unmount="opacity-0 scale-0 pointer-events-none"
                         data-tooltip-transition="transition-all duration-200 origin-bottom"
                         className="absolute z-50 mt-1.5 text-nowrap whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white -translate-x-1/2 left-1/2"
                        style={{ textTransform: 'initial' }}
                    >
                        {tooltipText}
                    </div>
            )}
        </div>
    );
}

export default Tooltip;