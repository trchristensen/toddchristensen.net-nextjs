import React, {
  useState,
  useRef,
  useEffect,
  ReactComponentElement,
  FC,
} from "react";
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
import AsyncSelect from "react-select/async";
import { colors } from "react-select/dist/declarations/src/theme";
import { locale } from "config/locale.config";
import { books, ReadStatus } from ".prisma/client";

function SearchResult({ book }) {
  return (
    <div>
      <div className="w-full flex py-2 border-b">{book.title}</div>
      <div className="w-full flex">{book.author}</div>
    </div>
  );
}

function AutocompleteSearch({ onSelect }) {
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [timer, setTimer] = useState(null);

  const changeDelay = (change) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        console.log(change);
      }, 300)
    );
  };

  // handle input change event
  const handleInputChange = (value) => {
    changeDelay(setValue(value));
  };

  // handle selection
  const handleChange = (value) => {
    console.log("VALUE", value);

    setSelectedValue(value);
    onSelect(value);
  };

  //   load options using API call
  const loadOptions = async (value) => {
    const results = await fetch(`/api/books/api-search?query=${value}`)
      .then((res) => res.json())
      .catch((err) => console.error(err));
    return results;
  };

  return (
    <div className="w-full flex flex-col">
      <AsyncSelect
        classNamePrefix="react-select input"
        placeholder="📕 Start typing to search for a book..."
        className="w-full rounded-md"
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={(e) => `${e.title} by ${e.author}`}
        getOptionValue={(e) => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      {selectedValue && <BookResult book={selectedValue} />}
    </div>
  );
}

interface IBookResult {
  book: books;
}

const BookResult = ({ book }) => (
  <div className="w-full">
    <div className="BookResult__Card flex flex-col gap-y-4 sm:gap-y-0 sm:flex-row gap-4 pt-8">
      {book?.cover && (
        <div className="BookResult__Image-wrapper w-[150px] flex-shrink-0">
          <img src={book.cover} />
        </div>
      )}
      <div className="BookResult__Content flex flex-col y-gap-2">
        <p className="BookResult__Title font-bold text-lg ">
          {book?.title}
        </p>
        <p className="BookResult__Author text-sm">
          {book?.author}
        </p>
        {book?.publish_date && (
          <p className="BookResult__Published text-xs mb-1 mt-3 italic">
            First published: {book?.publish_date[book?.publish_date.length - 1]}
          </p>
        )}
        {book?.subjects && (
          <p className="BookResult__Subjects text-sm line-clamp-4">
            {book?.subjects.join(", ")}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default function AddBook({ session }) {
  const { mutate } = useSWRConfig();
  const [form, setForm] = useState<FormState>({ state: Form.Initial });

  const [bookData, setBookData] = useState<books>();
  const [comment, setComment] = useState<string>();
  const [rating, setRating] = useState<number>(0);
  const [readStatus, setReadStatus] = useState<ReadStatus>("HAS_NOT_READ")

  const onCounterChange = (counterValue) => {
    setRating(counterValue);
  };


  const handleReadBook = (status) => {
    setReadStatus(status)
    console.log('ReadStatus', status)
    if(readStatus !== "HAS_READ") {
      setRating(0)
      setComment("")
    }
  }


  const leaveEntry = async (e) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const res = await fetch("/api/books", {
      body: JSON.stringify({
        ...bookData,
        comment,
        rating,
        read_status: readStatus,
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
      <div className="AddBook shadow rounded bg-secondary-focus text-secondary-content p-6 my-4 w-full">
        <h5 className="text-lg md:text-xl font-bold ">
          {session && session.user.email == locale.EMAIL
            ? "Add a book"
            : "Recommend a book"}
        </h5>

        {!session && (
          <>
            <p className="my-1">You must be logged in to add a book</p>
            {/* // eslint-disable-next-line @next/next/no-html-link-for-pages */}
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
          </>
        )}
        {session?.user && (
          <div className="AddBook__form">
            <form
              className="relative my-4 flex flex-col gap-2"
              onSubmit={leaveEntry}
            >
              <div className="w-full flex">
                <AutocompleteSearch onSelect={(value) => setBookData(value)} />
              </div>

              <div className="flex w-full">
                <div className="form-control flex flex-row gap-6 ">
                  <label className="cursor-pointer label gap-1">
                    <span className="text-secondary-content font-medium label-text">
                      Have read the book
                    </span>
                    <input
                      type="radio"
                      name="opt"
                      checked={readStatus === "HAS_READ"}
                      onChange={() => handleReadBook("HAS_READ")}
                      className="radio radio-accent"
                      value="HAS_READ"
                    />
                  </label>
                  <label className="cursor-pointer label gap-1">
                    <span className="text-secondary-content font-medium label-text">
                      Reading it now
                    </span>
                    <input
                      type="radio"
                      name="opt"
                      checked={readStatus === "READING"}
                      onChange={() => handleReadBook("READING")}
                      className="radio radio-accent"
                      value="READING"
                    />
                  </label>
                  <label className="cursor-pointer label gap-1">
                    <span className="text-secondary-content font-medium label-text">
                      Have not read it yet
                    </span>
                    <input
                      type="radio"
                      name="opt"
                      checked={readStatus === "HAS_NOT_READ"}
                      onChange={() => handleReadBook("HAS_NOT_READ")}
                      className="radio radio-accent"
                      value="HAS_NOT_READ"
                    />
                  </label>
                </div>
              </div>

              {readStatus === "HAS_READ" && (
                <>
                  <div className="flex flex-row justify-between gap-4">
                    <div className="w-auto flex justify-end">
                      <CounterInput
                        onCounterChange={onCounterChange}
                        min={0}
                        max={5}
                        step={0.5}
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label
                      htmlFor="comment"
                      className="label w-full text-sm font-semibold"
                    >
                      Comment
                    </label>
                    <textarea
                      rows={5}
                      cols={5}
                      name="comment"
                      value={comment}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setComment(e.target.value)
                      }
                      aria-label="What did you think of the book?"
                      placeholder="What did you think of the book?"
                      required
                      className="input input-bordered pl-4 pr-32 py-2 mt-1 block w-full rounded-md"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <button
                  className="btn btn-secondary shadow flex items-center justify-center px-4 mt-2 font-medium h-8 rounded w-28"
                  type="submit"
                >
                  {form.state === Form.Loading ? (
                    <LoadingSpinner />
                  ) : (
                    "Add Book"
                  )}
                </button>
              </div>
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
