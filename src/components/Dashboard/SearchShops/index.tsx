import React, { FormEvent, useState } from 'react';
import './style.css';
import BasicInput from '../../common/BasicInput';
import TagsInput from '../../common/TagsInput';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchIcecreamShops } from '../../../reducers/IcecreamShops/operations';
import { useTranslation } from 'react-i18next';

const SearchShops = () => {
  const [tags, setTags] = useState([] as string[]);
  const [city, setCity] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (city) {
      dispatch(searchIcecreamShops(() => history.push('/browse'), {tags: tags.length ? tags.map(tag => tag.toLowerCase()) : [], city: city}));
    }
  }
  const { t } = useTranslation();
  return (
    <div className="search-shops">
      <form className="search-shops__form" onSubmit={handleFormSubmit}>
        <BasicInput
          label="City"
          labelClass="search-shops__label"
          inputProps={{type: 'text', name: 'city', id: 'city', value: city}}
          handleChange={setCity}
          validationError={city ? '' : 'This field is required'}
        />
        <TagsInput
          label="#Tags"
          labelClass="search-shops__label"
          tags={tags}
          handleChange={setTags}
        />
        <button className="search-shops__submit clickable b-button">{t('Search')}</button>
      </form>
    </div>
  )
};

export default SearchShops;
