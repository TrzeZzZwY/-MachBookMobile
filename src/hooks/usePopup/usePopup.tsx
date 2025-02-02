import { useState } from "react";
import PopupBase from "./PopupBase";

export type PopupProps = {
    children?: React.ReactNode | null
}

const usePopup = (): [boolean,(header: string) => void, () => void, (props: PopupProps) => React.ReactNode] => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [header,setHeader] = useState<string>("");

    const close = () => setOpen(false);
    const open = (header: string) => {
        setHeader(header);
        setOpen(true);
    };

    const Popup = ({ children }: PopupProps) => {
        return (
            <PopupBase close={close} isOpen={isOpen} header={header}>
                {children}
            </PopupBase>
        )
    }


    return [isOpen, open, close, Popup]
}

export default usePopup;