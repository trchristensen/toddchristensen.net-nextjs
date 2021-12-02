import React, { useState, useRef } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "lib/fetcher";
import { Form, FormState } from "lib/types";
// import SuccessMessage from 'components/SuccessMessage';
// import ErrorMessage from 'components/ErrorMessage';
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner.component";
import BookEntry from "./BookEntry.component";
import CounterInput from "components/CounterInput/CounterInput.component";

export default function AddBook({ session }) {
  const { mutate } = useSWRConfig();
  const [form, setForm] = useState<FormState>({ state: Form.Initial });

  const [ISBN, setISBN] = useState<string>();
  const [comment, setComment] = useState<string>();
  const [rating, setRating] = useState<number>(0);

  const onCounterChange = (counterValue) => {
    setRating(counterValue);
  };

  const clearForm = () => {
    setISBN("");
    setComment("");
    setRating(0);
  };

  const leaveEntry = async (e) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const res = await fetch("/api/books", {
      body: JSON.stringify({
        isbn: ISBN,
        comment,
        rating,
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
      <div className="AddBook border border-blue-200 rounded p-6 my-4 w-full dark:border-gray-800 bg-blue-50 dark:bg-blue-opaque">
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
          <div className="AddBook__form">
            <form
              className="relative my-4 text-gray-900 dark:text-gray-100 flex flex-col gap-2"
              onSubmit={leaveEntry}
            >
              <div className="flex flex-row justify-between gap-4">
                <div className="w-full flex items-end">
                  <input
                    value={ISBN}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setISBN(e.target.value)
                    }
                    aria-label="Book ISBN"
                    placeholder="Book ISBN..."
                    required
                    className=" w-full pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="w-auto flex justify-end">
                  <CounterInput
                    onCounterChange={onCounterChange}
                    min={0}
                    max={5}
                    step={0.5}
                  />
                </div>
              </div>
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
              <button
                className="flex items-center justify-center px-4 pt-1 font-medium h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
                type="submit"
              >
                {form.state === Form.Loading ? <LoadingSpinner /> : "Add Book"}
              </button>
            </form>
          </div>
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
