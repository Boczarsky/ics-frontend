import React, { useState, useEffect } from 'react';
import ShopPost, { Post } from '../common/ShopPost';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../reducers/Modals/actions';
import { dataProvider } from '../../utils/requestBuilder';
import { pushNotification } from '../../reducers/Notifications/operations';
import { generateUrl } from '../common/UploadImage';
import userType from '../../enums/userType';

export interface ShopPostsProps {
  icecreamShopId: number;
}

const ShopPosts = (props: ShopPostsProps) => {
  const { icecreamShopId } = props;
  const [posts, setPosts] = useState<Post[]>([]);
  const dispatch = useDispatch();
  const uType = useSelector((state: any) => state.auth.userType);
  const fetchPosts = () => {
    dataProvider().post('posts/list', {offset: 0, limit: 3, icecreamShops: [icecreamShopId]})
    .then(response => {
      setPosts(response.data.result.map((post: any) => (
        {
          id: post.post_id,
          shopId: post.icecream_shop_id,
          imageUrl: generateUrl(post.file_name),
          title: post.title,
          content: post.content,
          reactions: post.reactions,
        }
      )));
    })
    .catch(() => {
      dispatch(pushNotification('Error during loading posts', 'error', 2000));
    })
  }
  useEffect(() => {
    fetchPosts();
  }, [icecreamShopId]);
  const openCreateModal = () => {
    dispatch(openModal('postForm', { icecreamShopId, fetchPosts }));
  };
  const openEditModal = (post: any) => () => {
    dispatch(openModal('postForm', {...post, fetchPosts}));
  };
  const removePost = (post: any) => () => {
    dataProvider().post('posts/remove', {postId: post.id, icecreamShopId: post.shopId})
    .then(response => {
      fetchPosts();
    })
    .catch(() => {
      dispatch(pushNotification('Error during post removal', 'error', 2000));
    })
  }
  return (
    <div className="shop-posts">
      <div className="shop-posts__posts">
        {posts.map(post => <div className="shop-posts__post">
          {[userType.manager, userType.employee].includes(uType) && <><div className="clickable b-button shop-posts__edit-post" onClick={openEditModal(post)}>Edit</div>
          <div className="clickable b-button shop-posts__remove-post" onClick={removePost(post)}>Remove</div></>}
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
