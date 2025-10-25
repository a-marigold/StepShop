'use client';

import CartButton from './CartButton';
import ProfileButton from './ProfileButton';

import userStyles from './UserButtons.module.scss';

interface UserButtonsProps {
    excludeProfileButton?: boolean;
    excludeCartButton?: boolean;
}
export default function UserButtons({
    excludeProfileButton = false,
    excludeCartButton = false,
}: UserButtonsProps) {
    return (
        <>
            <div
                className={`${userStyles['user-buttons-block']} user-buttons-public`}
            >
                {/* ^^ user-buttons-public class used for setting display none on them by using class toggle on body ^^*/}

                {excludeProfileButton && <ProfileButton />}

                {excludeCartButton && <CartButton />}
            </div>
        </>
    );
}
