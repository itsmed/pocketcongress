import React from 'react';

const RepPreview = ({rep}) => (
  <div>
    {
      JSON.stringify(rep, null, 3)
    }
  </div>
);

export default RepPreview;