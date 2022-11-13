import Box from "@mui/material/Box";

type mainContent = {
  content: React.ReactNode;
};

export default function mainComponent({ content }: mainContent) {
  return (
    <main className="min-h-screen max-w-screen-lg m-auto">
      <Box>{content}</Box>
    </main>
  );
}
