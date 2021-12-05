import { useState, useRef } from "react";
import { format } from "date-fns";
import { signIn, useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from "swr";

import fetcher from "lib/fetcher";
import { Form, FormState } from "lib/types";
import SuccessMessage from "components/SuccessMessage";
import ErrorMessage from "components/ErrorMessage";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner.component";

function GuestbookEntry({ entry, user }) {
  const { mutate } = useSWRConfig();
  const deleteEntry = async (e) => {
    e.preventDefault();

    await fetch(`/api/guestbook/${entry.id}`, {
      method: "DELETE",
    });

    mutate("/api/guestbook");
  };

  return (
    <div className="GuestbookEntry flex flex-row gap-4">
      {entry.avatar_src && (
        <div className="avatar">
          <div className="mb-8 rounded shadow w-14 h-14">
            <img src={entry.avatar_src} />
          </div>
        </div>
      )}
      <div className="GuestbookEntry__card rounded shadow card overflow-visible bg-base-200 p-2 sm:p-4 flex flex-col space-y-2 w-full before:content-[''] after:content-[''] before:bg-base-200 after:bg-base-200 before:w-[15px] before:h-[15px] before:absolute before:left-[-7px] before:top-[25%] before:transform before:rotate-45 before:rounded before:-z-1 before:shadow after:w-[15px] after:h-[15px] after:absolute after:left-[-7px] after:top-[25%] after:transform after:rotate-45 after:rounded">
        <div className="w-full text-medium">{entry.body}</div>
        <div className="flex items-center space-x-3">
          <p className="text-sm text-base-content">{entry.created_by}</p>
          <span className="opacity-40">/</span>
          <p className="text-sm text-base-content">
            {format(new Date(entry.updated_at), "d MMM yyyy 'at' h:mm bb")}
          </p>
          {user && entry.created_by === user.name && (
            <>
              <span className="opacity-40">/</span>
              <button className="text-sm text-accent" onClick={deleteEntry}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Guestbook({ fallbackData }) {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const inputEl = useRef(null);
  const { data: entries } = useSWR("/api/guestbook", fetcher, {
    fallbackData,
  });

  const leaveEntry = async (e) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const res = await fetch("/api/guestbook", {
      body: JSON.stringify({
        body: inputEl.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: Form.Error,
        message: error,
      });
      return;
    }

    inputEl.current.value = "";
    mutate("/api/guestbook");
    setForm({
      state: Form.Success,
      message: `Hooray! Thanks for signing my Guestbook.`,
    });
  };

  return (
    <>
      <div className="shadow rounded bg-secondary-focus text-secondary-content p-6 my-4 w-full">
        <h5 className="text-lg md:text-xl font-bold">Sign the Guestbook</h5>
        <p className="my-1">Share a message for a future visitor of my site.</p>
        {!session && (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a
            href="/api/auth/signin/github"
            className="flex items-center justify-center my-4 font-bold h-8 rounded w-28"
            onClick={(e) => {
              e.preventDefault();
              signIn("github");
            }}
          >
            Login
          </a>
        )}
        {session?.user && (
          <form className="relative my-4" onSubmit={leaveEntry}>
            <input
              ref={inputEl}
              aria-label="Your message"
              placeholder="Your message..."
              required
              className="input input-bordered pl-4 pr-32 py-2 mt-1 block w-full rounded-md"
            />
            <button
              style={{ minHeight: 40 }}
              className="btn btn-secondary shadow flex items-center justify-center absolute right-1 top-1 px-4 pt-1 font-medium h-8 rounded w-28"
              type="submit"
            >
              {form.state === Form.Loading ? <LoadingSpinner /> : "Sign"}
            </button>
          </form>
        )}
        {form.state === Form.Error ? (
            <ErrorMessage>{form.message}</ErrorMessage>
        ) : form.state === Form.Success ? (
            <SuccessMessage>{form.message}</SuccessMessage>
        ) : (
          <p className="text-sm">
            Your information is only used to display your name and reply by
            email.
          </p>
        )}
      </div>
      <div className="mt-4 space-y-4 w-full">
        {entries?.map((entry) => (
          <GuestbookEntry key={entry.id} entry={entry} user={session?.user} />
        ))}
      </div>
    </>
  );
}
