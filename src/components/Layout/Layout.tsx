import React, { ReactNode } from "react";
import * as styles from "./Layout.module.scss";

const Layout = ({ children }: ReactNode) => {
  return <main className={styles.container}>{children}</main>;
};

export default Layout;
