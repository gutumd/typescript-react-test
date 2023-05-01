import React, { useState } from "react";

import {
  useGetComicsQuery,
  useSearchComicsQuery,
  useLazyGetSingleComicQuery,
} from "../store/marvel/marvel.api";

import { useDebounce } from "../hooks/debounce";

import Card from "../components/Card";
import Navigation from "../components/Navigation";

import { Comic } from "../models/models";
import Modal from "../components/Modal";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const debounced = useDebounce(search);
  const {
    isLoading,
    isError,
    data: searchedComics,
  } = useSearchComicsQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const { data: comics } = useGetComicsQuery({
    skip: debounced.length > 0,
  });

  const [
    fetchComic,
    { isLoading: isComicLoading, isError: isComicError, data: comic },
  ] = useLazyGetSingleComicQuery();

  const { toggleModal } = useActions();
  const { isModal, view, theme } = useAppSelector((state) => state.marvelApp);

  const clickHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    comicId: number
  ) => {
    event.preventDefault();
    fetchComic(comicId);
    toggleModal(true);
  };

  return (
    <div className="">
      <Navigation />
      <div
        className={`${
          theme === "dark" ? "dark:bg-gray-900" : ""
        } bg-gray-100 min-h-[1500px] w-full flex items-center flex-col mx-auto pt-10`}
      >
        {isError && (
          <p className="text-center text-red-600">Something went wrong...</p>
        )}

        <div className="position-relative w-[65%]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 w-full h-[42px] mb2"
            placeholder="Search for comics title..."
          />
        </div>

        {isLoading && (
          <p
            className={`${
              theme === "dark" ? "dark:text-gray-300" : ""
            } text-center text-gray-900 my-2`}
          >
            Loading...
          </p>
        )}

        <section
          className={`${
            theme === "dark" ? "dark:bg-gray-900" : ""
          } bg-gray-100 py-10 px-12 my-5`}
        >
          <div
            className={`
            ${
              view === "grid"
                ? "grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : ""
            }
          `}
          >
            {debounced &&
              searchedComics?.map((item: Comic, index: number) => {
                const { images, title, description, urls, id } = item;
                return (
                  <Card
                    images={images}
                    title={title}
                    description={description}
                    urls={urls}
                    id={id}
                    onClick={clickHandler}
                    key={index}
                  />
                );
              })}
            {!debounced &&
              comics?.map((item: Comic, index: number) => {
                const { images, title, description, urls, id } = item;
                return (
                  <Card
                    images={images}
                    title={title}
                    description={description}
                    urls={urls}
                    id={id}
                    onClick={clickHandler}
                    key={index}
                  />
                );
              })}
          </div>
        </section>
      </div>

      {comic && isModal && (
        <Modal
          images={comic[0].images}
          title={comic[0].title}
          description={comic[0].description}
          urls={comic[0].urls}
          id={comic[0].id}
          onClick={clickHandler}
          isError={isComicLoading}
          isLoading={isComicError}
        />
      )}
    </div>
  );
};

export default Home;
