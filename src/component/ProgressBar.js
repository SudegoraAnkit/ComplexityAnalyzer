import React from 'react';
import styled, { keyframes } from 'styled-components';

const progressAnimation = keyframes`
  0% { width: 0; }
  50% { width: 100%; }
  100% { width: 0; }
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 10px;
  background-color: #3a3a3a;
  margin-top: 20px;
  position: relative;
`;

const Progress = styled.div`
  width: 0;
  height: 100%;
  background-color: #61dafb;
  animation: ${progressAnimation} 2s infinite;
`;

const ProgressBar = () => {
  return (
    <ProgressBarWrapper>
      <Progress />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
