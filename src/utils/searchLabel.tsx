export function searchLabel(title: string): string {
  switch (title) {
    case "Characters":
      return "Enter a character name...";

    case "Episodes":
      return "Enter a episode name...";

    default:
      return "Search...";
  }
}
