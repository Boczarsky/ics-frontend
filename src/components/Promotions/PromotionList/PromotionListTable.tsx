import React from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../reducers/Modals/actions';

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
  const { promotions } = props;
  const dispatch = useDispatch();
  const openAssignModal = (promotionId: number) => () => {
    dispatch(openModal('assignShop', {promotionId}));
  }
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
          {promotions.map(promotion => (
          <tr key={`promotion-list-row-${promotion.id}`}>
            <td>{promotion.id}</td>
            <td>{promotion.info}</td>
            <td>{promotion.prize}</td>
            <td>{promotion.limit}</td>
            <td>{promotion.startDate}</td>
            <td>{promotion.endDate}</td>
            <td><div className="f-col-center">{promotion.icecreamShops.map(icecreamShop => (<span>{icecreamShop}</span>))}</div></td>
            <td><div className="clickable p-font b-button" onClick={openAssignModal(promotion.id)}>Assign icecream shop</div></td>
            <td><div className="clickable p-font b-button b-button--red">End promotion</div></td>
          </tr>
          ))}
      </table>
    </div>
  )
};

export default PromotionListTable;
