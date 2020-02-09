import React, { useState } from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { dataProvider } from '../../../utils/requestBuilder';

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
  const { id, imageUrl, title, content } = props.post;
  const uId = useSelector((state: any) => state.auth.userId);
  const {parsedReactions, selectedReaction} = props.post.reactions.reduce((acc: any, current: any) => {
    if (current.reaction_type === 3) {
      acc.parsedReactions[0] += 1;
    } else if (current.reaction_type === 2) {
      acc.parsedReactions[1] += 1;
    } else if (current.reaction_type === 1) {
      acc.parsedReactions[2] += 1;
    }
    if (uId === current.author) {
      acc.selectedReaction = current.reaction_type;
    }
    return acc;
  }, {parsedReactions: [0,0,0], selectedReaction: null});
  const [reactions, setReactions] = useState(parsedReactions);
  const [selected, setSelected] = useState(selectedReaction);
  const handleAddReaction = (reaction: number) => () => {
    dataProvider().post('posts/addReaction', {postId: id, reactionType: reaction}).then(() => {
      if (selected === 3) {
        reactions[0] -= 1;
      } else if (selected === 2) {
        reactions[1] -= 1;
      } else if (selected === 1) {
        reactions[2] -= 1;
      }
      if (reaction === 3) {
        reactions[0] += 1;
      } else if (reaction === 2) {
        reactions[1] += 1;
      } else if (reaction === 1) {
        reactions[2] += 1;
      }
      setReactions([...reactions]);
      setSelected(reaction);
    })
  };
  const handleRemoveReaction = (reaction: number) => () => {
    dataProvider().post('posts/removeReaction', {postId: id}).then(() => {
      if (reaction === 3) {
        reactions[0] -= 1;
      } else if (reaction === 2) {
        reactions[1] -= 1;
      } else if (reaction === 1) {
        reactions[2] -= 1;
      }
      setReactions([...reactions]);
      setSelected(null);
    })
  };
  
  return (
    <div className="shop-post">
      {imageUrl && <div className="shop-post__image-wrapper">
        <img src={imageUrl} alt="post attachment"/>
      </div>}
      <div className="shop-post__content-wrapper">
        <div className="shop-post__title">{title}</div>
        <div className="shop-post__content">{content}</div>
        <div className="shop-post__reactions">
          <div className={`clickable shop-post__reaction ${selected === 3 ? 'selected' : ''}`} onClick={selected !== 3 ? handleAddReaction(3) : handleRemoveReaction(3)}>
            <span className="shop-post__reaction-count">{reactions[0] || '0'}</span>
            <span className="shop-post__reaction-type" role="img" aria-label="love">😍</span>
          </div>
          <div className={`clickable shop-post__reaction ${selected === 2 ? 'selected' : ''}`} onClick={selected !== 2 ? handleAddReaction(2) : handleRemoveReaction(2)}>
            <span className="shop-post__reaction-count">{reactions[1] || '0'}</span>
            <span className="shop-post__reaction-type" role="img" aria-label="meh">🥱</span>
          </div>
          <div className={`clickable shop-post__reaction ${selected === 1 ? 'selected' : ''}`} onClick={selected !== 1 ? handleAddReaction(1) : handleRemoveReaction(1)}>
            <span className="shop-post__reaction-count">{reactions[2] || '0'}</span>
            <span className="shop-post__reaction-type" role="img" aria-label="hate">😒</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPost;
