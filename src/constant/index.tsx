export const createArticleFields = (
  categories: { documentId: string; name: string }[],
) => [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Input article title",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Input article description",
  },
  {
    name: "cover_image_url",
    label: "Cover Image URL",
    type: "url",
    placeholder: "Input image URL",
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    placeholder: "Select a category",
    options: categories.map((cat) => ({
      label: cat.name,
      value: cat.documentId,
    })),
  },
];

export const COMMENTS_PER_PAGE = 10;
export const ARTICLES_PER_PAGE = 12;
