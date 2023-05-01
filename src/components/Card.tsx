import React from "react";

import { Image, Url } from "../models/models";

import noImage from "../images/no-image-available.jpg";
import { useAppSelector } from "../hooks/redux";

interface CardProps {
  images: Image[];
  title: string;
  description: string;
  urls: Url[];
  id: number;
  onClick: Function;
}

const Card = (props: CardProps) => {
  const { view, theme } = useAppSelector((state) => state.marvelApp);

  return (
    <>
      {view === "grid" ? (
        <div
          onClick={(e) => props.onClick(e, props.id)}
          className={`${
            theme === "dark" ? "dark:bg-gray-800 dark:shadow-gray-900" : ""
          } rounded-lg ring-1 ring-slate-900/5 my-8 shadow-lg shadow-gray-200 bg-white duration-300 hover:-translate-y-1`}
        >
          <div className="cursor-pointer">
            <figure>
              <img
                src={
                  props?.images[0]
                    ? `${props?.images[0]?.path}.${props?.images[0]?.extension}`
                    : noImage
                }
                alt={props?.title ? props?.title : "No image available"}
                className="rounded-t h-72 w-full object-cover"
              />

              <figcaption className="p-4">
                <p
                  className={`${
                    theme === "dark" ? "dark:text-gray-300" : ""
                  } text-lg mb-4 font-bold leading-relaxed text-gray-800`}
                >
                  {props?.title ? props?.title : "This comic has no title"}
                </p>

                <small
                  className={`${
                    theme === "dark" ? "dark:text-gray-400" : ""
                  } leading-5 text-gray-500`}
                >
                  {props?.description
                    ? props?.description
                    : "This comic has no description"}
                </small>

                <p className="my-3">
                  <a
                    href={props?.urls[0]?.url}
                    className={`${
                      theme === "dark" ? "" : ""
                    } cursor-pointer bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded text-xs font-medium uppercase`}
                  >
                    Read About Comic
                  </a>
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      ) : (
        <div
          onClick={(e) => props.onClick(e, props.id)}
          className="border py-3 px-5 cursor-pointer rounded mb-2 hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <h2
            className={`${
              theme === "dark" ? "dark:text-gray-300" : ""
            } text-lg font-bold`}
          >
            {props?.title ? props?.title : "This comic has no title"}
          </h2>
          <p
            className={`${
              theme === "dark" ? "dark:text-gray-300" : ""
            } text-sm`}
          >
            {props?.description
              ? props?.description
              : "This comic has no description"}
          </p>
          <p className="my-3">
            <a
              href={props?.urls[0]?.url}
              className={`${
                theme === "dark" ? "" : ""
              } cursor-pointer bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded text-xs font-medium uppercase`}
            >
              Read About Comic
            </a>
          </p>
        </div>
      )}
    </>
  );
};

export default Card;
