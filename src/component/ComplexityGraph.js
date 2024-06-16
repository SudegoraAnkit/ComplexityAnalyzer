import React from 'react';
import './ComplexityGraph.css';

const ComplexityGraph = ({ timeComplexity, spaceComplexity }) => {
  return (
    <div className="complexity-graph">
      <div className="complexity-item">
        <div className="complexity-label">Time Complexity</div>
        <div className="complexity-value">{timeComplexity}</div>
      </div>
      <div className="complexity-item">
        <div className="complexity-label">Space Complexity</div>
        <div className="complexity-value">{spaceComplexity}</div>
      </div>
    </div>
  );
};

export default ComplexityGraph;
