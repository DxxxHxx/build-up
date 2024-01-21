import { atom } from "recoil";

export const inputAtom = atom({
  key: "searchKeyword",
  default: "",
});

export const postCategoryAtom = atom<string[]>({
  key: "postCategory",
  default: [],
});

export interface IpostFilteringAtom {
  tag1: string;
  tag2: string;
}
export const postFilteringAtom = atom<IpostFilteringAtom>({
  key: "postFiltering",
  default: { tag1: "", tag2: "" },
});

export const showAllPostsAtom = atom({
  key: "showAll",
  default: true,
});

export const hotPostListAtom = atom<string[]>({
  key: "hotPostList",
  default: [],
});

// export const postFilteringSelector=selector({
//   key:'filterSelector',
//   get:({get})=>{
//     const filter=get(postFilteringAtom)

//   }
// })
// export const fetchdata = selector({
//   key: "fetchPosts",
//   get: async () => {
//     return useData();
//   },
// });
// export const showPostsSelector=selector({
//   key:'selectShowPost',
//   get:({get})=>{

//   }
// })
// export const loadingAtom = atom({
//   key: "isLoading",
//   default: false,
// });

// export const isLoggedin = atom({
//   key: "isLoggedin",
//   default: sessionStorage.getItem('state')?sessionStorage.getItem('state'):sessionStorage.setItem('state','logout'),
// });
