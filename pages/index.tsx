import Link from 'next/link';
import groq from 'groq';
import client from '../client';
import styles from './index.module.scss';
import Posts from './post/[slug]'; // Import your Post component
import Post from '@/app/types/post';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

const Index = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.length > 0 && posts.map(
        ({ _id, title = '', slug, publishedAt = '', author = '', categories = [], authorImage = {}, mainImage = {}, body = '', trackList = '', song = '', youtube = '' }) =>
          slug && (
            <div key={_id}>
              <Link className={styles.post_header} href={`/post/${encodeURIComponent(slug.current)}`}>
                <h2>{title}</h2>
              </Link>
              <div className={styles.info_container}>
                <p>Published on: {new Date(publishedAt).toDateString()} by {author}</p>
                <div className={styles.categories_container}>
                  <p>Categories: {' '}</p>
                  &nbsp;
                  <p className={styles.categories}>
                    {categories.map((category, index) => (
                      <span key={category}>
                        {category}
                        {index !== categories.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <Posts post={{ mainImage, body, trackList, song, youtube }} />
            </div>
          )
      )}
    </div>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(groq`
    *[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      "author": author->name,
      "categories": categories[]->title,
      "authorImage": author->image.asset->url,
      "mainImage": mainImage.asset->url,
      "song": song.asset->url,
      "youtube": youtube.url,
      body,
      trackList
    }
  `);

  return {
    props: {
      posts
    }
  };
}


export default Index;
