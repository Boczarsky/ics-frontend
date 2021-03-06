import React, { KeyboardEvent, FormEvent, useEffect, useState } from 'react';
import randomKey from '../../utils/randomKey';
import { dataProvider } from '../../utils/requestBuilder';
import { useDispatch, useSelector } from 'react-redux';
import { pushNotification } from '../../reducers/Notifications/operations';
import { generateUrl } from '../common/UploadImage';
import userType from '../../enums/userType';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import { useTranslation } from 'react-i18next';

export interface ShopOpinionsProps {
  icecreamShopId: number;
  rated: boolean;
}

const ShopOpinions = (props: ShopOpinionsProps) => {
  const { icecreamShopId, rated } = props;
  const [opinions, setOpinions] = useState<any[]>([]);
  const [isRated, setRated] = useState(false);
  const uType = useSelector((state: any) => state.auth.userType);
  const uId = useSelector((state: any) => state.auth.userId);
  const dispatch = useDispatch();
  useEffect(() => {
    setRated(Boolean(rated));
  }, [rated])
  const fetchOpinions = () => {
    dataProvider().post('opinions/list', { offset: 0, limit: 5, icecreamShopId })
      .then((response: any) => {
        setOpinions(response.data.result.map((opinion: any) => (
          {
            id: opinion.opinion_id,
            userId: opinion.user_id,
            avatarUrl: generateUrl(opinion.avatar_file_name),
            username: `${opinion.first_name || ''} ${opinion.last_name || ''}`.trim() || opinion.login,
            grade: opinion.grade,
            opinion: opinion.content,
            comments: opinion.comments.map((comment: any) => ({
              id: comment.comment_id,
              avatarUrl: comment.shop_name ? generateUrl(comment.shop_logo) : generateUrl(comment.avatar),
              username: comment.shop_name ? comment.shop_name : `${comment.first_name || ''} ${comment.last_name || ''}`.trim() || comment.username,
              content: comment.content,
            })),
          }
        )));
      })
  }
  const handleAddComment = (opinionId: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      const input = event.target as HTMLInputElement;
      dataProvider().post('opinions/addComment', { opinionId, content: input.value })
      .then(() => {
        dispatch(pushNotification('Comment added', 'normal', 2000));
        input.value = '';
        fetchOpinions();
      })
      .catch(() => {
        dispatch(pushNotification('Error during adding comment', 'error', 2000));
      })
    }
  }
  useEffect(() => {
    fetchOpinions();
  }, [icecreamShopId]);
  const handleSubmitOpinion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const [content, grade] = [form.opinion.value, Number(form.grade.value)];
    dataProvider().post('opinions/add', { content, grade, icecreamShopId })
      .then(() => {
        dispatch(pushNotification('Opinion added', 'normal', 2000));
        form.reset();
        setRated(true);
        fetchOpinions();
      })
      .catch(() => {
        dispatch(pushNotification('Error during creating opinion', 'error', 2000));
      })
  }
  const handleDelete = (opinionId: number) => () => {
    dataProvider().post('opinions/remove', {opinionId})
      .then(() => {
        dispatch(pushNotification('Opinion deleted', 'normal', 2000));
          setRated(false);
          fetchOpinions();
      })
      .catch(() => {
        dispatch(pushNotification('Error during deleting opinion', 'error', 2000));
      })
  };
  const { t } = useTranslation();
  return (
    <div className="shop-opinions">
      <div className="shop-opinions__opinions">
        {opinions.map(opinion => (
          <div key={randomKey()} className="shop-opinions__opinion">
            <div className="shop-opinions__header-wrapper">
              <div className="shop-opinions__opinion-header">
                <div className="shop-opinions__author">
                  <div className="shop-opinions__avatar">
                    {opinion.avatarUrl ?
                      <img src={opinion.avatarUrl} alt="avatar"/> :
                      <div className="shop-opinions__avatar-placeholder"></div>  
                    }
                  </div>
                  <div className="shop-opinions__username">{opinion.username}</div>
                </div>
                <div className="shop-opinions__grade">{opinion.grade} / 10</div>
              </div>
              {opinion.userId === uId && <div className="shop-opinions__delete-button" onClick={handleDelete(opinion.id)}>
                <DeleteIcon/>
              </div>}
            </div>
            <div className="shop-opinions__opinion-content">
              <div className="shop-opinions__opinion-text">{opinion.opinion}</div>
              <div className="shop-opinions__opinion-comments">
                {opinion.comments.map((comment: any) => (
                  <div key={randomKey()} className="shop-opinions__comment">
                    <div className="shop-opinions__comment-header">
                      <div className="shop-opinions__avatar">
                        {comment.avatarUrl ?
                          <img src={comment.avatarUrl} alt="avatar"/> :
                          <div className="shop-opinions__avatar-placeholder"></div>  
                        }
                      </div>
                      <div className="shop-opinions__username">{comment.username}</div>
                    </div>
                    <div className="shop-opinions__comment-content">{comment.content}</div>
                  </div>
                ))}
              </div>
              {((opinion.userId === uId) || ([userType.employee, userType.manager].includes(uType))) && <div className="shop-opinions__add-comment">
                <input className="shop-opinions__add-comment-input" placeholder={`${t('Insert your comment')}...`} onKeyUp={handleAddComment(opinion.id)}/>
              </div>}
            </div>
          </div>
        ))}
      </div>
      {uType === userType.client && !isRated && <form className="shop-opinions__add-opinion" onSubmit={handleSubmitOpinion}>
        <div className="shop-opinions__opinion-wrapper">
          <textarea id="opinion" required className="shop-opinions__opinion-textarea" placeholder={t('Insert your opinion here')}/>
        </div>
        <div className="shop-opinions__opinion-grade">
          <input id="grade" className="shop-opinions__grade-input" required placeholder={t('Grade')} type="number" min="1" max="10"/>
        </div>
        <div className="shop-opinons__opinion-submit">
          <button className="b-button">{t('Send opinion')}</button>
        </div>
      </form>}
    </div>
  )
};

export default ShopOpinions;
