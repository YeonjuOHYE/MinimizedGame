export const posters = [
  {
    id: 0,
    path: "minimizedPosters/0.png",
    name: "검은 사제들",
    hint: ["hint1"]
  },
  { id: 1, path: "minimizedPosters/1.png", name: "조커", hint: ["hint2"] },
  { id: 2, path: "minimizedPosters/2.png", name: "타짜", hint: ["hint3"] },
  { id: 3, path: "minimizedPosters/3.jpeg", name: "알라딘", hint: ["hint4"] },
  { id: 4, path: "minimizedPosters/4.jpeg", name: "감기", hint: ["hint5"] },
  { id: 5, path: "minimizedPosters/5.jpeg", name: "아가씨", hint: ["hint4"] },
  { id: 6, path: "minimizedPosters/6.jpeg", name: "겨울왕국", hint: ["hint4"] },
  { id: 7, path: "minimizedPosters/7.png", name: "올드보이", hint: ["hint4"] },
  { id: 8, path: "minimizedPosters/8.png", name: "러브레터", hint: ["hint4"] }
];

export const getPosterById = id => posters.find(obj => obj.id == id);

export const getPosterLength = () => posters.length;
