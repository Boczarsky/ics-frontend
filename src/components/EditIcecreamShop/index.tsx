import React, { useReducer, useEffect } from 'react';
import AppLayout from '../common/AppLayout';
import UploadImage from '../common/UploadImage';
import { reducer, initialState, setValue } from './formReducer';
import './style.css';
import { useParams } from 'react-router-dom';
import BasicInput from '../common/BasicInput';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import randomKey from '../../utils/randomKey';
import BasicSelect from '../common/BasicSelect';
import BasicToggle from '../common/BasicToggle';

const EditIcecreamShop = () => {
  const params = useParams<{id?: string}>();
  const [state, dispatch] = useReducer(reducer, initialState);
  const edit = Boolean(params.id);
  const dayOptions = [{val: 1, name: 'Monday'}, {val: 2, name: 'Tuesday'}, {val: 3, name: 'Wednesday'}, {val: 4, name: 'Thursday'}, {val: 5, name: 'Friday'}, {val: 6, name: 'Saturday'}, {val: 7, name: 'Sunday'}];
  useEffect(() => {
    console.log(state);
  }, [state])
  return (
    <AppLayout
      returnPath="/icecream-shops"
      topbarContent={
       <div className="page-title">{edit ? 'Edit' : 'Create'} icecream shop</div>
      }
    >
      <div className="edit-icecream-shop">
        <div className="edit-icecream-shop__header-images">
          <UploadImage key="upload-background" className="edit-icecream-shop__background" onFileUploaded={(value) => dispatch(setValue('backgroundUrl', value))}/>
          <UploadImage key="upload-logo" className="edit-icecream-shop__logo" onFileUploaded={(value) => dispatch(setValue('logoUrl', value))}/>
        </div>
        <div className="edit-icecream-shop__edit-form">
          <BasicInput
            inputProps={{id: 'icecreamShopName', placeholder: 'Name of your icecream shop'}}
            label="Icecream shop name"
          />
          <BasicInput
            inputProps={{id: 'icecreamShopDescription', placeholder: 'Short description of your icecream shop', rows: 10}}
            label="Description"
            textarea
          />
          <div className="edit-icecream-shop__address-wrapper">
            <BasicInput
              inputProps={{id: 'icecreamShopStreet'}}
              label="Street"
            />
            <BasicInput
              inputProps={{id: 'icecreamShopCity'}}
              label="City"
            />
            <BasicInput
              inputProps={{id: 'icecreamShopPostalCode', placeholder: '00-000'}}
              label="Postal code"
            />
            <BasicInput
              inputProps={{id: 'icecreamShopLatitude', type: 'number', placeholder: '0.0000'}}
              label="Latitude"
            />
            <BasicInput
              inputProps={{id: 'icecreamShopLongitude', type: 'number', placeholder: '0.0000'}}
              label="Longitude"
            />
          </div>
          <div className="edit-icecream-shop__dynamic-open-days">
            <div className="edit-icecream-shop__open-days-wrapper">
              {state.openDays.map((open: any, index: number) => (
                <div className="edit-icecream-shop__open-days" key={randomKey()}>
                  <BasicSelect
                    selectProps={{id: `icecreamShopDayFrom${index}`, value: open.dayFrom.value}}
                    label="Day from"
                    options={dayOptions}
                    valueKey="val"
                    nameKey="name"
                  />
                  <BasicSelect
                    selectProps={{id: `icecreamShopDayFrom${index}`, value: open.dayTo.value}}
                    label="Day to"
                    options={dayOptions}
                    valueKey="val"
                    nameKey="name"
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'time', value: open.hourFrom.value}}
                    label="Hour from"
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'time', value: open.hourTo.value}}
                    label="Hour to"
                  />
                </div>
              ))}
            </div>
            <div className="edit-icecream-shop__add-wrapper">
              <div className="edit-icecream-shop__add-button">
                <PlusIcon/>
              </div>
            </div>
          </div>
          <div className="edit-icecream-shop__dynamic-special-days">
            <div className="edit-icecream-shop__special-days-wrapper">
              {state.specialDays.map((special: any, index: number) => (
                <div className="edit-icecream-shop__special-days" key={randomKey()}>
                  <BasicSelect
                    selectProps={{id: `icecreamShopDayFrom${index}`, type: 'datetime-local', value: special.closed}}
                    label="Open / Closed"
                    options={[{val: false, name: 'Open'}, {val: true, name: 'Closed'}]}
                    valueKey="val"
                    nameKey="name"
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'date', value: special.from}}
                    label="From"
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'date', value: special.to}}
                    label="To"
                  />
                  {!special.closed && <>
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'time', value: special.hourFrom}}
                    label="Hour from"
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'time', value: special.hourTo}}
                    label="Hour to"
                  />
                  </>}
                </div>
              ))}
            </div>
            <div className="edit-icecream-shop__add-wrapper">
              <div className="edit-icecream-shop__add-button">
                <PlusIcon/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
};

export default EditIcecreamShop;
