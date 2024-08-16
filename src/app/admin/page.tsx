import { Suspense } from "react";
import styles from "./admin.module.css";
import AdminPost from "@/components/adminPost/AdminPost";
import AdminPostForm from "@/components/adminPostForm/AdminPostForm";
import AdminUsers from "@/components/adminUsers/AdminUsers";
import AdminUserForm from "@/components/adminUserForm/AdminUserForm";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";

const AdminPage = async () => {
  const session: Session | null = await auth();

  if (!session) {
    return <div>You must be logged in to view this page</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPost />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminPostForm user={session.user} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminUserForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
