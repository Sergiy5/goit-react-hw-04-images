import { useEffect, useCallback } from "react";
import { Overlay, Modal } from "./modal.styled";

const ModalWindow = ({ onClose, children }) => {


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = useCallback(e => {
    if (e.code === 'Escape') {
      onClose();
    }
  });

  useEffect
    (() => {
      window.addEventListener('keydown', handleKeyDown);
    },
    [handleKeyDown]);

  useEffect (() => {
    return () => window.removeEventListener('keydown', handleKeyDown);
  })
  
  const handleKlickOwerlay = e => {
    if (e.target.tagName !== 'IMG') {
      onClose();
    }
  };

  return (
    <Overlay className="overlay" onClick={handleKlickOwerlay}>
      <Modal className="modal">{children}</Modal>
    </Overlay>
  );
};

export default ModalWindow;
