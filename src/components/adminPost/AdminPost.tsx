import styles from "./adminPost.module.css";
import Image from "next/image";
import { getPosts, Post } from "@/lib/data";
import { deletePost } from "@/lib/action";
import Link from "next/link";
const AdminPost = async () => {
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.slug} className={styles.post}>
          <div className={styles.detail}>
            <Image
              src={post.img || "/noAvatar.png"}
              alt={post.slug}
              width={50}
              height={50}
            />
            <span className={styles.postTitle}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </span>
          </div>
          <form action={deletePost}>
            <input type="hidden" name="id" value={post.id} />
            <button className={styles.postBtn}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminPost;
