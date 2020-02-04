import React from 'react';
import './style.css';
import randomKey from '../../utils/randomKey';
import { days } from '../../utils/dayOptions';

export interface ShopInfoProps {
  street: string;
  city: string;
  postalCode: string;
  googleMapLink: string;
  openDays: {from: string, to: string, hourFrom: string, hourTo: string}[]
  specialDays: {closed: number, from: string, to: string, hourFrom: string, hourTo: string}[]
}

const ShopInfo = (props: ShopInfoProps) => {
  const { street, city, postalCode, googleMapLink, openDays, specialDays } = props;
  const specialClosed = specialDays.filter(item => item.closed);
  const specialOpened = specialDays.filter(item => !item.closed);
  return (
    <div className="shop-info">
      <div className="shop-info__info-wrapper">
        <div className="shop-info__address">
          <div className="shop-info__address-header p-font">Address:</div>
          <div className="shop-info__address-wrapper">
            <div className="shop-info__street">{street}</div>
            <div className="shop-info__city">{postalCode} {city}</div>
          </div>
        </div>
        {openDays && openDays.length > 0 && <div className="shop-info__open-days">
          <div className="shop-info__open-days-header p-font">Opening hours:</div>
          <div className="shop-info__open-days-wrapper">
            {openDays.map(data => (
              <div key={randomKey()} className="shop-info__open-days-row">
                {data.from !== data.to ? <>
                  <span>{days[data.from]} - {days[data.to]}</span>
                  <span>{data.hourFrom} - {data.hourTo}</span>
                </> : <>
                  <span>{days[data.from]}</span>
                  <span>{data.hourFrom} - {data.hourTo}</span>
                </>
                }
              </div>
            ))}
          </div>
        </div>}
        {specialOpened && specialOpened.length > 0 && <div className="shop-info__special-days">
          <div className="shop-info__special-days-header p-font">Extra opening hours:</div>
          <div className="shop-info__special-days-wrapper">
            {specialOpened.map(data => (
              <div key={randomKey()} className="shop-info__special-days-row">
                {data.to ? <>
                  <span>{data.from} - {data.to}</span>
                  <span>{data.hourFrom} - {data.hourTo}</span>
                </> : <>
                  <span>{data.from}</span>
                  <span>{data.hourFrom} - {data.hourTo}</span>
                </>}
              </div>
            ))}
          </div>
        </div>}
        {specialClosed && specialClosed.length > 0 && <div className="shop-info__special-days">
          <div className="shop-info__special-days-header p-font">Closed:</div>
          <div className="shop-info__special-days-wrapper">
            {specialClosed.map(data => (
              <div key={randomKey()} className="shop-info__special-days-row">
                {data.to ? <>
                  <span>{data.from} - {data.to}</span>
                </> : <>
                  <span>{data.from}</span>
                </>}
              </div>
            ))}
          </div>
        </div>}
      </div>
      {googleMapLink && <div className="shop-info__map-wrapper">
        <iframe className="shop-info__embeded-map" src={googleMapLink} title="google maps preview"/>
      </div>}
    </div>
  );
};

export default ShopInfo;
