import useSound from "use-sound";

export function ArrowLink({ text, href, blank = false }) {

  const [playActive] = useSound("/sounds/start.mp3", { volume: 0.25 });

  return (
    <a
      onClick={() => playActive()}
      target={blank ? "_blank" : "_self"}
      rel="noopener noreferrer"
      href={href}
      className="flex leading-7 rounded-lg text-accent transition-all h-6 ink-hover hover:text-accent-focus ease-in-out duration-500"
    >
      {text}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-6 w-6 ml-1"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
        />
      </svg>
    </a>
  );
}
