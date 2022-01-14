import React, { useState, useRef } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { signIn, useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from "swr";
import AddBook from "./AddBook.component";
import fetcher from "lib/fetcher";
import { Form, FormState } from "lib/types";
import SuccessMessage from "components/SuccessMessage";
import ErrorMessage from "components/ErrorMessage";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner.component";
import BookEntry from "./BookEntry.component";
import CounterInput from "components/CounterInput/CounterInput.component";
import { book } from ".prisma/client";
import { locale } from "config/locale.config";
const { EMAIL } = locale;

export default function Books({ fallbackData }) {
  const { data: session } = useSession();

  const { data: entries } = useSWR("/api/books", fetcher, {
    fallbackData,
  });

  const currently_reading = entries
    ?.filter(
      (_: book) =>
        _.readStatus == "READING" &&
        _.createdBy.email == "toddchristensen@protonmail.com"
    )
    .map((entry) => (
      <BookEntry key={entry.id} entry={entry} user={session?.user} />
    ));

  const have_read = entries
    ?.filter(
      (_) =>
        _.readStatus == "HAS_READ" &&
        _.createdBy.email == "toddchristensen@protonmail.com"
    )
    .map((entry) => (
      <BookEntry key={entry.id} entry={entry} user={session?.user} />
    ));

  const plan_to_read = entries
    ?.filter(
      (_: book) => _.readStatus == "HAS_NOT_READ" && _.createdBy.email == EMAIL
    )
    .map((entry) => (
      <BookEntry key={entry.id} entry={entry} user={session?.user} />
    ));

  const user_recommended = entries
    ?.filter(
      (_: book) => _.readStatus == "HAS_NOT_READ" && _.createdBy.email != EMAIL
    )
    .map((entry) => (
      <BookEntry key={entry.id} entry={entry} user={session?.user} />
    ));


    
  return (
    <>

      <div className="flex flex-col mb-4 space-y-4 w-full">
        {currently_reading.length !== 0 && (
          <div>
            <h2 className="font-bold text-3xl tracking-tight mb-8 mt-16">
              Currently reading
            </h2>
            {currently_reading}
          </div>
        )}

        {have_read.length !== 0 && (
          <div>
            <h2 className="font-bold text-3xl tracking-tight mb-8 mt-16">
              Books I've read
            </h2>
            <div className="flex flex-col gap-8">{have_read}</div>
          </div>
        )}
        {plan_to_read.length !== 0 && (
          <div>
            <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16">
              Plan on reading
            </h2>
            <div className="flex flex-col gap-4">{plan_to_read}</div>
          </div>
        )}
        {user_recommended.length !== 0 && (
          <div>
            <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16">
              User recommended Books
            </h2>
            {user_recommended}
          </div>
        )}
      </div>
      <AddBook session={session} />
    </>
  );
}
