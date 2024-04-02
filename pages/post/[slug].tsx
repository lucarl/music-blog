import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import client from '../../client';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import styles from './post.module.scss';
import { Inter } from 'next/font/google'
import cn from 'classnames';

function urlFor(source: any) {
  return imageUrlBuilder(client).image(source);
}

const inter = Inter({ subsets: ['latin'] })

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      const imageUrl = urlFor(value).width(320).height(240).fit('max').auto('format').url();
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={imageUrl}
        />
      );
    }
  }
}

const Post = ({ post }: any) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>; // You can customize the loading UI
  }

  const {
    title,
    name,
    categories,
    authorImage,
    mainImage,
    trackList = [],
    song,
    youtube,
    body = []
  } = post;

  return (
    <article className={styles.container}>
      <h1 className={styles.header}>{title}</h1>
      <span>{name}</span>
      {categories && (
        <ul className={styles.header}>
          Posted in
          {categories.map((category: any) => <li key={category}>{category}</li>)}
        </ul>
      )}
      {authorImage && (
        <div>
          <img
            src={urlFor(authorImage)
              .width(50)
              .url()}
            alt={`${name}'s picture`}
          />
        </div>
      )}
        <PortableText
          value={body}
          components={ptComponents}
        />
        <PortableText
          value={trackList}
          components={ptComponents}
        />
      {song && (
        <div className={styles.song}>
          <a href={song} download>Download</a>
        </div>
      )}
      {mainImage && (
        <div className={styles.main_image}>
          <img
            src={urlFor(mainImage)
              .width(200)
              .url()}
            alt={`${name}'s picture`}
          />
        </div>
      )}
      {youtube && (
        <div className={styles.react_player}>
          <ReactPlayer url={youtube} />
        </div>
      )}
    </article>
  );
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  "mainImage": mainImage.asset->url,
  "song": song.asset->url,
  "youtube": youtube.url,
  body,
  trackList
}`;

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const post = await client.fetch(query, { slug });
  return {
    props: {
      post
    }
  };
}

export default Post;
