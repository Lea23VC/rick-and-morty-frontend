//modules
import dynamic from "next/dynamic";

//dynamic components
const FavoritesView = dynamic(
  () => import("../src/components/favorites/view/favoritesView"),
  {
    suspense: true,
  }
);

//layout
import PageLayout from "../src/components/layouts/pageLayout";

export default function Favorites(): JSX.Element {
  return (
    <PageLayout headTitle="Favorites - Rick and Morty">
      <FavoritesView />
    </PageLayout>
  );
}
