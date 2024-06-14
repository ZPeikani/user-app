import { ReactNode } from "react";
import { Header } from "./header/header";

type LayoutProps = {
  children: ReactNode;
};
export function Layout({children}:LayoutProps) {
  return (
    <div className="mx-3 flex flex-col gap-3">
      <Header />
      {children}
    </div>
  );
}
