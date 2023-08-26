export interface Post {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  body: string;
  date: string;
  author: string;
}

export function emptyPost(): Post {
  return {
    id: 0,
    imageUrl: '',
    title: '',
    description: '',
    body: '',
    date: '',
    author: ''
  } as Post;
}
