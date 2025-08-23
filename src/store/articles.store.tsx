import { create } from "zustand";

interface ArticlesView {
  viewContent: string;
}

interface ArticleState {
  title: string;
  description: string;
  tags: string[];
  ArticleView: ArticlesView; // Removed optional (?) to ensure it's always defined
  setViewContent: (viewContent: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setTags: (tags: string[]) => void;
}

export const useArticleStore = create<ArticleState>((set) => ({
  title: "",
  description: "",
  tags: [],
  ArticleView: { viewContent: "" }, // Corrected initial state

  setViewContent: (viewContent) => set((state) => ({
    ArticleView: { ...state.ArticleView, viewContent }
  })),

  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setTags: (tags) => set({ tags }),
}));

//new store
import { SuggestionType } from "@/types/article";

interface ArticlesRestoreTypes{
  data_articles: SuggestionType[];
  add_Articles:(id: string, title: string)=>void;
}

export const ArticlesRestore = create<ArticlesRestoreTypes>((set)=>({
  data_articles: [],
  add_Articles: (id: string, title: string) =>
    set((state) => ({
      data_articles: [{ id, title }, ...state.data_articles],
    })),

}))

// export const ArticlesRestore = create<ArticlesRestoreTypes>((set) => ({
//   data_articles: [],

//   add_Articles: (id: string, title: string, prepend = false) =>
//     set((state) => ({
//       data_articles: prepend
//         ? [{ id, title }, ...state.data_articles] // Prepend
//         : [...state.data_articles, { id, title }], // Append (default)
//     })),
// }));
