import React, { useState, useEffect } from 'react';
import { FiThumbsUp } from 'react-icons/fi';
import { Container } from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalAddConfirmation: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  return (
    <>
      {show && (
        <Container onClick={setIsOpen}>
          <FiThumbsUp size={40} />
          <h1>Prato Adicionado!</h1>
        </Container>
      )}
    </>
  );
};

export default ModalAddConfirmation;
