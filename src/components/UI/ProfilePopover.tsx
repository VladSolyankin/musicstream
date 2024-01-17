import React from 'react';
import {Button, Popover} from "antd";

const ProfilePopover = ({children, isProfileOpen, onProfileOpen}) => {
    return (
        <Popover
            content={<Profile />}
            trigger="click"
            open={isProfileOpen}
            onOpenChange={onProfileOpen}
        >
            {children}
        </Popover>
    );
};

const Profile = ({onProfileOpen}) => {
    return (
        <div onClick={onProfileOpen} className="flex flex-col justify-center items-center text-lg gap-3">
            <span className="font-bold">Профиль</span>
            <div className="flex items-center gap-5">
                <div className="rounded-3xl border-2 border-black h-12 w-12 flex items-center justify-center">
                    <img src="src/assets/liked.png" alt="" className="w-8 h-8"/>
                </div>
                <div className="flex flex-col">
                    <span>Email: vlad.solyankin@mail.ru</span>
                    <span>Phone: +7911111111</span>
                </div>
            </div>

            <Button size="large">Сменить почту</Button>
        </div>
    )
}

export default ProfilePopover;