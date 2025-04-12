import { ReactNode } from "react";
import * as styles from "./Layout.module.scss";

export const Layout: React.FC = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};
