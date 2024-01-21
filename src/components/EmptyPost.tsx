export default function EmptyPost() {
  return (
    <div className="border-2 rounded-2xl p-5 flex flex-col gap-3 cursor-pointer hover:scale-110 transition-all duration-300">
      <div className="flex gap-x-2">
        <div className="badge skeleton w-12"></div>
        <div className="badge skeleton w-12"></div>
      </div>
      <div className="badge skeleton w-3/4"></div>
      <div className="badge skeleton w-28"></div>
      <div className="divider"></div>
      <div className="badge skeleton w-12"></div>
    </div>
  );
}
