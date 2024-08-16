import { getUser } from "@/lib/data";
import styles from "./postUser.module.css";
import Image from "next/image";
import { User } from "@/lib/data";

interface Props {
  userId: string;
}

// const getUserFetch = async (userId: number): Promise<User> => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${userId}`,
//     { cache: "no-store" }
//   );

//   return res.json();
// };

const PostUser = async ({ userId }: Props) => {
  // const user = await getUserFetch(userId);

  const user: User = await getUser(userId);
  return (
    <div className={styles.container}>
      <Image
        src={user.img || "/noavatar.png"}
        alt="user photo"
        width={50}
        height={50}
        className={styles.avatar}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.userName}>{user.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
