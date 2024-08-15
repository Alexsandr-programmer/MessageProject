import styles from "./singlePost.module.css";
import Image from "next/image";
import PostUser from "@/components/postUser/PostUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";
import { format } from "date-fns";
import { Post } from "@/lib/data";

interface Props {
  params: { slug: string };
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.desc,
  };
};

// FETCH DATA WITH AN API
const dataFetchOnePost = async (slug: string): Promise<Post> => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug} `);

  if (!res.ok) {
    throw new Error("no response");
  }
  return res.json();
};

const SinglePostPage = async ({ params }: Props) => {
  const { slug } = params;

  // FETCH DATE WITH AN API -----------------
  const post = await dataFetchOnePost(slug);

  // FETCH DATE WITHOUT AN API
  // const post = await getPost(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={
            post.img ||
            "https://images.pexels.com/photos/16517994/pexels-photo-16517994/free-photo-of-parliament-and-big-ben-in-london.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          }
          alt="post picture"
          className={styles.img}
          fill
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}

          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {format(post.createdAt, "dd.MM.yyyy | hh:mm:ss")}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
