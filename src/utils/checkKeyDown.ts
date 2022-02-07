export default function checkKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
  if (e?.code === "Enter") e.preventDefault();
}
