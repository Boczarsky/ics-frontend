import React from 'react';
import './style.css';

export interface Post {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
  reactions: number[];
}

export interface ShopPostProps {
  post: Post;
}

const ShopPost = (props: ShopPostProps) => {
  const { id, imageUrl, title, content, reactions = [0,0,0] } = props.post;
  return (
    <div className="shop-post">
      {imageUrl && <div className="shop-post__image-wrapper">
        <img src={imageUrl} alt="post attachment"/>
      </div>}
      <div className="shop-post__content-wrapper">
        <div className="shop-post__title">{title}</div>
        <div className="shop-post__content">{content}</div>
        <div className="shop-post__reactions">
          <div className="clickable shop-post__reaction">
              <span className="shop-post__reaction-count">{reactions[0] || '0'}</span>
              <span className="shop-post__reaction-type" role="img" aria-label="love">😍</span>
            </div>
            <div className="clickable shop-post__reaction">
            <span className="shop-post__reaction-count">{reactions[1] || '0'}</span>
              <span className="shop-post__reaction-type" role="img" aria-label="meh">🥱</span>
            </div>
            <div className="clickable shop-post__reaction">
              <span className="shop-post__reaction-count">{reactions[2] || '0'}</span>
              <span className="shop-post__reaction-type" role="img" aria-label="hate">😒</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPost;
