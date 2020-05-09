const posters = [
  { id: 0, path: "minimizedPosters/0.jpeg", name: "킹스맨", hint: ["hint1"] },
  { id: 1, path: "minimizedPosters/1.jpeg", name: "조커", hint: ["hint2"] },
];

export const getPosterById = (id) => posters.find((obj) => obj.id == id);

export const getPosterLength = () => posters.length;
