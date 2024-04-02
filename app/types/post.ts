// types/post.ts

interface Post {
  _id: number;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  author: string;
  categories: string[];
  authorImage: {
    asset: {
      _id: string;
      url: string;
    };
  };
  mainImage: {
    asset: {
      _id: string;
      url: string;
    };
  };
  song: string;
  youtube: string;
  body: string[];
  trackList: string[];
  // Add more properties as needed
}

export default Post;
