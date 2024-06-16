import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #61dafb;
  color: #282c34;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #21a1f1;
  }
`;

const SubmitButton = ({ onClick, text }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

export default SubmitButton;
