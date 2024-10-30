import { ImgHTMLAttributes, useEffect, useState } from "react";
import logo from "@lib/assets/logo.png";
import emblem from "@lib/assets/emblem.png";
import title from "@lib/assets/title.png";
import "./index.css";

export interface LogoProps extends ImgHTMLAttributes<HTMLImageElement> {
    type?: "logo" | "emblem" | "title";
}

export const Logo = ({ type = "logo", ...props }: LogoProps) => {
    const [src, setSrc] = useState("");

    useEffect(() => {
        const logoTypes = {
            logo,
            emblem,
            title,
        };
        setSrc(logoTypes[type]);
    }, [type]);

    return (
        <img src={src} {...props} />
    );
};
