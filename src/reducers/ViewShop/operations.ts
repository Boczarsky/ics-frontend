import { fetchIcecreamShopStart, fetchIcecreamShopSuccess } from './actions';
export const fetchShop = (id: number) => (dispatch: Function, getState: Function) => {
  dispatch(fetchIcecreamShopStart());
  const data = {
    id: +id,
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSdd6YjBP-BIQra6_ovdfHitBCkIbuy7pCJdhEmCC82pDwcAAO&s',
    backgroundUrl: 'https://www.tripsavvy.com/thmb/TlJ3PJXEBydnqPw6GHQP8_cEsUU=/4026x2475/filters:fill(auto,1)/icecream-56a237e33df78cf772735f9f.jpg',
    name: 'Cool Icecream Shop',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti exercitationem possimus accusamus repudiandae nobis rerum dolor quae quaerat, facere dolore voluptatem, consectetur a et vel amet fuga asperiores aperiam nemo.',
    street: 'Stanisława Dubois 2',
    city: 'Gliwice',
    postalCode: '44-100',
    googleMapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d450.54185432830764!2d18.675132729216067!3d50.29846832387512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711305447dd7bb3%3A0xa424e9af0bda5f15!2sGelato%20Studio!5e0!3m2!1spl!2spl!4v1579708238571!5m2!1spl!2spl',
    openDays: [{ openFrom: '1', openTo: '5', hourFrom: '8:00', hourTo: '18:00' }, { openFrom: '4', openTo: '6', hourFrom: '10:00', hourTo: '20:00' }, { openFrom: '7', openTo: '7', hourFrom: '10:00', hourTo: '16:00' }],
    specialDays: [{closed: '1', from: '2020-01-23', to: '2020-01-24', hourFrom: '10:00', hourTo: '12:00'}, {closed: '0', from: '2020-01-24', to: '', hourFrom: '10:00', hourTo: '12:00'}, {closed: '0', from: '2020-01-24', to: '2020-01-25', hourFrom: '10:00', hourTo: '12:00'}, {closed: '0', from: '2020-01-24', to: '2020-01-25', hourFrom: '10:00', hourTo: '12:00'}],
    opinions: [
      {id: 1, avatarUrl: '', username: 'LoveIcecreamMan', grade: 10, opinion: 'Very good icecreams! Love it! 😍', comments: [{id: 1, avatarUrl: '', username: 'Cool Icecream Shop', content: 'Thank you for your opinion! 😍😍😍' }, {id: 2, avatarUrl: '', username: 'LoveIcecreamMan', content: 'What can i say except you welcome! 😂' }]},
      {id: 2, avatarUrl: '', username: 'LoveIcecreamMan', grade: 10, opinion: 'Very good icecreams! Love it! 😍', comments: [{id: 1, avatarUrl: '', username: 'Cool Icecream Shop', content: 'Thank you for your opinion! 😍😍😍' }, {id: 2, avatarUrl: '', username: 'LoveIcecreamMan', content: 'What can i say except you welcome! 😂' }]}
    ],
    posts: [
      { id: 1, imageUrl: 'https://www.simplyrecipes.com/wp-content/uploads/2006/06/French-Vanilla-IceCream-LEAD-1.jpg', title: 'Very interesting title', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nulla soluta vero illum. Omnis repellat molestiae molestias voluptatem commodi at accusamus, vitae facilis, hic itaque voluptatum esse qui, eum cupiditate.', reactions: [150,51,4]},
      { id: 1, imageUrl: '', title: 'Very interesting title', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nulla soluta vero illum. Omnis repellat molestiae molestias voluptatem commodi at accusamus, vitae facilis, hic itaque voluptatum esse qui, eum cupiditate.', reactions: [150,51,4]}
    ],
    flavours: [
      {id: 1, name: 'Fancy flavour name', reactions: [105,15,2], composition: 'Natural cream, sugar, secret ingredient, another secret ingredient, some love, sparkling awesomness', tags: ['Tag', 'Another', 'Again', 'AndAgain', 'AnotherOne', 'SomeCrazyAssLongOneThatNoOneWillRemember', 'AnotherOneAnother', 'AgainAndAgain', 'NextUp', 'Dingididong'], status: 1},
      {id: 2, name: 'Fancy flavour name', reactions: [105,15,2], composition: 'Natural cream, sugar, secret ingredient, another secret ingredient, some love, sparkling awesomness', tags: ['Tag', 'Another', 'Again', 'AndAgain', 'AnotherOne', 'SomeCrazyAssLongOneThatNoOneWillRemember'], status: 2},
      {id: 3, name: 'Fancy flavour name', reactions: [105,15,2], composition: 'Natural cream, sugar, secret ingredient, another secret ingredient, some love, sparkling awesomness', tags: ['Tag', 'Another', 'Again', 'AndAgain', 'AnotherOne', 'SomeCrazyAssLongOneThatNoOneWillRemember'], status: 3},
      {id: 4, name: 'Fancy flavour name', reactions: [105,15,2], composition: 'Natural cream, sugar, secret ingredient, another secret ingredient, some love, sparkling awesomness', tags: ['Tag', 'Another', 'Again', 'AndAgain', 'AnotherOne', 'SomeCrazyAssLongOneThatNoOneWillRemember'], status: 1},
      {id: 5, name: 'Fancy flavour name', reactions: [105,15,2], composition: 'Natural cream, sugar, secret ingredient, another secret ingredient, some love, sparkling awesomness', tags: ['Tag', 'Another', 'Again', 'AndAgain', 'AnotherOne', 'SomeCrazyAssLongOneThatNoOneWillRemember'], status: 2},
      {id: 6, name: 'Fancy flavour name', reactions: [105,15,2], composition: 'Natural cream, sugar, secret ingredient, another secret ingredient, some love, sparkling awesomness', tags: ['Tag', 'Another', 'Again', 'AndAgain', 'AnotherOne', 'SomeCrazyAssLongOneThatNoOneWillRemember'], status: 3},
    ]
  }
  dispatch(fetchIcecreamShopSuccess(data));
};
