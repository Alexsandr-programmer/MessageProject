"use client";

import { useFormState } from "react-dom";
import styles from "./loginForm.module.css";
import { login } from "@/lib/action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageCircleWarning } from "lucide-react";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  const router = useRouter();

  // useEffect(() => {
  //   state?.success && router.push("/login");
  //   console.log(state?.success);
  // }, [state?.success, router]);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="user name" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state?.error && (
        <p className={styles.error}>
          {" "}
          <MessageCircleWarning /> {state.error}
        </p>
      )}
      <Link href="/register">
        {" Don't have an account"} <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;
