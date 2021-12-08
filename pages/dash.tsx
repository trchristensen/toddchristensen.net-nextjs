import * as React from "react";

import { ListDetailView } from "components/Layouts";
import { Intro } from "components/Home/Intro";

export default function Home() {
  return <ListDetailView list={null} hasDetail detail={<Intro />} />;
}