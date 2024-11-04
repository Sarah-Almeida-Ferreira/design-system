import { HtmlHTMLAttributes, useEffect, useState } from "react";
import "./index.css";

export interface ToastProps extends HtmlHTMLAttributes<HTMLDivElement> {
    message: string;
    duration?: number;
    type?: "info" | "success" | "danger" | "warning";
    onClose: () => void;
}

export const Toast = ({
    message,
    type = "info",
    duration = 3000,
    onClose,
}: ToastProps) => {
    const [isActive, setIsActive] = useState("");
    const [timerStyle, setTimerStyle] = useState({});

    useEffect(() => {
        const timers = [
            setTimeout(() => {
                onClose();
            }, duration + 300),
            setTimeout(() => {
                setIsActive("active");
                setTimerStyle({
                    width: "0%",
                    transition: `width ${duration}ms linear`
                });
            }, 100),
            setTimeout(() => {
                setIsActive("");
            }, duration)
        ];

        return () => {
            timers.forEach(clearTimeout);
            setTimerStyle({});
        };
    }, [onClose, duration]);

    return (
        message &&
        <div className={`toast toast-${type} ${isActive}`}>
            <p className="toast-message">{message}</p>
            <div className="toast-timer" style={timerStyle} role="timer"></div>
        </div>
    );
};