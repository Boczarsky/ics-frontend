import React from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';
import LabeledSection from '../common/LabeledSection';
import ShopInfo from './ShopInfo';
import ShopFlavours from './ShopFlavours';
import ShopOpinions from './ShopOpinions';
import ShopPosts from './ShopPosts';

const ViewIcecreamShop = () => {
  const logoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSdd6YjBP-BIQra6_ovdfHitBCkIbuy7pCJdhEmCC82pDwcAAO&s';
  const backgroundUrl = 'https://www.tripsavvy.com/thmb/TlJ3PJXEBydnqPw6GHQP8_cEsUU=/4026x2475/filters:fill(auto,1)/icecream-56a237e33df78cf772735f9f.jpg';
  return (
    <AppLayout
      topbarContent={<div className="page-title">{'Cool Icecream Shop'}</div>}
    >
      <div className="view-icecream-shop">
        <div className="view-icecream-shop__header-images">
          <div className="view-icecream-shop__background">
            {backgroundUrl ? <img src={backgroundUrl} alt="background"/> : <div className="view-icecream-shop__image-placeholder"/>}
          </div>
          <div className="view-icecream-shop__logo">
            {logoUrl ? <img src={logoUrl} alt="logo"/> : <div className="view-icecream-shop__image-placeholder"/>}
          </div>
        </div>
        <div className="view-icecream-shop__favorite">
          <div className="b-button p-font clickable">Add to favorite</div>
        </div>
        <div className="view-icecream-shop__description-wrapper">
          <div className="view-icecream-shop__description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti exercitationem possimus accusamus repudiandae nobis rerum dolor quae quaerat, facere dolore voluptatem, consectetur a et vel amet fuga asperiores aperiam nemo.</div>
        </div>
        <LabeledSection label="Flavours">
          <ShopFlavours/>
        </LabeledSection>
        <LabeledSection label="Shop info">
          <ShopInfo/>
        </LabeledSection>
        <LabeledSection label="Opinions">
          <ShopOpinions/>
        </LabeledSection>
        <LabeledSection label="Posts">
          <ShopPosts/>
        </LabeledSection>
      </div>
    </AppLayout>
  )
};

export default ViewIcecreamShop;
