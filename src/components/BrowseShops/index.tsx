import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIcecreamShops } from '../../reducers/IcecreamShops/operations';

const BrowseShops = () => {
  const filters = useSelector((state: any) => state.icecreamShops.filters);
  const icecreamShops = useSelector((state: any) => state.icecreamShops.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIcecreamShops());
  }, [filters, dispatch]);

  return (
    <div className="search-shops">
      {icecreamShops && icecreamShops.map((data: any) => <div key={data}>{data}</div>)}
    </div>
  )
};

export default BrowseShops;
