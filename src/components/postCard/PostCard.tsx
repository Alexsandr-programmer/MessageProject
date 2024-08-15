import Image from "next/image";
import Link from "next/link";
import styles from "./postCard.module.css";
import { format } from "date-fns";
import { Post } from "@/lib/data";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image
            src={
              post.img ||
              "https://images.pexels.com/photos/6633056/pexels-photo-6633056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="post picture"
            className={styles.img}
            fill
          />
        </div>
        <span className={styles.date}>
          {String(format(post.createdAt, "dd.MM.yyyy"))}
        </span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.description}>{post.desc}</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
