import { fetchNewsFeedStart, fetchNewsFeedSuccess } from './actions';
export const fetchNewsFeed = () => (dispatch: Function, getState: Function) => {
  dispatch(fetchNewsFeedStart());
  const news = [
    {
      icecreamShopData: {
        id: 1,
        logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSdd6YjBP-BIQra6_ovdfHitBCkIbuy7pCJdhEmCC82pDwcAAO&s',
        name: 'Cool Icecream Shop Name',
        address: 'Some St. 1105/15, City 14-510',
      },
      postData:  {
        id: 1,
        imageUrl: 'https://www.simplyrecipes.com/wp-content/uploads/2006/06/French-Vanilla-IceCream-LEAD-1.jpg',
        title: 'Very interesting title',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nulla soluta vero illum. Omnis repellat molestiae molestias voluptatem commodi at accusamus, vitae facilis, hic itaque voluptatum esse qui, eum cupiditate.',
        reactions: [150,51,4]
      },
    },
    {
      icecreamShopData: {
        id: 2,
        logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSdd6YjBP-BIQra6_ovdfHitBCkIbuy7pCJdhEmCC82pDwcAAO&s',
        name: 'Cool Icecream Shop Name II',
        address: 'Some St. 1105/16, City 14-510',
      },
      postData:  {
        id: 2,
        imageUrl: '',
        title: 'Very interesting title',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nulla soluta vero illum. Omnis repellat molestiae molestias voluptatem commodi at accusamus, vitae facilis, hic itaque voluptatum esse qui, eum cupiditate.',
        reactions: [150,51,4]
      },
    }
  ];;
  dispatch(fetchNewsFeedSuccess(news));
};
