import { FETCH_NEWS_FEED_SUCCESS, FETCH_NEWS_FEED_FAIL, FETCH_NEWS_FEED_START } from './action-types';
export interface NewsFeedState {
  list: any[];
  loading: Boolean;
  error: Object;
}

const initialState: NewsFeedState = {
  list: [],
  loading: false,
  error: {},
};

export const newsFeed = (state: NewsFeedState = initialState, action: any) => {
  switch (action.type) {
    case FETCH_NEWS_FEED_START:
      return {...state, loading: true, error: {}}
    case FETCH_NEWS_FEED_SUCCESS:
      return {...state, list: action.payload, loading: false};
    case FETCH_NEWS_FEED_FAIL:
      return {...state, list: [], loading: false, error: action.payload};
    default:
      return state
  }
}