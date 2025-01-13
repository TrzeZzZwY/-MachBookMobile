import { useState } from "react";
import PopupBase from "./PopupBase";

export type PopupProps = {
    header: string,
    children?: React.ReactNode | null
}

const usePopup = (): [boolean,() => void, () => void, (props: PopupProps) => React.ReactNode] => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const close = () => setOpen(false);
    const open = () => setOpen(true);

    const Popup = ({ header, children }: PopupProps) => {
        return (
            <PopupBase close={close} isOpen={isOpen} header={header}>
                {children}
            </PopupBase>
        )
    }


    return [isOpen, open, close, Popup]
}

export default usePopup;