"use client";

import { useFormState } from "react-dom";
import styles from "./registerForm.module.css";
import { register } from "@/lib/action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageCircleWarning } from "lucide-react";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
    console.log(state?.success);
  }, [state?.success, router]);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="user name" name="username" />
      <input type="emailf" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input
        type="password"
        placeholder="password again"
        name="passwordRepeat"
      />
      <button>register</button>
      {state?.error && (
        <p className={styles.error}>
          {" "}
          <MessageCircleWarning /> {state.error}
        </p>
      )}
      <Link href="/login">
        Have an account <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
