"use client";

import { useFormState } from "react-dom";
import styles from "./adminPostForm.module.css";
import { addPost } from "@/lib/action";
import { User } from "next-auth";

const AdminPostForm = ({ user }: { user: any }) => {
  const [state, formAction] = useFormState(addPost, undefined);

  return (
    <div>
      <form action={formAction} className={styles.container}>
        <h1>Add New Post</h1>
        <input
          type="hidden"
          name="userId"
          placeholder="userId"
          value={user.id}
        />
        <input type="text" name="title" placeholder="title" />

        <input type="text" name="slug" placeholder="slug" />
        <input type="text" name="img" placeholder="img" />
        <textarea name="desc" placeholder="description" rows={10}></textarea>
        <button>Add</button>
        {state && state.error}
      </form>
    </div>
  );
};

export default AdminPostForm;
