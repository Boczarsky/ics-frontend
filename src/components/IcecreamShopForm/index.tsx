import React, { useReducer, MouseEvent, useEffect } from 'react';
import AppLayout from '../common/AppLayout';
import UploadImage from '../common/UploadImage';
import { reducer, initialState, setValue, addDynamicValue, setDynamicValue, deleteDynamicValue, setInitial } from './formReducer';
import './style.css';
import { useParams } from 'react-router-dom';
import BasicInput from '../common/BasicInput';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import BasicSelect from '../common/BasicSelect';
import { dayOptions } from '../../utils/dayOptions';

const IcecreamShopForm = () => {
  const params = useParams<{id?: string}>();
  const [state, dispatch] = useReducer(reducer, initialState);
  const isEdit = Boolean(params.id);

  useEffect(() => {
    if (params.id) {
      dispatch(setInitial({
        logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSdd6YjBP-BIQra6_ovdfHitBCkIbuy7pCJdhEmCC82pDwcAAO&s',
        backgroundUrl: 'https://www.tripsavvy.com/thmb/TlJ3PJXEBydnqPw6GHQP8_cEsUU=/4026x2475/filters:fill(auto,1)/icecream-56a237e33df78cf772735f9f.jpg',
        name: 'Cool Icecream Shop',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti exercitationem possimus accusamus repudiandae nobis rerum dolor quae quaerat, facere dolore voluptatem, consectetur a et vel amet fuga asperiores aperiam nemo.',
        street: 'Stanisława Dubois 2',
        city: 'Gliwice',
        postalCode: '44-100',
        googleMapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d450.54185432830764!2d18.675132729216067!3d50.29846832387512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711305447dd7bb3%3A0xa424e9af0bda5f15!2sGelato%20Studio!5e0!3m2!1spl!2spl!4v1579708238571!5m2!1spl!2spl',
        openDays: [{ openFrom: '1', openTo: '5', hourFrom: '8:00', hourTo: '18:00' }, { openFrom: '4', openTo: '6', hourFrom: '10:00', hourTo: '20:00' }, { openFrom: '7', openTo: '7', hourFrom: '10:00', hourTo: '16:00' }],
        specialDays: [{closed: '1', from: '2020-01-23', to: '2020-01-24', hourFrom: '10:00', hourTo: '12:00'}, {closed: '0', from: '2020-01-24', to: '', hourFrom: '10:00', hourTo: '12:00'}, {closed: '0', from: '2020-01-24', to: '2020-01-25', hourFrom: '10:00', hourTo: '12:00'}, {closed: '0', from: '2020-01-24', to: '2020-01-25', hourFrom: '10:00', hourTo: '12:00'}],
      }))
    }
  }, [params.id]);
  
  return (
    <AppLayout
      returnPath="/icecream-shops"
      topbarContent={
       <div className="page-title">{isEdit ? 'Edit' : 'Create'} icecream shop</div>
      }
    >
      <div className="icecream-shop-form">
        <div className="icecream-shop-form__header-images">
          <UploadImage key="upload-background" initialUrl={state.backgroundUrl.value} className="icecream-shop-form__background" onFileUploaded={value => dispatch(setValue('backgroundUrl', value))}/>
          <UploadImage key="upload-logo" initialUrl={state.logoUrl.value} className="icecream-shop-form__logo" onFileUploaded={value => dispatch(setValue('logoUrl', value))}/>
        </div>
        <div className="icecream-shop-form__edit-form">
          <BasicInput
            inputProps={{id: 'icecreamShopName', placeholder: 'Name of your icecream shop', value: state.name.value}}
            handleChange={value => dispatch(setValue('name', value))}
            label="Icecream shop name"
          />
          <BasicInput
            inputProps={{id: 'icecreamShopDescription', placeholder: 'Short description of your icecream shop', rows: 10, value: state.description.value}}
            handleChange={value => dispatch(setValue('description', value))}
            label="Description"
            textarea
          />
          <div className="icecream-shop-form__address-wrapper">
            <BasicInput
              inputProps={{id: 'icecreamShopStreet', value: state.street.value}}
              handleChange={value => dispatch(setValue('street', value))}
              label="Street"
            />
            <BasicInput
              inputProps={{id: 'icecreamShopCity', value: state.city.value}}
              handleChange={value => dispatch(setValue('city', value))}
              label="City"
            />
            <BasicInput
              inputProps={{id: 'icecreamShopPostalCode', placeholder: '00-000', value: state.postalCode.value}}
              handleChange={value => dispatch(setValue('postalCode', value))}
              label="Postal code"
            />
            <BasicInput
              inputProps={{id: 'icecreamShopGoogleMapLink', placeholder: 'Source for embeded google map', value: state.googleMapLink.value}}
              handleChange={value => dispatch(setValue('googleMapLink', value))}
              label="Google map link"
            />
          </div>
          <div className="icecream-shop-form__dynamic-open-days">
            <div className="icecream-shop-form__open-days-wrapper">
              <div className="icecream-shop-form__dynamic-fields-label p-font">Opening hours</div>
              {state.openDays.map((open: any, index: number) => (
                <div className="icecream-shop-form__open-days" key={open.uniqueKey}>
                  <BasicSelect
                    selectProps={{id: `icecreamShopDayFrom${index}`, value: open.openFrom.value}}
                    label="Open from"
                    options={dayOptions}
                    valueKey="val"
                    nameKey="name"
                    handleChange={value => dispatch(setDynamicValue('openDays', open.uniqueKey, 'openFrom', value))}
                  />
                  <BasicSelect
                    selectProps={{id: `icecreamShopDayFrom${index}`, value: open.openTo.value}}
                    label="Open to"
                    options={dayOptions}
                    valueKey="val"
                    nameKey="name"
                    handleChange={value => dispatch(setDynamicValue('openDays', open.uniqueKey, 'openTo', value))}
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'time', value: open.hourFrom.value}}
                    label="Hour from"
                    handleChange={value => dispatch(setDynamicValue('openDays', open.uniqueKey, 'hourFrom', value))}
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'time', value: open.hourTo.value}}
                    label="Hour to"
                    handleChange={value => dispatch(setDynamicValue('openDays', open.uniqueKey, 'hourTo', value))}
                  />
                  <div className="icecream-shop-form__delete-button" onClick={(event: MouseEvent<HTMLElement>) => {event.stopPropagation(); dispatch(deleteDynamicValue('openDays', open.uniqueKey))}}>
                    <PlusIcon className="icecream-shop-form__plus-icon--45deg"/>
                  </div>
                </div>
              ))}
            </div>
            <div className="icecream-shop-form__add-wrapper">
              <div className="icecream-shop-form__add-button" onClick={() => dispatch(addDynamicValue('openDays'))}>
                <PlusIcon/>
              </div>
            </div>
          </div>
          <div className="icecream-shop-form__dynamic-special-days">
            <div className="icecream-shop-form__special-days-wrapper">
              <div className="icecream-shop-form__dynamic-fields-label p-font">Special days</div>
              {state.specialDays.map((special: any, index: number) => (
                <div className="icecream-shop-form__special-days" key={special.uniqueKey}>
                  {console.log(special.closed)}
                  <BasicSelect
                    selectProps={{id: `icecreamShopDayFrom${index}`, type: 'datetime-local', value: special.closed.value}}
                    label="Open / Closed"
                    options={[{val: '0', name: 'Open'}, {val: '1', name: 'Closed'}]}
                    valueKey="val"
                    nameKey="name"
                    handleChange={value => dispatch(setDynamicValue('specialDays', special.uniqueKey, 'closed', value))}
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'date', value: special.from.value}}
                    label="From"
                    handleChange={value => dispatch(setDynamicValue('specialDays', special.uniqueKey, 'from', value))}
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'date', value: special.to.value}}
                    label="To"
                    handleChange={value => dispatch(setDynamicValue('specialDays', special.uniqueKey, 'to', value))}
                  />
                  {special.closed.value === '0' && <>
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'time', value: special.hourFrom.value}}
                    label="Hour from"
                    handleChange={value => dispatch(setDynamicValue('specialDays', special.uniqueKey, 'hourFrom', value))}
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'time', value: special.hourTo.value}}
                    label="Hour to"
                    handleChange={value => dispatch(setDynamicValue('specialDays', special.uniqueKey, 'hourTo', value))}
                  />
                  </>}
                  <div className="icecream-shop-form__delete-button" onClick={(event: MouseEvent<HTMLElement>) => {event.stopPropagation(); dispatch(deleteDynamicValue('specialDays', special.uniqueKey))}}>
                    <PlusIcon className="icecream-shop-form__plus-icon--45deg"/>
                  </div>
                </div>
              ))}
            </div>
            <div className="icecream-shop-form__add-wrapper">
              <div className="icecream-shop-form__add-button" onClick={() => dispatch(addDynamicValue('specialDays'))}>
                <PlusIcon/>
              </div>
            </div>
          </div>
        </div>
        <div className="icecream-shop-form__form-controls">
          <div className="b-button clickable">{isEdit ? 'Save' : 'Create'}</div>
        </div>
      </div>
    </AppLayout>
  )
};

export default IcecreamShopForm;
