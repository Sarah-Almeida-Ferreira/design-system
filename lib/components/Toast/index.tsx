import { HtmlHTMLAttributes, useEffect, useState } from "react";
import "./index.css";

export interface ToastProps extends HtmlHTMLAttributes<HTMLDivElement> {
    message: string;
    duration?: number;
    type?: "info" | "success" | "danger" | "warning";
    onClose?: () => void;
}

export const Toast = ({ message, type = "info", onClose = () => { }, duration = 30000 }: ToastProps) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsActive(false);
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    useEffect(() => {
        setIsActive(true);
    }, []);

    return (
        <div className={`toast toast-${type} ${isActive ? "active" : ""}`}>
            <p className="toast-message">{message}</p>
        </div>
    );
};