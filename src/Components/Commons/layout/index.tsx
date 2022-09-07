import { ReactNode } from "react";
import LogoHeader from "./logo_header";
import Navigation from "./navigation";
import PageHeader from "./page_header";

interface ILayoutProps {
  children: ReactNode;
}

export default function Layout(props: ILayoutProps) {
  return (
    <>
      <LogoHeader />
      {/* <PageHeader title="오늘의 댕댕이" /> */}
      <div>{props.children}</div>
      <Navigation />
    </>
  );
}
