import React from 'react';

export interface FlavourInfoProps {
  name: string;
  reactions: [number, number, number];
}

const FlavourInfo = (props: FlavourInfoProps) => {
  const {name, reactions} = props;
  return (
    <div className="flavour-info">
      <span className="flavour-info__name">{name}</span>
      <span className="flavour-info__reactions">
        <span>
          <span className="flavour-info__reaction-count">{reactions[0] || '0'}</span>
          <span className="flavour-info__reaction-type" role="img" aria-label="love">😍</span>
        </span>
        <span>
        <span className="flavour-info__reaction-count">{reactions[1] || '0'}</span>
          <span className="flavour-info__reaction-type" role="img" aria-label="meh">🥱</span>
        </span>
        <span>
          <span className="flavour-info__reaction-count">{reactions[2] || '0'}</span>
          <span className="flavour-info__reaction-type" role="img" aria-label="hate">😒</span>
        </span>
      </span>
    </div>
  )
}

export default FlavourInfo;
