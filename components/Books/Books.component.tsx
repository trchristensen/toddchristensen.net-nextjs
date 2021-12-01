import React, { useState, useRef } from "react";
import Image from 'next/image'
import { format } from "date-fns";
import { signIn, useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from "swr";

import fetcher from "lib/fetcher";
import { Form, FormState } from "lib/types";
// import SuccessMessage from 'components/SuccessMessage';
// import ErrorMessage from 'components/ErrorMessage';
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner.component";

import {
  TiStarOutline,
  TiStarFullOutline,
  TiStarHalfOutline,
} from "react-icons/ti";

export interface StarRatingProps {
  rating: number;
}

function StarRating(props: StarRatingProps) {
  const whole = Math.floor(props.rating);
  const rounded = Math.round(props.rating / 0.5) * 0.5;
  const halfStar = props.rating % 1;
  const empty = 5 - Math.ceil(props.rating);

  const arr = [...Array(whole)];
  const emptyArr = [...Array(empty)];

  return (
    <>
      <div className="flex flex-row spacing-1">
        {arr.map((star, idx) => (
          <span key={idx}>
            <TiStarFullOutline />
          </span>
        ))}
        {halfStar ? <TiStarHalfOutline /> : null}
        {emptyArr.map((star, idx) => (
          <span key={idx}>
            <TiStarOutline />
          </span>
        ))}
      </div>
    </>
  );
}

function BookEntry({ entry, user }) {
  const { mutate } = useSWRConfig();

  const deleteEntry = async (e) => {
    e.preventDefault();

    await fetch(`/api/books/${entry.id}`, {
      method: "DELETE",
    });

    mutate("/api/books");
  };



  let created = format(new Date(entry.updated_at), "d MMM yyyy");

  return (
    <div className="flex flex-col gap-1 border-b border-solid border-gray-200 dark:border-gray-800 pb-2">
      <div className="flex flex-row w-full gap-4">
        <div className="flex flex-col">
          <a className="w-[100px]" href={entry.key} target="_blank">
            {entry.cover_src ? (
              <Image
                className="shadow-lg rounded-sm"
                width={329}
                height={500}
                layout="responsive"
                src={entry.cover_src}
                alt={entry.title + "cover"}
              />
            ) : (
              <div className="shadow-lg w-[70px] h-[100px] border rounded-sm bg-gray-200 dark:bg-gray-800"></div>
            )}
          </a>
        </div>
        <div className="flex flex-col">
          <a href={entry.key} target="_blank">
            <span className="font-bold text-lg text-gray-600 dark:text-gray-400">
              {entry.title}
            </span>
          </a>
          <span className="w-full flex flex-row spacing-2 text-sm text-gray-600 dark:text-gray-400">
            {" by "}
            <div className="ml-1 flex">
              {entry.author &&
                entry.author
                  .slice(2, entry.author.length - 2)
                  .split(`","`)
                  .map((author, idx) => <span key={idx} className="mr-2">{author}</span>)}
            </div>
          </span>
          <div className="flex items-end space-x-3 text-gray-400 dark:text-gray-600">
            <p className="mt-2 text-sm text-gray-500">
              <StarRating rating={entry.rating} />
            </p>
            <span className="text-gray-200 dark:text-gray-800 line text-xs">
              /
            </span>
            <div className="spacing-0 mt-[-6px]">
              <p className="text-xs text-gray-400 dark:text-gray-600 leading-none">
                added {created}
              </p>
            </div>
            {user && entry.created_by === user.name && (
              <>
                <span className="text-gray-200 dark:text-gray-800">/</span>
                <button
                  className="text-sm text-red-600 dark:text-red-400"
                  onClick={deleteEntry}
                >
                  Delete
                </button>
              </>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-2 gap-y-0 text-gray-300 dark:text-gray-700 text-xs">
            {
              
              typeof entry.subjects
              }
          </div>
          <div className="mt-2 flex flex-wrap gap-2 gap-y-0 text-gray-300 dark:text-gray-700 text-xs">
            {entry.subjects &&
              entry.subjects
                .slice(2, entry.subjects.length - 2)
                .split(`","`)
                .map((subject, idx) => <span key={idx} className="">{subject}</span>)}
          </div>
          <div className="text-gray-600 leading-tight mt-2 dark:text-gray-400 w-full">
            {entry.comment && entry.comment}
            {entry.comment && entry.comment.length > 400 && "..."}
          </div>
        </div>
      </div>
      {/* <span className="text-black dark:text-white">{JSON.stringify(entry)}</span> */}
      {/* <div className="prose dark:prose-dark w-full">
        {entry.description && entry.description}
        {entry.description && entry.description.length > 400 && "..."}
      </div> */}
    </div>
  );
}

export default function Books({ fallbackData }) {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const [form, setForm] = useState<FormState>({ state: Form.Initial });

  const { data: entries } = useSWR("/api/books", fetcher, {
    fallbackData,
  });

  const [ISBN, setISBN] = useState<string>();
  const [comment, setComment] = useState<string>();
  // const [rating, setRating] = useState<number>(0);

  const clearForm = () => {
    setISBN("");
    setComment('');
    // setRating(0);
  };

  const leaveEntry = async (e) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const res = await fetch("/api/books", {
      body: JSON.stringify({
        isbn: ISBN,
        comment,
        // rating
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

    mutate("/api/books");
    setForm({
      state: Form.Success,
      message: `Book has been added to the list!`,
    });
  };

  return (
    <>
      <div className="mb-4 space-y-4">
        {entries?.map((entry) => (
          <BookEntry key={entry.id} entry={entry} user={session?.user} />
        ))}
      </div>
      <div className="border border-blue-200 rounded p-6 my-4 w-full dark:border-gray-800 bg-blue-50 dark:bg-blue-opaque">
        <h5 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
          Add a book
        </h5>
        <p className="my-1 text-gray-800 dark:text-gray-200">
          You must be me, in order to add a new book.
        </p>
        {!session && (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a
            href="/api/auth/signin/github"
            className="flex items-center justify-center my-4 font-bold h-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
            onClick={(e) => {
              e.preventDefault();
              signIn("github");
            }}
          >
            Login
          </a>
        )}
        {session?.user && (
          <form
            className="relative my-4 text-gray-900 dark:text-gray-100 flex flex-col gap-2"
            onSubmit={leaveEntry}
          >
            <input
              value={ISBN}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setISBN(e.target.value)
              }
              aria-label="Book ISBN"
              placeholder="Book ISBN..."
              required
              className="pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <input
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setComment(e.target.value)
              }
              aria-label="Book description"
              placeholder="Book description..."
              required
              className="pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            {/* <div className="flex flex-row items-center justify-start">
              <label htmlFor="rating" className="mr-4">Rating</label>
              <div className="w-auto">
              <input
                value={rating}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRating(parseFloat(e.target.value))
                }
                type="number"
                aria-label="Book rating"
                placeholder="Book rating..."
                required
                className="w-full pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              </div>
            </div> */}

            <button
              className="flex items-center justify-center px-4 pt-1 font-medium h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
              type="submit"
            >
              {form.state === Form.Loading ? <LoadingSpinner /> : "Add Book"}
            </button>
          </form>
        )}
        {form.state === Form.Error
          ? // <ErrorMessage>{form.message}</ErrorMessage>
            console.log("error")
          : form.state === Form.Success
          ? console.log("success")
          : // <SuccessMessage>{form.message}</SuccessMessage>
            null}
      </div>
    </>
  );
}
