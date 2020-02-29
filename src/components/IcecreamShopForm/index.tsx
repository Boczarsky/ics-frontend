import React, { useReducer, MouseEvent, useEffect } from 'react';
import AppLayout from '../common/AppLayout';
import UploadImage, { generateUrl } from '../common/UploadImage';
import { reducer, initialState, setValue, addDynamicValue, setDynamicValue, deleteDynamicValue, setInitial } from './formReducer';
import './style.css';
import { useParams, useHistory } from 'react-router-dom';
import BasicInput from '../common/BasicInput';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import BasicSelect from '../common/BasicSelect';
import { dayOptions } from '../../utils/dayOptions';
import { dataProvider } from '../../utils/requestBuilder';
import { useDispatch } from 'react-redux';
import { pushNotification } from '../../reducers/Notifications/operations';
import { useTranslation } from 'react-i18next';

const IcecreamShopForm = () => {
  const params = useParams<{id?: string}>();
  const [state, localDispatch] = useReducer(reducer, initialState);
  const isEdit = Boolean(params.id);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (params.id) {
      dataProvider().get(`icecream-shops/${params.id}`)
        .then(response => {
          const { name, city, street, postal_code, description, logo_file_name, background_file_name, google_map_link, open_days, special_days } = response.data;
          const data = {
            name,
            city,
            street,
            postalCode: postal_code,
            description,
            logoFileName: logo_file_name,
            backgroundFileName: background_file_name,
            googleMapLink: google_map_link,
            openDays: open_days.map((oDay: any) => ({from: oDay.from, to: oDay.to, hourFrom: oDay.hour_from, hourTo: oDay.hour_to})),
            specialDays: special_days.map((sDay: any) => ({closed: sDay.closed, from: sDay.from, to: sDay.to, hourFrom: sDay.hour_from, hourTo: sDay.hour_to})),
          };
          localDispatch(setInitial(data));
        })
        .catch(() => {
          dispatch(pushNotification('Error during loading data', 'error', 2000));
        });
    }
  }, [params.id, dispatch]);

  const handleSave = () => {
    if (state.formValid) {
      const data = {
        icecreamShopId: Number(params.id),
        logoFileName: state.logoFileName.value,
        backgroundFileName: state.backgroundFileName.value,
        name: state.name.value,
        description: state.description.value,
        street: state.street.value,
        city: state.city.value,
        postalCode: state.postalCode.value,
        googleMapLink: state.googleMapLink.value,
        openDays: state.openDays.map((oDay: any) => ({ from: Number(oDay.from.value), to: Number(oDay.to.value), hourFrom: oDay.hourFrom.value, hourTo: oDay.hourTo.value })),
        specialDays: state.specialDays.map((sDay: any) => ({ closed: Number(sDay.closed.value), from: sDay.from.value, to: sDay.to.value, hourFrom: sDay.hourFrom.value, hourTo: sDay.hourTo.value }))
      }
      dataProvider().post('icecream-shops/edit', data)
        .then(() => {
          dispatch(pushNotification('Icecream shop created', 'normal', 2000));
          history.push('/icecream-shops');
        })
        .catch(() => {
          dispatch(pushNotification('Error during creation', 'error', 2000));
        });
    }
  };

  const handleCreate = () => {
    if (state.formValid) {
      const data = {
        logoFileName: state.logoFileName.value,
        backgroundFileName: state.backgroundFileName.value,
        name: state.name.value,
        description: state.description.value,
        street: state.street.value,
        city: state.city.value,
        postalCode: state.postalCode.value,
        googleMapLink: state.googleMapLink.value,
        openDays: state.openDays.map((oDay: any) => ({ from: Number(oDay.from.value), to: Number(oDay.to.value), hourFrom: oDay.hourFrom.value, hourTo: oDay.hourTo.value })),
        specialDays: state.specialDays.map((sDay: any) => ({ closed: Number(sDay.closed.value), from: sDay.from.value, to: sDay.to.value, hourFrom: sDay.hourFrom.value, hourTo: sDay.hourTo.value }))
      }
      dataProvider().post('icecream-shops/create', data)
        .then(() => {
          dispatch(pushNotification('Icecream shop created', 'normal', 2000));
          history.goBack();
        })
        .catch(() => {
          dispatch(pushNotification('Error during creation', 'error', 2000));
        });
    }
  };
  const matchHtmlEmbeded = () => {
    return state.googleMapLink.value.match(/(src="\S*")/);
  }
  const extractFromHtml = () => {
    const matches = matchHtmlEmbeded();
    if (matches) {
      localDispatch(setValue('googleMapLink',  matches[0].slice(5, -1)));
    }
  };
  const { t } = useTranslation();
  return (
    <AppLayout
      returnPath="/icecream-shops"
      topbarContent={
       <div className="page-title">{t(`${isEdit ? 'Edit' : 'Create'} icecream shop`)}</div>
      }
    >
      <div className="icecream-shop-form">
        <div className="icecream-shop-form__header-images">
          <UploadImage key="upload-background" initialUrl={generateUrl(state.backgroundFileName.value)} className="icecream-shop-form__background" onFileUploaded={value => localDispatch(setValue('backgroundFileName', value))}/>
          <UploadImage key="upload-logo" initialUrl={generateUrl(state.logoFileName.value)} className="icecream-shop-form__logo" onFileUploaded={value => localDispatch(setValue('logoFileName', value))}/>
        </div>
        <div className="icecream-shop-form__edit-form">
          <BasicInput
            inputProps={{id: 'icecreamShopName', value: state.name.value}}
            handleChange={value => localDispatch(setValue('name', value))}
            label="Icecream shop name"
          />
          <BasicInput
            inputProps={{id: 'icecreamShopDescription', rows: 10, value: state.description.value}}
            handleChange={value => localDispatch(setValue('description', value))}
            label="Description"
            textarea
          />
          <div className="icecream-shop-form__address-wrapper">
            <BasicInput
              inputProps={{id: 'icecreamShopStreet', value: state.street.value}}
              handleChange={value => localDispatch(setValue('street', value))}
              label="Street"
            />
            <BasicInput
              inputProps={{id: 'icecreamShopCity', value: state.city.value}}
              handleChange={value => localDispatch(setValue('city', value))}
              label="City"
            />
            <BasicInput
              inputProps={{id: 'icecreamShopPostalCode', placeholder: '00-000', value: state.postalCode.value}}
              handleChange={value => localDispatch(setValue('postalCode', value))}
              label="Postal code"
            />
            <BasicInput
              inputProps={{id: 'icecreamShopGoogleMapLink', placeholder: t('Source for embeded google map'), value: state.googleMapLink.value}}
              handleChange={value => localDispatch(setValue('googleMapLink', value))}
              label="Google map link"
            />
            {matchHtmlEmbeded() && <div className="b-button clickable icecream-shop-form__extract-button" onClick={() => extractFromHtml()}>{t('HTML to URL')}</div>}
          </div>
          <div className="icecream-shop-form__dynamic-open-days">
            <div className="icecream-shop-form__open-days-wrapper">
              <div className="icecream-shop-form__dynamic-fields-label p-font">{t('Opening hours')}</div>
              {state.openDays.map((open: any, index: number) => (
                <div className="icecream-shop-form__open-days" key={open.uniqueKey}>
                  <BasicSelect
                    selectProps={{id: `icecreamShopDayFrom${index}`, value: open.from.value}}
                    label="Open from"
                    options={dayOptions.map(option => ({val: option.val, name: t(option.name)}))}
                    valueKey="val"
                    nameKey="name"
                    handleChange={value => localDispatch(setDynamicValue('openDays', open.uniqueKey, 'from', value))}
                  />
                  <BasicSelect
                    selectProps={{id: `icecreamShopDayFrom${index}`, value: open.to.value}}
                    label="Open to"
                    options={dayOptions.map(option => ({val: option.val, name: t(option.name)}))}
                    valueKey="val"
                    nameKey="name"
                    handleChange={value => localDispatch(setDynamicValue('openDays', open.uniqueKey, 'to', value))}
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'time', value: open.hourFrom.value}}
                    label="Hour from"
                    handleChange={value => localDispatch(setDynamicValue('openDays', open.uniqueKey, 'hourFrom', value))}
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'time', value: open.hourTo.value}}
                    label="Hour to"
                    handleChange={value => localDispatch(setDynamicValue('openDays', open.uniqueKey, 'hourTo', value))}
                  />
                  <div className="icecream-shop-form__delete-button" onClick={(event: MouseEvent<HTMLElement>) => {event.stopPropagation(); localDispatch(deleteDynamicValue('openDays', open.uniqueKey))}}>
                    <PlusIcon className="icecream-shop-form__plus-icon--45deg"/>
                  </div>
                </div>
              ))}
            </div>
            <div className="icecream-shop-form__add-wrapper">
              <div className="icecream-shop-form__add-button" onClick={() => localDispatch(addDynamicValue('openDays'))}>
                <PlusIcon/>
              </div>
            </div>
          </div>
          <div className="icecream-shop-form__dynamic-special-days">
            <div className="icecream-shop-form__special-days-wrapper">
              <div className="icecream-shop-form__dynamic-fields-label p-font">{t('Special days')}</div>
              {state.specialDays.map((special: any, index: number) => (
                <div className="icecream-shop-form__special-days" key={special.uniqueKey}>
                  <BasicSelect
                    selectProps={{id: `icecreamShopDayFrom${index}`, type: 'datetime-local', value: special.closed.value}}
                    label="Open / Closed"
                    options={[{val: 0, name: t('Open')}, {val: 1, name: t('Closed')}]}
                    valueKey="val"
                    nameKey="name"
                    handleChange={value => localDispatch(setDynamicValue('specialDays', special.uniqueKey, 'closed', value))}
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'date', value: special.from.value}}
                    label="From"
                    handleChange={value => localDispatch(setDynamicValue('specialDays', special.uniqueKey, 'from', value))}
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'date', value: special.to.value}}
                    label="To"
                    handleChange={value => localDispatch(setDynamicValue('specialDays', special.uniqueKey, 'to', value))}
                  />
                  {special.closed.value === '0' && <>
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'time', value: special.hourFrom.value}}
                    label="Hour from"
                    handleChange={value => localDispatch(setDynamicValue('specialDays', special.uniqueKey, 'hourFrom', value))}
                  />
                  <BasicInput
                    inputProps={{id: `icecreamShopDayFrom${index}`, type: 'time', value: special.hourTo.value}}
                    label="Hour to"
                    handleChange={value => localDispatch(setDynamicValue('specialDays', special.uniqueKey, 'hourTo', value))}
                  />
                  </>}
                  <div className="icecream-shop-form__delete-button" onClick={(event: MouseEvent<HTMLElement>) => {event.stopPropagation(); localDispatch(deleteDynamicValue('specialDays', special.uniqueKey))}}>
                    <PlusIcon className="icecream-shop-form__plus-icon--45deg"/>
                  </div>
                </div>
              ))}
            </div>
            <div className="icecream-shop-form__add-wrapper">
              <div className="icecream-shop-form__add-button" onClick={() => localDispatch(addDynamicValue('specialDays'))}>
                <PlusIcon/>
              </div>
            </div>
          </div>
        </div>
        <div className="icecream-shop-form__form-controls">
          {state.touched ? <>
            {isEdit ?
              <div className={`b-button clickable ${state.formValid ? '' : 'disabled'}`} onClick={handleSave}>{t('Save')}</div> :
              <div className={`b-button clickable ${state.formValid ? '' : 'disabled'}`} onClick={handleCreate}>{t('Create')}</div>
            }
          </> :
          <div className="b-button clickable" onClick={() => history.push('/icecream-shops')}>{t('Back')}</div>
          }
        </div>
      </div>
    </AppLayout>
  )
};

export default IcecreamShopForm;
