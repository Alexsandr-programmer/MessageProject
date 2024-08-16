import { getUsers } from "@/lib/data";
import styles from "./adminUsers.module.css";
import { deleteUser } from "@/lib/action";
import Image from "next/image";
const AdminUsers = async () => {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.username} className={styles.post}>
          <div className={styles.detail}>
            <Image
              src={user.img || "/noAvatar.png"}
              alt={user.username}
              width={50}
              height={50}
            />
            <span className={styles.postTitle}>{user.username}</span>
          </div>
          <form action={deleteUser}>
            <input
              type="hidden"
              name="id"
              value={user.id as unknown as string}
            />
            <button className={styles.postBtn}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
