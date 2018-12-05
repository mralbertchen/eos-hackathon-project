import React from 'react';

const MarketplaceImage = ({ color = '#2ffcce' }) => {
  return (
    <svg height="84" width="94" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M19.6 63.2a9.8 9.8 0 0 1-9.8-9.8V1h19.6v52.4c0 5.4-4.4 9.8-9.8 9.8zM12.9 4v49.4a6.7 6.7 0 0 0 13.4 0V4z" />
      <path fill={color} d="M7.4 1h24.4v3H7.4zM47.2 63.2a9.8 9.8 0 0 1-9.8-9.8V1H57v52.4c0 5.4-4.3 9.8-9.7 9.8zM40.5 4v49.4a6.7 6.7 0 0 0 13.4 0V4z" />
      <path fill={color} d="M35 1h24.4v3H35zM74.8 63.2a9.8 9.8 0 0 1-9.8-9.8V1h19.5v52.4c0 5.4-4.4 9.8-9.7 9.8zM68 4v49.4a6.7 6.7 0 0 0 13.4 0V4z" />
      <path fill={color} d="M62.5 1H87v3H62.5zM28.5 83.8H10.7v-9.2h17.8v9.2zm-14.8-3.1h11.8v-3H13.7zM83.7 83.8H65.8v-9.2h17.9zm-14.8-3.1h11.7v-3H69z" />
      <path fill={color} d="M93.3 77.6H.7V25.4h92.6zm-89.6-3h86.6V28.4H3.7z" />
      <path fill={color} d="M21.2 48.8h3v2.7h-3zM21.2 32h3v13.3h-3zM76.3 48.8h3v2.7h-3zM76.3 32h3v13.3h-3zM49 48.8h3v2.7h-3zM49 32h3v13.3h-3z" />
    </svg>
  );
};

export default MarketplaceImage;