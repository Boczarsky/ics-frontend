import React, { useState } from 'react';
import './style.css';

export interface PromotionListTableProps {
  promotions: {
    id: number;
    info: string;
    prize: string;
    limit: number;
    startDate: string;
    endDate: string;
    icecreamShops: string[];
  }[];
}

const PromotionListTable = (props: PromotionListTableProps) => {
  return (
    <div className="promotion-list-table">
      <table>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Prize</th>
            <th>Limit</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Icecream shops involved</th>
            <th colSpan={2}></th>
          </tr>
          {props.promotions.map(promotion => (
          <tr key={`promotion-list-row-${promotion.id}`}>
            <td>{promotion.id}</td>
            <td>{promotion.info}</td>
            <td>{promotion.prize}</td>
            <td>{promotion.limit}</td>
            <td>{promotion.startDate}</td>
            <td>{promotion.endDate}</td>
            <td className="f-col-center">{promotion.icecreamShops.map(icecreamShop => (<span>{icecreamShop}</span>))}</td>
            <td><div className="clickable p-font b-button">End promotion</div></td>
            <td><div className="clickable p-font b-button">Assign icecream shop</div></td>
          </tr>
          ))}
      </table>
    </div>
  )
};

export default PromotionListTable;
