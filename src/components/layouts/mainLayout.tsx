import dynamic from "next/dynamic";
const Header = dynamic(() => import("../header/header"), {
  suspense: true,
});

type layoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: layoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
