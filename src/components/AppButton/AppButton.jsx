import styles from "./style.module.css";
import clsx from "clsx";

export function AppButton({
    children,
    type = "primary",
    className,
    height = "50px",
    ...attrs
}) {
    return (
        <button
            {...attrs}
            className={clsx(
                {
                    [styles["app-button"]]: true,
                    [styles["app-button_secondary"]]: type === "secondary",
                    [styles["app-button_gray"]]: type === "gray",
                },
                className,
            )}
            style={{
                height: height,
            }}
        >
            {children}
        </button>
    );
}
