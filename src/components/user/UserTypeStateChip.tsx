import React, {useEffect} from "react";
import {User, UserFields} from "@/types/User";
import {Checks, Warning} from "@phosphor-icons/react";
import Chip from "@/components/layout/Chip";
import Tooltip from "@/components/layout/Tooltip";

interface UserTypeStateChipProps {
    user: User
}

const iconsByBuddyState : Record<boolean, Record<boolean, React.ReactNode>> = {
    true: { true: <Checks />,  false: <Checks /> },
    false: { true: <Warning />, false: undefined }
}

const colorByBuddyState : Record<boolean, Record<boolean, string>> = {
    true: { true: 'success',  false: 'success' },
    false: { true: 'warning', false: undefined }
}

export function UserTypeStateChip({ user }: UserTypeStateChipProps) {
    const userType = user[UserFields.UserType];
    const isBuddy = userType == "buddy";

    const isApproved : boolean = isBuddy && user[UserFields.IsApprovedBuddy];
    const pending : boolean = isBuddy && user[UserFields.IsApplicationToBeBuddyUnderReview];

    const icon = isBuddy ? iconsByBuddyState[isApproved][pending] : undefined;
    const color = isBuddy ? colorByBuddyState[isApproved][pending] : undefined;
    const onClick = undefined;

    const tooltipText =
        isApproved ? `Buddy aprobado` : pending ? 'Pendiente de aprobación' : undefined;

    return (
        <React.Fragment>

            <Tooltip tooltipText={tooltipText}>
                <Chip label={userType} color={color} onClick={onClick} icon={icon} />
            </Tooltip>

        </React.Fragment>
    )
}