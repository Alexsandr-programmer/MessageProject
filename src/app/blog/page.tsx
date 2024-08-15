import PostCard from "@/components/postCard/PostCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";
import { Post } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog description",
};

// FETCH DATE WITH AN API -----------------
const dataFetch = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:3000/api/blog ", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("errro");
  }
  return res.json();
};

const BlogPage = async () => {
  // FETCH DATE WITH AN API ----------------------
  const posts: Post[] = await dataFetch();

  // FETCH DATE WITHOUT AN API ------------
  // const posts: Post[] = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={String(post.id)}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
