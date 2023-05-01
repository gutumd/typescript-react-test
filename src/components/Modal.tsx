import React from "react";

import { Image, Url } from "../models/models";

import noImage from "../images/no-image-available.jpg";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

interface ModalProps {
  images: Image[];
  title: string;
  description: string;
  urls: Url[];
  id: number;
  onClick: Function;
  isError: Boolean;
  isLoading: Boolean;
}

const Modal = (props: ModalProps) => {
  const { toggleModal } = useActions();
  const { isModal } = useAppSelector((state) => state.marvelApp);

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        !isModal ? "hidden" : ""
      } flex justify-center align-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50`}
    >
      <div className="m-auto relative w-full max-w-5xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-600 min-h-[500px]">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            {props.isError && (
              <p className="text-center text-red-600">
                Something went wrong...
              </p>
            )}
            {props.isLoading && (
              <p className="text-center text-gray-900 dark:text-gray-300 my-2">
                Loading...
              </p>
            )}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {props?.title ? props?.title : "This comic has no title"}
            </h3>
            <button
              onClick={() => toggleModal(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <img
              src={
                props?.images[0]
                  ? `${props?.images[0]?.path}.${props?.images[0]?.extension}`
                  : noImage
              }
              alt={props?.title ? props?.title : "No image available"}
              className="rounded-t h-72 w-72 object-cover"
            />
          </div>
          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {props?.description
                ? props?.description
                : "This comic has no description"}
            </p>
          </div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <p className="my-3">
              <a
                href={props?.urls[0]?.url}
                className="cursor-pointer bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded text-xs font-medium uppercase"
              >
                Read About Comic
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
