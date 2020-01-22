export const dayOptions = [{val: 1, name: 'Monday'}, {val: 2, name: 'Tuesday'}, {val: 3, name: 'Wednesday'}, {val: 4, name: 'Thursday'}, {val: 5, name: 'Friday'}, {val: 6, name: 'Saturday'}, {val: 7, name: 'Sunday'}];
export const days = dayOptions.reduce((acc: any, obj) => {
  acc[obj.val] = obj.name;
  return acc;
}, {});