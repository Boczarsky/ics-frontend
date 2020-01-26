import React from 'react';
import ShopPost, { Post } from '../common/ShopPost';
import './style.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../reducers/Modals/actions';

export interface ShopPostsProps {
  icecreamShopId: number;
  posts: any[]
}

const ShopPosts = (props: ShopPostsProps) => {
  const { posts, icecreamShopId } = props;
  const dispatch = useDispatch();
  const openCreateModal = () => {
    dispatch(openModal('postForm', { icecreamShopId }));
  };
  const openEditModal = (post: any) => () => {
    dispatch(openModal('postForm', post));
  };
  return (
    <div className="shop-posts">
      <div className="shop-posts__posts">
        {posts.map(post => <div className="shop-posts__post">
          <div className="clickable b-button shop-posts__edit-post" onClick={openEditModal(post)}>Edit</div>
          <ShopPost post={post}/>
        </div>)}
      </div>
      <div className="shop-posts__add-post">
        <div className="clickable b-button" onClick={openCreateModal}>Add new post</div>
      </div>
    </div>
  )
};

export default ShopPosts;
