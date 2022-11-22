import React, { useState } from "react";

export interface IAProps {
   content: string | JSX.Element;
   href?: string;
   target?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
const A = (props: IAProps) => {
    const [isHover, setIsHover] = useState(false);
    const style = {
        cursor: "pointer",
        display: "inline-block",
        backgroundColor: isHover ? "black" : "inherit",
        color: isHover ? "white" : "inherit",
        borderRadius: isHover ? "30px" : "0",
        padding: isHover ? "12px" : "0"
    }
    return (
        <a
            onClick={props.onClick}
            style={style}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            href={props.href}
            >{props.content}</a>
    )
}

export default A;
