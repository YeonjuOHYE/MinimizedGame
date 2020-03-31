const posters = [
  { id: 0, path: "minimizedPosters/0.png", name: "검은 사제들", hint: ["hint1"] },
  { id: 1, path: "minimizedPosters/1.png", name: "조커", hint: ["hint2"] },
  { id: 2, path: "minimizedPosters/2.png", name: "타짜", hint: ["hint3"] }
];

export const getPosterById = id => posters.find(obj => obj.id == id);

export const getPosterLength = () => posters.length;
