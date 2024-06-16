import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const ResultContainer = styled.div`
  width: 100%;
  background-color: #1e1e1e;
  color: #dcdcdc;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
`;

const ResultBox = ({ content }) => {
  return (
    <ResultContainer>
      <ReactMarkdown>{content}</ReactMarkdown>
    </ResultContainer>
  );
};

export default ResultBox;
