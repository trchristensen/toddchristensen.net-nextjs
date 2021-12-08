import { Avatar } from "components/Avatar/avatar.component";
import { GhostButton } from "components/Button";
import { GlobalNavigationContext } from "components/Providers";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import Link from 'next/link';
import ChangeTheme from "components/ChangeTheme/ChangeTheme.component";
import NowPlaying from "components/Spotify/NowPlaying.component";
import CurrentTime from "components/CurrentTime/CurrentTime.component";



function Container(props) {
  return (
    <div
      data-cy="sign-in-button"
      className="sticky bottom-0 z-10 flex items-center justify-between p-2 space-x-3 border-t border-base-300 bg-base-200 bg-opacity-80 filter-blur"
      {...props}
    />
  );
}


export function UserFooter() {
  const { data: session } = useSession();

  // const { data, loading, error } = useViewerQuery();
  const { setIsOpen } = useContext(GlobalNavigationContext);

  function signInButton() {
    return (
      <a style={{ width: "100%" }} href="/api/auth/login">
        <GhostButton style={{ width: "100%" }}>Sign in</GhostButton>
      </a>
    );
  }

  // if (loading) {
  // return (
  //   <Container>
  //     <div className="flex items-center justify-center w-full py-1">
  //       {/* <LoadingSpinner /> */}Loading...
  //     </div>
  //   </Container>
  // );
  // }

  // if (error) {
  //   return <Container>{signInButton()}</Container>;
  // }

  return (
    <Container>
      <div>
        <div className="flex flex-col gap-2">
          <ChangeTheme />
          <NowPlaying />
          <CurrentTime
            className="text-sm opacity-70 -mt-8"
            timezone="Asia/Manila"
            city="Angeles City"
            countryCode="PH"
          />
        </div>
        {session ? (
          <>
            <Link
              // href={`/u/${data.viewer.username}`}
              href="#"
            >
              <a
                onClick={() => setIsOpen(false)}
                className="flex items-center flex-none rounded-full"
              >
                <Avatar
                  user={session.user.email}
                  src={session?.user.image}
                  width={24}
                  height={24}
                  layout="fixed"
                  className="rounded-full"
                />
              </a>
            </Link>
            <GhostButton
              aria-label="Manage settings"
              onClick={() => setIsOpen(false)}
              size="small-square"
              href="/settings"
            >
              {/* <Settings size={16} /> */}
            </GhostButton>
          </>
        ) : (
          <>{signInButton()}</>
        )}
      </div>
    </Container>
  );
}
