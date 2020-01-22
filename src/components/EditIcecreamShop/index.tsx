import React, { useReducer, MouseEvent } from 'react';
import AppLayout from '../common/AppLayout';
import UploadImage from '../common/UploadImage';
import { reducer, initialState, setValue, addDynamicValue, setDynamicValue, deleteDynamicValue } from './formReducer';
import './style.css';
import { useParams } from 'react-router-dom';
import BasicInput from '../common/BasicInput';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import BasicSelect from '../common/BasicSelect';
import { dayOptions } from '../../utils/dayOptions';

const EditIcecreamShop = () => {
  const params = useParams<{id?: string}>();
  const [state, dispatch] = useReducer(reducer, initialState);
  const edit = Boolean(params.id);
  
  return (
    <AppLayout
      returnPath="/icecream-shops"
      topbarContent={
       <div className="page-title">{edit ? 'Edit' : 'Create'} icecream shop</div>
      }
    >
      <div className="edit-icecream-shop">
        <div className="edit-icecream-shop__header-images">
          <UploadImage key="upload-background" initialUrl={state.backgroundUrl.value} className="edit-icecream-shop__background" onFileUploaded={value => dispatch(setValue('backgroundUrl', value))}/>
          <UploadImage key="upload-logo" initialUrl={state.logoUrl.value} className="edit-icecream-shop__logo" onFileUploaded={value => dispatch(setValue('logoUrl', value))}/>
        </div>
        <div className="edit-icecream-shop__edit-form">
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
          <div className="edit-icecream-shop__address-wrapper">
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
          <div className="edit-icecream-shop__dynamic-open-days">
            <div className="edit-icecream-shop__open-days-wrapper">
              <div className="edit-icecream-shop__dynamic-fields-label p-font">Opening hours</div>
              {state.openDays.map((open: any, index: number) => (
                <div className="edit-icecream-shop__open-days" key={open.uniqueKey}>
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
                  <div className="edit-icecream-shop__delete-button" onClick={(event: MouseEvent<HTMLElement>) => {event.stopPropagation(); dispatch(deleteDynamicValue('openDays', open.uniqueKey))}}>
                    <PlusIcon className="edit-icecream-shop__plus-icon--45deg"/>
                  </div>
                </div>
              ))}
            </div>
            <div className="edit-icecream-shop__add-wrapper">
              <div className="edit-icecream-shop__add-button" onClick={() => dispatch(addDynamicValue('openDays'))}>
                <PlusIcon/>
              </div>
            </div>
          </div>
          <div className="edit-icecream-shop__dynamic-special-days">
            <div className="edit-icecream-shop__special-days-wrapper">
              <div className="edit-icecream-shop__dynamic-fields-label p-font">Special days</div>
              {state.specialDays.map((special: any, index: number) => (
                <div className="edit-icecream-shop__special-days" key={special.uniqueKey}>
                  <BasicSelect
                    selectProps={{id: `icecreamShopDayFrom${index}`, type: 'datetime-local', value: special.closed}}
                    label="Open / Closed"
                    options={[{val: 0, name: 'Open'}, {val: 1, name: 'Closed'}]}
                    valueKey="val"
                    nameKey="name"
                    handleChange={value => dispatch(setDynamicValue('specialDays', special.uniqueKey, 'closed', +value))}
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
                  {!special.closed && <>
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
                  <div className="edit-icecream-shop__delete-button" onClick={(event: MouseEvent<HTMLElement>) => {event.stopPropagation(); dispatch(deleteDynamicValue('specialDays', special.uniqueKey))}}>
                    <PlusIcon className="edit-icecream-shop__plus-icon--45deg"/>
                  </div>
                </div>
              ))}
            </div>
            <div className="edit-icecream-shop__add-wrapper">
              <div className="edit-icecream-shop__add-button" onClick={() => dispatch(addDynamicValue('specialDays'))}>
                <PlusIcon/>
              </div>
            </div>
          </div>
        </div>
        <div className="edit-icecream-shop__form-controls">
          <div className="b-button clickable">{edit ? 'Save' : 'Create'}</div>
          <div className="b-button clickable">{edit ? 'Clear changes' : 'Clear form'}</div>
        </div>
      </div>
    </AppLayout>
  )
};

export default EditIcecreamShop;
