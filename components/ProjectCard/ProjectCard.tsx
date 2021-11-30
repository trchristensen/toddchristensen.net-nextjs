import { ArrowLink } from 'components/ArrowLink/ArrowLink.component';
import { FaGithub } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';
import { ILink, IProjectCard } from 'lib/types';


export default function ProjectCard({
  title,
  description,
  href,
  icon,
  tags,
  imageObject,
  links
}: IProjectCard) {
  return (
    <div className="flex flex-col items-center justify-center mx-auto rounded overflow-hidden pt-4">
      {/* <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)" }}></div> */}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageObject.src}
        alt={imageObject.alt}
        className={`projectCard__image rounded drop-shadow-lg `}
      />
      <div className="">
        <h3 className="py-2 text-lg text-center font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h3>

        <div className="flex flex-col px-3 py-2">
          <span className="leading-5 text-gray-700 dark:text-gray-300">
            {description}
          </span>
          <div className="flex justify-between items-end mt-2">
            <div className="text-sm text-gray-900 dark:text-gray-100">
              {links &&
                links.map((link: ILink, idx: number) =>
                  link.icon === 'github' ? (
                    <a
                      href={link.href}
                      className="flex justify-center items-center gap-1"
                      target={link.blank ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                    >
                      <FaGithub /> <span>{link.text}</span>
                    </a>
                  ) : (
                    <div className="flex justify-center items-center gap-1">
                      <BiLinkExternal /> <span>{link.text}</span>
                    </div>
                  )
                )}
            </div>
            <ArrowLink href={href} text="details" />
          </div>
        </div>
      </div>
    </div>
  );
}
