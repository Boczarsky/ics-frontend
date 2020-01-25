import React from 'react';
import ShopPost, { Post } from '../common/ShopPost';
import './style.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../reducers/Modals/actions';

const ShopPosts = () => {
  const posts: Post[] = [
    { id: 1, imageUrl: 'https://www.simplyrecipes.com/wp-content/uploads/2006/06/French-Vanilla-IceCream-LEAD-1.jpg', title: 'Very interesting title', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nulla soluta vero illum. Omnis repellat molestiae molestias voluptatem commodi at accusamus, vitae facilis, hic itaque voluptatum esse qui, eum cupiditate.', reactions: [150,51,4]},
    { id: 1, imageUrl: '', title: 'Very interesting title', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nulla soluta vero illum. Omnis repellat molestiae molestias voluptatem commodi at accusamus, vitae facilis, hic itaque voluptatum esse qui, eum cupiditate.', reactions: [150,51,4]}
  ];
  const dispatch = useDispatch();
  const openCreateModal = () => {
    dispatch(openModal('addPost'));
  };
  return (
    <div className="shop-posts">
      <div className="shop-posts__posts">
        {posts.map(post => <ShopPost post={post}/>)}
      </div>
      <div className="shop-posts__add-post">
        <div className="clickable b-button" onClick={openCreateModal}>Add new post</div>
      </div>
    </div>
  )
};

export default ShopPosts;
