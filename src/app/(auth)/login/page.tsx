import LoginForm from "@/components/loginForm/LoginForm";
import { handleGithubLogin } from "@/lib/action";
import styles from "./login.module.css";
import { Github } from "lucide-react";
import Image from "next/image";

const LoginPage = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>
            <Image src="/github_octocat.png" alt="cat" width={20} height={20} />
            <b>GitHub</b>
          </button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
