import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "./SingleNews.module.css";
import Image from "next/image";
import parse from "html-react-parser";
import { API_ROUTES } from "@/utils/apiConfig";
import SingleCard from "../news/SingleCard";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../ui/LoadingSpinner";
import Subscribe from "../ui/Subscribe";
import { useFontSize } from "@/store/FontSizeContext";
import { useTranslation } from "react-i18next";
const SingleNews = ({ id, rtl }) => {
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [relateData, setRelatedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const date = new Date(data.createdAt);
  const notify = () => toast("The link has been copied.", { icon: "👏" });
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const src = data.imageUrl ? data.imageUrl : "/assets/imges/img3.jpg";
  const humanReadableDate = `${year}-${month}-${day}`;
  const router = useRouter();
  const { fontSizeGeneral } = useFontSize();
  //Fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_ROUTES.blogs.get}/${id}`);

        setRelatedData(response.data.returnData.relatedNews);
        setData(response.data.returnData.news);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  if (loading) {
    return <LoadingSpinner />;
  }
  //handling share link button
  const handleClickShare = () => {
    console.log("Hello");
    notify();
    navigator.clipboard.writeText("https://e-snap.vercel.app" + router.asPath);
  };
  return (
    <>
      <div className={classes.newsMain} style={{ direction: rtl ? "rtl" : "" }}>
        <div
          className={classes.choosen}
          style={{ fontSize: `${14 + fontSizeGeneral}px` }}
        >
          <p>
            <span
              onClick={() => {
                router.push("/");
              }}
              style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
            >
              {t("home-route")}
            </span>
            <Image
              src="/assets/svg/Chevron.svg"
              width={16}
              height={16}
              style={{ transform: rtl ? "rotate(180deg)" : "" }}
              alt="chev"
            />
            <span
              onClick={() => {
                router.push("/news");
              }}
              style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
            >
              {t("news")}
            </span>
            <Image
              src="/assets/svg/Chevron.svg"
              width={16}
              height={16}
              style={{ transform: rtl ? "rotate(180deg)" : "" }}
              alt="chev"
            />
          </p>
          <h1
            style={{
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              fontSize: `${24 + fontSizeGeneral}px`,
            }}
          >
            {rtl ? data.title : data?.titleEN}
          </h1>
        </div>
        <div className={classes.newsDetails}>
          <img
            src={src}
            width={500}
            height={500}
            alt={data.title.slice(0, 20)}
          />
          <div className={classes.newsContent}>
            <div className={classes.contentHead}>
              <p
                style={{
                  fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                  fontSize: `${24 + fontSizeGeneral}px`,
                }}
              >
                {rtl ? data?.title : data.titleEN}
              </p>
            </div>
            <div className={classes.contentBody}>
              <div className={classes.contentDate}>
                <Image
                  src="/assets/svg/calender.svg"
                  width={24}
                  height={24}
                  alt="calender"
                />
                <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                  {humanReadableDate}
                </p>
              </div>
              <p
                style={{
                  fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                  fontSize: `${20 + fontSizeGeneral}px`,
                }}
              >
                {parse(rtl ? data.description : data?.descriptionEN)}
              </p>
              <button className={classes.newsShare} onClick={handleClickShare}>
                <Image
                  src="/assets/svg/share.svg"
                  width={20}
                  height={20}
                  alt="share"
                />
                <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
                  {" "}
                  {t("copy-link")}
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className={classes.articleRelated}>
          <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
            <span style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
              {rtl ? t("articles") : t("related")}
            </span>{" "}
            {rtl ? t("related") : t("articles")}
          </p>
          <div className={classes.newsCardMain2}>
            {relateData.map((nws, index) => (
              <SingleCard
                id={nws.id}
                rtl={rtl}
                key={nws.id}
                title={nws.title}
                description={nws.description}
                titleEN={nws.titleEN}
                descriptionEN={nws.descriptionEN}
                createdAt={nws.createdAt}
                imageUrl={nws.imageUrl}
              />
            ))}
          </div>
        </div>
        <Toaster />
      </div>
      <Subscribe rtl={rtl} />
    </>
  );
};

export default SingleNews;
