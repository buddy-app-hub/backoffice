import React, {useState} from "react";
import {User, UserFields} from "@/types/User";
import {Checks, Warning} from "@phosphor-icons/react";
import Chip, {ChipColor} from "@/components/layout/Chip";
import Tooltip from "@/components/layout/Tooltip";
import {UserBuddyDetailDialog} from "@/components/user/UserBuddyDetailDialog";

interface UserTypeStateChipProps {
    user: User,
    onSubmit: () => void
}

const iconsByBuddyState : Record<'true' | 'false', Record<'true' | 'false', React.ReactNode>> = {
    'true': { 'true': <Checks />,  'false': <Checks /> },
    'false': { 'true': <Warning />, 'false': undefined }
}

const colorByBuddyState : Record<'true' | 'false', Record<'true' | 'false', ChipColor>> = {
    'true': { 'true': 'success',  'false': 'success' },
    'false': { 'true': 'warning', 'false': 'default' }
}

export function UserTypeStateChip({ user, onSubmit }: UserTypeStateChipProps) {
    const [userDetail, setUserDetail] = useState<User>();

    const userType = user[UserFields.UserType];
    const isBuddy = userType == "buddy";
    const isApproved : boolean = isBuddy && user[UserFields.IsApprovedBuddy];
    const pending : boolean = isBuddy && user[UserFields.IsApplicationToBeBuddyUnderReview];
    const icon = isBuddy ? iconsByBuddyState[isApproved ? 'true' : 'false'][pending ? 'true' : 'false'] : undefined;
    const color = isBuddy ? colorByBuddyState[isApproved ? 'true' : 'false'][pending ? 'true' : 'false'] : 'default';

    const openBuddyDetail = () => setUserDetail(user);

    const closeBuddyDetail = () => setUserDetail(undefined);

    const tooltipText =
        isApproved ? `Buddy aprobado` : pending ? 'Pendiente de aprobación' : undefined;

    return (
        <React.Fragment>

            <Tooltip tooltipText={tooltipText}>
                <Chip label={userType}
                      color={color}
                      onClick={isBuddy ? openBuddyDetail : undefined}
                      icon={icon}
                />
            </Tooltip>

            <UserBuddyDetailDialog user={userDetail}
                                   onClose={closeBuddyDetail}
                                   onSubmit={onSubmit}
            />
        </React.Fragment>
    )
}