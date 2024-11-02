import { HtmlHTMLAttributes, useEffect } from "react";
import "./index.css";

export interface ToastProps extends HtmlHTMLAttributes<HTMLDivElement> {
    message: string;
    duration?: number;
    type?: "info" | "success" | "danger" | "warning";
    onClose?: () => void;
}

export const Toast = ({ message, type = "info", onClose = () => { }, duration = 30000 }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className={`toast toast-${type}`}>
            <p className="toast-message">{message}</p>
        </div>
    );
};