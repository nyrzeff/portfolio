import React, { ReactNode } from "react";
import * as styles from "./Layout.module.scss";

export const Layout = ({ children }: ReactNode) => {
  return <main className={styles.container}>{children}</main>;
};
