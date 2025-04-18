"use client";

import DeleteModal from "@/components/modals/DeleteModal";
import { createContext, useContext, useState } from "react";

interface ConfirmContextType {
  showAlert: (message: string) => void;
  closeAlert: () => void;
  onConfirm: (callback: () => void) => void;
}

const ConfirmContext = createContext<ConfirmContextType>({
  showAlert: () => {},
  closeAlert: () => {},
  onConfirm: () => {},
});

export const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState<(() => void) | null>(null);

  const showAlert = (message: string) => {
    setMessage(message);
    setAlertState(true);
  };

  const handleConfirm = async () => {
    setIsDeleting(true);
    if (confirmCallback) {
      await confirmCallback();
    }
    closeAlert();
  };

  const handleCancel = () => {
    setIsDeleting(false);
    setAlertState(false);
  };

  const closeAlert = () => {
    setAlertState(false);
    setIsDeleting(false);
    setConfirmCallback(null);
  };

  const onConfirm = (callback: () => void) => {
    setConfirmCallback(() => callback);
  };

  return (
    <ConfirmContext.Provider value={{ showAlert, closeAlert, onConfirm }}>
      {alertState && (
        <DeleteModal
          message={message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isDeleting={isDeleting}
        />
      )}
      {children}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);
