import React, { KeyboardEvent, useRef, FocusEvent } from 'react';
import './style.css';

export interface TagsInputProps {
  label?: string;
  labelClass?: string;
  tags: string[];
  handleChange: (tags: string[]) => any;
}

const TagsInput = (props: TagsInputProps) => {
  const {label, labelClass, tags, handleChange} = props;

  const setToArray = (set: Set<string>) => {
    const array = [];
    // @ts-ignore
    for(let item of set.values()) {
      array.push(item);
    }
    return array;
  }

  const removeTag = (tag: string) => {
    const set = new Set(tags);
    set.delete(tag);
    handleChange(setToArray(set));
  }
  
  const handleInsertTag = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const { keyCode } = event;
    if(keyCode === 32 && input.value.trim()) {
      const set = new Set(tags);
      set.add(input.value.trim());
      handleChange(setToArray(set));
      input.value = '';
    }
  }

  const handleBlurInsertTag = (event: FocusEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if(input.value.trim()) {
      const set = new Set(tags);
      set.add(input.value.trim());
      handleChange(setToArray(set));
      input.value = '';
    }
  }

  const input = useRef(null);
  const focusInput = () => {
    const inputElement = input.current || {focus: () => {}};
    inputElement.focus();
  }

  return (
    <div className="tags-input">
      {label && <div className={`tags-input__label p-font ${labelClass}`}>{label}</div>}
      <div className="tags-input__wrapper" onClick={focusInput}>
        {tags.map((tag: string) => (
          <div className="tags-input__tag" key={tag} onClick={() => removeTag(tag)}>
            <span className="overflow-ellipsis">#{tag}</span>
          </div>
        ))}
        <input ref={input} className="tags-input__input" onKeyDown={handleInsertTag} onBlur={handleBlurInsertTag}/>
      </div>
    </div>
  )
}

export default TagsInput
