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
import { books } from ".prisma/client";
import { locale } from "config/locale.config";
const { EMAIL } = locale;

export default function Books({ fallbackData }) {
  const { data: session } = useSession();

  const { data: entries } = useSWR("/api/books", fetcher, {
    fallbackData,
  });

  return (
    <>
      <div className="flex flex-col mb-4 space-y-4 w-full">
        <div>
          <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
            Books I've read
          </h2>
          {entries
            ?.filter(
              (_: books) =>
                _.read_status == "HAS_READ" &&
                _.created_by == "toddchristensen@protonmail.com"
            )
            .map((entry) => (
              <BookEntry key={entry.id} entry={entry} user={session?.user} />
            ))}
        </div>

        <div>
          <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
            Books I plan to read
          </h2>
          <div className="flex flex-col gap-4">
            {entries
              ?.filter(
                (_: books) =>
                  _.read_status == "HAS_NOT_READ" && _.created_by == EMAIL
              )
              .map((entry) => (
                <BookEntry key={entry.id} entry={entry} user={session?.user} />
              ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
            User recommended Books
          </h2>
          {entries
            ?.filter(
              (_: books) =>
                _.read_status == "HAS_NOT_READ" && _.created_by != EMAIL
            )
            .map((entry) => (
              <BookEntry key={entry.id} entry={entry} user={session?.user} />
            ))}
        </div>
      </div>
      <AddBook session={session} />
    </>
  );
}
