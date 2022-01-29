export default function Notch() {
  return (
    <div
      className="bg-zinc-900 w-full top-0 fixed"
      style={{
        minHeight: "env(safe-area-inset-top)",
      }}
    ></div>
  );
}
