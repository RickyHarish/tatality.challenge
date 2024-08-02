import React from 'react';
import { Helmet } from 'react-helmet';

// Using default parameters
const Meta = ({ title = 'Welcome to Totality Corp', description = 'We sell the best Properties for cheap', keywords = 'House, buy Houses, cheap Houses' }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

export default Meta;
