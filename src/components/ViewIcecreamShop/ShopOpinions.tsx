import React, { KeyboardEvent, FormEvent } from 'react';
import randomKey from '../../utils/randomKey';

export interface ShopOpinionsProps {
  icecreamShopId: number;
  opinions: {
    id: number,
    avatarUrl: string,
    username: string,
    grade: number,
    opinion: string,
    comments: {
      id: number,
      avatarUrl: string,
      username: string,
      content: string
    }[]
  }[]
}

const ShopOpinions = (props: ShopOpinionsProps) => {
  const { opinions = [] } = props;
  const handleAddComment = (opinionId: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      const input = event.target as HTMLInputElement;
      console.log(opinionId, input.value);
      input.value = '';
    }
  }
  const handleSubmitOpinion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    console.log(form.opinion.value, form.grade.value);
    form.reset();
  }
  return (
    <div className="shop-opinions">
      <div className="shop-opinions__opinions">
        {opinions.map(opinion => (
          <div key={randomKey()} className="shop-opinions__opinion">
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
            <div className="shop-opinions__opinion-content">
              <div className="shop-opinions__opinion-text">{opinion.opinion}</div>
              <div className="shop-opinions__opinion-comments">
                {opinion.comments.map(comment => (
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
              <div className="shop-opinions__add-comment">
                <input className="shop-opinions__add-comment-input" placeholder="Insert your comment..." onKeyUp={handleAddComment(opinion.id)}/>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form className="shop-opinions__add-opinion" onSubmit={handleSubmitOpinion}>
        <div className="shop-opinions__opinion-wrapper">
          <textarea id="opinion" required className="shop-opinions__opinion-textarea" placeholder="Insert your opinion here"/>
        </div>
        <div className="shop-opinions__opinion-grade">
          <input id="grade" className="shop-opinions__grade-input" required placeholder="Grade" type="number" min="1" max="10"/>
        </div>
        <div className="shop-opinons__opinion-submit">
          <button className="b-button">Send opinion</button>
        </div>
      </form>
    </div>
  )
};

export default ShopOpinions;
