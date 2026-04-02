import { redirect } from "next/navigation";

export default function BookNewRedirect() {
  redirect("/locations/denver-larimer/book");
}
