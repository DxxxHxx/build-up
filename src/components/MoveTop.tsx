export default function MoveTop() {
  const onClick = () => window.scroll({ top: 0, behavior: "smooth" });
  return (
    <div
      onClick={onClick}
      className="fixed sm:bottom-2 sm:right-0 md:bottom-5 md:right-2 lg:bottom-7 lg:right-5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="sm:w-10 sm:h-10 md:w-12 md:h-12 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  );
}
