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
    <div className="BookEntry border-opacity-70 p-4 w-full flex flex-col gap-1 border-solid pb-4">
      <div className="flex flex-col sm:flex-row w-full gap-4">
        <div className="flex flex-col relative">
          <a
            className="w-[100px] shadow-lg glass rounded-lg"
            href={`https://openlibrary.org/${entry.key}`}
            target="_blank"
          >
            {entry.cover_src ? (
              <Image
                className="rounded-lg"
                width={329}
                height={500}
                layout="responsive"
                src={entry.cover_src}
                alt={entry.title + "cover"}
              />
            ) : (
              <div className="w-[100px] h-[152px]"></div>
            )}
          </a>
        </div>

        <div className="flex flex-col">
          <a href={`https://openlibrary.org/${entry.key}`} target="_blank">
            <span className="font-bold text-lg">{entry.title}</span>
          </a>
          <span className="w-full flex flex-row spacing-2 text-sm">
            {" by "}
            <div className="ml-1 flex text-base-content">{entry.author && entry.author}</div>
          </span>
          <div className="flex flex-wrap flex-col sm:flex-row sm:items-end sm:space-x-3">
            <div className="mt-2 text-sm">
              <StarRating rating={entry.rating} />
            </div>
            <span className="hidden sm:flex line text-xs">/</span>
            <div className="spacing-0 mt-2 sm:mt-[-6px]">
              <p className="text-xs leading-none">added {created}</p>
            </div>
            {user && entry.created_by === user.email && (
              <>
                <span className="hidden sm:flex">/</span>
                <button
                  className="text-left text-sm text-accent"
                  onClick={deleteEntry}
                >
                  Delete
                </button>
              </>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-2 gap-y-0 text-sm leading-tight line-clamp-2">
            {entry.subjects && entry.subjects}
          </div>
          <div className="leading-tight mt-2 w-full">
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
      <div className="flex flex-row spacing-1 text-accent">
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
