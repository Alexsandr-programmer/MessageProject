import { auth } from "@/lib/auth";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className={styles.container}>
      <Link href="/" className={styles.logo}>
        CreatiTide
      </Link>
      <nav>
        <Links session={session} />
      </nav>
    </header>
  );
};

export default Navbar;
