import React, { useState, useRef } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { signIn, useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "lib/fetcher";
import { Form, FormState } from "lib/types";
// import SuccessMessage from 'components/SuccessMessage';
// import ErrorMessage from 'components/ErrorMessage';

export default function BookEntry({ entry, user }) {
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
    <div className="BookEntry w-full flex flex-col gap-1 border-b border-solid border-gray-200 dark:border-gray-800 pb-4">
      <div className="flex flex-col sm:flex-row w-full gap-4">
        <div className="flex flex-col relative">
          <a
            className="w-[100px]"
            href={`https://openlibrary.org/${entry.key}`}
            target="_blank"
          >
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
              <div className="shadow-lg w-[100px] h-[152px] border dark:border-gray-700 rounded-sm bg-gray-200 dark:bg-gray-900"></div>
            )}
          </a>
        </div>

        <div className="flex flex-col">
          <a href={`https://openlibrary.org/${entry.key}`} target="_blank">
            <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
              {entry.title}
            </span>
          </a>
          <span className="w-full flex flex-row spacing-2 text-sm text-gray-600 dark:text-gray-400">
            {" by "}
            <div className="ml-1 flex">{entry.author && entry.author}</div>
          </span>
          <div className="flex flex-wrap flex-col sm:flex-row sm:items-end sm:space-x-3 text-gray-400 dark:text-gray-600">
            <p className="mt-2 text-sm text-gray-500">
              <StarRating rating={entry.rating} />
            </p>
            <span className="hidden sm:flex text-gray-200 dark:text-gray-800 line text-xs">
              /
            </span>
            <div className="spacing-0 mt-2 sm:mt-[-6px]">
              <p className="text-xs text-gray-500 leading-none">
                added {created}
              </p>
            </div>
            {user && entry.created_by === user.email && (
              <>
                <span className="hidden sm:flex text-gray-200 dark:text-gray-800">
                  /
                </span>
                <button
                  className="text-left text-sm text-red-600 dark:text-red-400"
                  onClick={deleteEntry}
                >
                  Delete
                </button>
              </>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-2 gap-y-0 text-gray-500 text-sm leading-tight line-clamp-2">
            {entry.subjects && entry.subjects}
          </div>
          <div className="text-gray-500 leading-tight mt-2 w-full">
            {entry.comment && entry.comment}
            {entry.comment && entry.comment.length > 400 && "..."}
          </div>
        </div>
      </div>
    </div>
  );
}

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
