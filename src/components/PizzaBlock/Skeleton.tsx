import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f1f5f2"
    foregroundColor="#ecebeb">
    <circle cx="138" cy="138" r="125" />
    <rect x="0" y="275" rx="10" ry="10" width="280" height="27" />
    <rect x="137" y="296" rx="0" ry="0" width="0" height="1" />
    <rect x="0" y="332" rx="10" ry="10" width="280" height="52" />
    <rect x="123" y="412" rx="25" ry="25" width="156" height="48" />
    <rect x="4" y="425" rx="5" ry="5" width="100" height="22" />
  </ContentLoader>
);
