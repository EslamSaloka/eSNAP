import React, { useEffect, useState } from "react";
import classes from "./news.module.css";

import SingleCard from "./SingleCard";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
const NewsMain = ({ dataNews }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [leftRight, setLeftRight] = useState("left");
  const [filterData, setFilterData] = useState([]);
  const [news, setNewsData] = useState(dataNews.data);
  const router = useRouter();

  const itemsPerPage = 15;
  console.log(news);
  useEffect(() => {
    setFilterData(
      news.filter((item, index) => {
        return (
          (index >= currentPage * itemsPerPage) &
          (index < (currentPage + 1) * itemsPerPage)
        );
      })
    );
  }, [currentPage, dataNews]);

  return (
    <div className={classes.newsMain}>
      <div className={classes.newsSection}>
        <div className={classes.choosen}>
          <p>
            <span
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </span>
            <Image
              src="/assets/svg/Chevron.svg"
              width={16}
              height={16}
              alt="chevron"
              layout="responsive"
            />
          </p>
          <h1>News</h1>
        </div>
        <div className={classes.newsCardMain2}>
          {filterData &&
            filterData.map((nws, index) => (
              <SingleCard key={nws.id} {...nws} leftRight={leftRight} />
            ))}
        </div>
        <div className={classes.paginationContainer}>
          {/* Render pagination links with updated styles */}
          <ReactPaginate
            containerClassName={classes.pagination}
            pageClassName={classes.pageItem}
            activeClassName={classes.active}
            onPageChange={(event) => setCurrentPage(event.selected)}
            pageCount={Math.ceil(news.length / itemsPerPage)}
            breakLabel="..."
            previousLabel={
              <div className={classes.paginationTerm}>
                <Image
                  src="/assets/svg/chevron-right.svg"
                  width={12}
                  height={12}
                  alt="expand-more"
                  style={{ transform: "rotate(180deg)" }}
                />
              </div>
            }
            nextLabel={
              <div className={classes.paginationTerm}>
                <Image
                  src="/assets/svg/chevron-right.svg"
                  width={12}
                  height={12}
                  alt="expand-more"
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NewsMain;
