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
