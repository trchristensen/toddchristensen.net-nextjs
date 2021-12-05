import { useTheme } from "next-themes";
import { BiAlarm, BiDice3 } from "react-icons/bi";
import { FaFileCsv } from "react-icons/fa";
import { ImProfile } from "react-icons/im"

export default function ChangeTheme() {

    const { resolvedTheme, setTheme } = useTheme();

    const themes = ["light", "dark", "black", "cyberpunk", "synthwave", "bumblebee", "retro", "cupcake", "corporate", "emerald", "valentine", "wireframe"]

    const selectRandomTheme = () => {
      setTheme(themes[Math.floor(Math.random() * themes.length + 1)])
    }

  return (
    <div className="flex items-center gap-6 cursor-pointer">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          className="m-1 cursor-pointer tooltip tooltip-bottom hover:text-accent-focus"
          data-tip="Theme Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current md:mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            ></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
        >
          <li
            onClick={() =>
              setTheme(resolvedTheme === "light" ? "light" : "light")
            }
          >
            <a>light</a>
          </li>
          <li
            onClick={() => setTheme(resolvedTheme === "dark" ? "dark" : "dark")}
          >
            <a>dark</a>
          </li>
          <li
            onClick={() =>
              setTheme(resolvedTheme === "space" ? "space" : "space")
            }
          >
            <a>space</a>
          </li>
          <li
            onClick={() =>
              setTheme(
                resolvedTheme === "cyberpunk" ? "cyberpunk" : "cyberpunk"
              )
            }
          >
            <a>cyberpunk</a>
          </li>
         
        </ul>
      </div>
    </div>
  );
}
