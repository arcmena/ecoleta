import React from "react";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <div>
            <h2>asdas</h2>
            <h3>{props.title}</h3>
        </div>
    );
};

export default Header;
