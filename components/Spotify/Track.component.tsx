import Image from 'next/image'

export default function Track(track) {
  return (
    <div className="flex flex-row items-start border-b border-opacity-60 max-w-3xl w-full mt-6">
      <div className="relative md:mr-3">
        <p className="text-accent relative md:absolute text-sm font-bold">
          {track.ranking}
        </p>
      </div>
      <div className="flex flex-row w-full pl-3 pb-6">
        <div className="rounded overflow-hidden shadow-lg h-[50px] w-[50px]">
          <Image
            height={64}
            width={64}
            src={track.image.url}
            alt={track.image.title}
          />
        </div>
        <div className="flex flex-col pl-3">
          <a
            className="font-medium truncate w-60 sm:w-96 md:w-full"
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {track.title}
          </a>
          <p
            className="text-base-content mb-4 truncate w-60 sm:w-96 md:w-full"
          >
            {track.artist}
          </p>
        </div>
      </div>
    </div>
  );
}
