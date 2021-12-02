import React, { useState, useRef } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { signIn, useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from "swr";
import AddBook from "./AddBook.component";

import fetcher from "lib/fetcher";
import { Form, FormState } from "lib/types";
// import SuccessMessage from 'components/SuccessMessage';
// import ErrorMessage from 'components/ErrorMessage';
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner.component";
import BookEntry from "./BookEntry.component";
import CounterInput from "components/CounterInput/CounterInput.component";
import AddBookSearch from "./AddBookSearch.component";

export default function Books({ fallbackData }) {
  const { data: session } = useSession();

  const { data: entries } = useSWR("/api/books", fetcher, {
    fallbackData,
  });

  return (
    <>
      <div className="flex flex-col mb-4 space-y-4 w-full">
        {entries?.map((entry) => (
          <BookEntry key={entry.id} entry={entry} user={session?.user} />
        ))}
      </div>
      <AddBookSearch session={session} />
      {/* <AddBook session={session} /> */}
    </>
  );
}
