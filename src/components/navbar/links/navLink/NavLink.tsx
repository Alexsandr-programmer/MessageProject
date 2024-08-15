"use client";

import Link from "next/link";
import styles from "./navLink.module.css";
import { usePathname } from "next/navigation";

interface Props {
  item: {
    title: string;
    path: string;
  };
}

const NavLink = ({ item }: Props) => {
  const pathName = usePathname();

  console.log(pathName);

  return (
    <li className={styles.link}>
      <Link
        href={item.path}
        className={`${styles.container} ${
          pathName === item.path && styles.active
        }`}
      >
        {item.title}
      </Link>
    </li>
  );
};

export default NavLink;
