import Header from "../header/header";

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
