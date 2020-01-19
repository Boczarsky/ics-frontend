import React from 'react';
import IcecreamFlavour from './IcecreamFlavour';
import randomKey from '../../utils/randomKey';
import { useDispatch } from 'react-redux';
import { openModal } from '../../reducers/Modals/actions';

const ShopFlavours = () => {
  const flavours = [
    {id: 1, name: 'Fancy flavour name', reactions: [105,15,2], composition: 'Natural cream, sugar, secret ingredient, another secret ingredient, some love, sparkling awesomness', tags: ['Tag', 'Another', 'Again', 'AndAgain', 'AnotherOne', 'SomeCrazyAssLongOneThatNoOneWillRemember', 'AnotherOneAnother', 'AgainAndAgain', 'NextUp', 'Dingididong'], status: 1},
    {id: 2, name: 'Fancy flavour name', reactions: [105,15,2], composition: 'Natural cream, sugar, secret ingredient, another secret ingredient, some love, sparkling awesomness', tags: ['Tag', 'Another', 'Again', 'AndAgain', 'AnotherOne', 'SomeCrazyAssLongOneThatNoOneWillRemember'], status: 2},
    {id: 3, name: 'Fancy flavour name', reactions: [105,15,2], composition: 'Natural cream, sugar, secret ingredient, another secret ingredient, some love, sparkling awesomness', tags: ['Tag', 'Another', 'Again', 'AndAgain', 'AnotherOne', 'SomeCrazyAssLongOneThatNoOneWillRemember'], status: 3},
    {id: 4, name: 'Fancy flavour name', reactions: [105,15,2], composition: 'Natural cream, sugar, secret ingredient, another secret ingredient, some love, sparkling awesomness', tags: ['Tag', 'Another', 'Again', 'AndAgain', 'AnotherOne', 'SomeCrazyAssLongOneThatNoOneWillRemember'], status: 1},
    {id: 5, name: 'Fancy flavour name', reactions: [105,15,2], composition: 'Natural cream, sugar, secret ingredient, another secret ingredient, some love, sparkling awesomness', tags: ['Tag', 'Another', 'Again', 'AndAgain', 'AnotherOne', 'SomeCrazyAssLongOneThatNoOneWillRemember'], status: 2},
    {id: 6, name: 'Fancy flavour name', reactions: [105,15,2], composition: 'Natural cream, sugar, secret ingredient, another secret ingredient, some love, sparkling awesomness', tags: ['Tag', 'Another', 'Again', 'AndAgain', 'AnotherOne', 'SomeCrazyAssLongOneThatNoOneWillRemember'], status: 3},
  ];
  const dispatch = useDispatch();
  const openCreateModal = () => {
    dispatch(openModal('flavourForm'));
  };
  return (
    <div className="shop-flavours">
      <div className="shop-flavours__wrapper">
        {flavours.map(flavour => <IcecreamFlavour key={randomKey()} flavourData={flavour} specialOptions/>)}
      </div>
      <div className="b-button p-font clickable shop-flavours__add-button" onClick={openCreateModal}>Add flavour</div>
    </div>
  )
};

export default ShopFlavours;
