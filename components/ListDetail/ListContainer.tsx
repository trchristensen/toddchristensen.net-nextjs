import * as React from "react";

export function ListContainer({ children, onRef, ...rest }) {
  const scrollContainerRef = React.useRef(null);

  React.useEffect(() => {
    onRef(scrollContainerRef);
  }, [scrollContainerRef]);

  return (
    <div
      ref={scrollContainerRef}
      className="relative flex-none w-full h-full max-h-screen min-h-screen overflow-y-auto border-r border-base-300 bg-base-200 md:w-80 xl:w-96"
      {...rest}
    >
      {children}
    </div>
  );
}
