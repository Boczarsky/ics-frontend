import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIcecreamShops } from '../../reducers/IcecreamShops/operations';
import AppLayout from '../common/AppLayout';
import randomKey from '../../utils/randomKey';
import './style.css';
import ShopOverview from '../common/ShopOverview';
import { useHistory } from 'react-router-dom';

const BrowseShops = () => {
  const filters = useSelector((state: any) => state.icecreamShops.filters);
  const icecreamShops = useSelector((state: any) => state.icecreamShops.list);
  const dispatch = useDispatch();
  const appliedFilters = [filters.city, ...filters.tags.map((tag: string) => `#${tag}`)];

  useEffect(() => {
    dispatch(fetchIcecreamShops());
  }, [filters, dispatch]);

  const history = useHistory();

  const handleShopClick = (data: any) => {
    history.push(`/browse/${data.id}`)
  };

  return (
    <AppLayout
      topbarContent={
        <div className="browse-shops__filters">
          {appliedFilters.map((filter: string) => <div className="browse-shops__pill pill" key={randomKey()}>{filter}</div>)}
        </div>
      }
    >
      <div className="browse-shops">
        {icecreamShops && icecreamShops.map(
          (shopData: any) => (
            <ShopOverview
              data={shopData}
              handleClick={handleShopClick}
            />
          )
        )}
      </div>
    </AppLayout>
  )
};

export default BrowseShops;
