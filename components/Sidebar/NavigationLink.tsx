import Link from "next/link";
import { Avatar } from "components/Avatar/avatar.component";
import { GhostButton } from "components/Button";
import { TitleBar } from "components/ListDetail/TitleBar";
import { useContext } from "react";
import { GlobalNavigationContext } from "components/Providers";

export function NavigationLink({
  link: {
    href,
    label,
    icon: Icon,
    trailingAccessory: Accessory,
    trailingAction: Action,
    isActive,
    isExternal,
  },
}) {
  const { setIsOpen } = useContext(GlobalNavigationContext);
  return (
    <li
      className="flex items-stretch space-x-1"
      onClick={() => setIsOpen(false)}
    >
      <Link href={href}>
        <a
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={`flex flex-1 items-center space-x-3 px-2 py-1.5 text-sm font-medium rounded-md  ${
            isActive ? "bg-base-100"
            : "sm:hover:bg-base-100"
          }`}
        >
          <span className="flex items-center justify-center">
            <Icon />
          </span>
          <span className="flex-1">{label}</span>
          {Accessory && (
            <span className="flex items-center justify-center w-4 text-opacity-40">
              <Accessory />
            </span>
          )}
        </a>
      </Link>
      {Action && <Action />}
    </li>
  );
}
