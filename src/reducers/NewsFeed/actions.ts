import { FETCH_NEWS_FEED_SUCCESS, FETCH_NEWS_FEED_FAIL, FETCH_NEWS_FEED_START } from './action-types';
export const fetchNewsFeedSuccess = (news: any) => ({type: FETCH_NEWS_FEED_SUCCESS, payload: news});
export const fetchNewsFeedFail = () => ({type: FETCH_NEWS_FEED_FAIL});
export const fetchNewsFeedStart = () => ({type: FETCH_NEWS_FEED_START});