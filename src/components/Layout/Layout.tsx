import { ReactNode } from "react";
import styles from "./Layout.module.scss";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return <main className={styles.container}>{children}</main>;
};
