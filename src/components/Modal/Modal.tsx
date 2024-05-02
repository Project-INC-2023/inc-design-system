import React, {
  ReactElement,
  createContext,
  forwardRef,
  useContext,
  useState,
} from "react";

export type ModalProps = {
  children: React.ReactNode;
};

type ModalContextType = {
  isVisible: boolean;
  toggleVisibility: () => void;
};

const ModalContext = createContext({
  isVisible: false,
  toggleVisibility: () => {},
} as ModalContextType);

export const useModal = () => useContext(ModalContext);

const Modal = React.forwardRef<ReactElement, ModalProps>(
  ({ children, ...props }, forwardRef) => {
    const [isVisible, setIsVisible] = useState(false);

    return <div>Modal</div>; // Add a return statement here
  }
); // Add a semicolon here

export default Modal;
