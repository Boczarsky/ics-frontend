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
          <ShopInfo
            street="Stanisława Dubois 2"
            city="Gliwice"
            postalCode="44-100"
            googleMapLink={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d450.54185432830764!2d18.675132729216067!3d50.29846832387512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711305447dd7bb3%3A0xa424e9af0bda5f15!2sGelato%20Studio!5e0!3m2!1spl!2spl!4v1579708238571!5m2!1spl!2spl'}
            openDays={[{ openFrom: '1', openTo: '5', hourFrom: '8:00', hourTo: '18:00' }, { openFrom: '4', openTo: '6', hourFrom: '10:00', hourTo: '20:00' }, { openFrom: '7', openTo: '7', hourFrom: '10:00', hourTo: '16:00' }]}
            specialDays={[{closed: 1, from: '22.01.2020', to: '23.01.2020', hourFrom: '10:00', hourTo: '12:00'}, {closed: 0, from: '24.01.2020', to: '', hourFrom: '10:00', hourTo: '12:00'}, {closed: 0, from: '24.01.2020', to: '25.01.2020', hourFrom: '10:00', hourTo: '12:00'}, {closed: 0, from: '24.01.2020', to: '25.01.2020', hourFrom: '10:00', hourTo: '12:00'}]}
          />
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
