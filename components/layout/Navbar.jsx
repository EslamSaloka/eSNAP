import React, { useState } from "react";
import classes from "./layout.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import DialogModal from "../ui/DialogModal";
import FeedBack from "./FeedBack";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Hidden, IconButton, Menu, MenuItem } from "@mui/material";
import { useFontSize } from "@/store/FontSizeContext";
const Navbar = ({
  handleSubmitFeedback,
  isFeedbackVisible,
  handleToggleFeedback,
  conVersion,
  rtl,
  handleRtl,
  handleAccessibility,
  handleCaptilizling,
}) => {
  const { fontSizeGeneral, increaseFontSize, decreaseFontSize, fontSizeSmall } =
    useFontSize();

  // creating function menu hamburger
  const [addClass, setAddClass] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };
  //setting up state and functions for feedback dialog
  const [openFeedback, setOpenFeedback] = useState(false);
  const handleClickOpenFeedback = () => {
    document.body.style.overflow = "hidden";
    setOpenFeedback(true);
  };
  const handleCloseFeedback = () => {
    document.body.style.overflow = "scroll";
    setOpenFeedback(false);
  };
  const mobileMenu = () => {
    const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("active");
    setAddClass(!addClass);
  };
  const router = useRouter();
  const path = router.pathname.split("/").pop();

  const aboutPath = path.length > 2;
  const likeAndOpenLink = (link) => {
    // Perform the action to simulate a "like" (replace with your actual like functionality)

    // Open a new tab or window with the specified URL
    window.open(link, "_blank");
  };
  // Function to format the current date in the desired Arabic format
  function formatArabicDate() {
    const now = new Date();

    // Options for formatting the date in Arabic
    const options = {
      weekday: "long", // Full day name (الاحد)
      day: "numeric", // Day of the month (٢٧)
      month: "long", // Full month name (مارس)
      year: "numeric", // Year (٢٠٢٢)
      era: "short", // Era (٢٣ شعبان ١٤٤٣)
      hour: "2-digit", // Hour (٠٧)
      minute: "2-digit", // Minute (١٣)
    };

    // Format the date and return the result
    return new Intl.DateTimeFormat(
      !rtl ? "us" : "ar-SA-u-nu-latn",
      options
    ).format(now);
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(false);
  };
  return (
    <>
      <div
        className={classes.navBottom}
        style={{ direction: !rtl ? "rtl" : "initial" }}
      >
        <div className={classes.langAcess}>
          <div
            className={`${classes.languageRtl} ${
              !rtl ? classes.langArabic : ""
            }`}
            onClick={handleRtl}
            style={{ borderLeft: !rtl ? "1px solid #fff" : "none" }}
          >
            <Image
              src="/assets/svg/icon-language.svg"
              width={30}
              height={30}
              alt="lang"
            />
            <p
              style={{
                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                fontSize: `${fontSizeSmall}px`,
              }}
            >
              {t("lang")}
            </p>
          </div>
          <Image
            onClick={handleAccessibility}
            src="/assets/svg/accessability.svg"
            width={20}
            height={20}
            alt="accessability"
            style={{ cursor: "pointer" }}
          />
          <div className={classes.fonts}>
            <p onClick={increaseFontSize}>A+</p>
            <p onClick={handleCaptilizling}>AA</p>
            <p onClick={decreaseFontSize}>A-</p>
          </div>
        </div>
        <div
          className={classes.contactDate}
          style={{ alignItems: rtl ? "flex-start" : "flex-end" }}
        >
          <div
            className={classes.emailSec}
            style={{ fontSize: `${15 + fontSizeGeneral}px` }}
          >
            <Link
              href={`mailto:${conVersion?.globalSettings?.email}?subject=Inquire%20About%20something`}
            >
              <p>{conVersion.globalSettings?.email}</p>
            </Link>
            <Image
              src="/assets/svg/mail.svg"
              width={15}
              height={15}
              alt="mail"
            />
          </div>
          <div
            className={classes.phoneSec}
            style={{ fontSize: `${15 + fontSizeGeneral}px` }}
          >
            <Link href={`tel:+${conVersion?.globalSettings?.phone}`}>
              <p>{conVersion?.globalSettings?.phone}</p>
            </Link>
            <Image
              src="/assets/svg/phone.svg"
              width={15}
              height={15}
              alt="phone"
            />
            <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
              {t("phone")}
            </p>
          </div>
          <div
            className={classes.dateSaudi}
            style={{ fontSize: `${15 + fontSizeGeneral}px` }}
          >
            <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
              {formatArabicDate()}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${classes.navModified} ${
          aboutPath ? classes.aboutModified : null
        }`}
        onClick={() => {
          isFeedbackVisible ? handleToggleFeedback() : null;
        }}
        style={{
          filter: isFeedbackVisible ? "brightness(0.5)" : "brightness(1)",
          transition: "all 0.6s ease-in-out",
          direction: rtl ? "rtl" : "initial",
        }}
        id="home"
      >
        {/* Responsive Menu */}
        <Hidden mdUp>
          <div style={{ position: "absolute", bottom: "0", zIndex: "99" }}>
            <IconButton onClick={handleMenuClick}>
              <Image
                src="/assets/imges/more.png"
                width={25}
                height={25}
                alt="more"
                style={{ transform: "rotate(90deg)" }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleRtl}>
                <div
                  className={`${classes.languageRtl} ${
                    rtl ? classes.langArabic : ""
                  }`}
                >
                  <p>{t("lang")}</p>
                </div>
              </MenuItem>
              <MenuItem onClick={handleAccessibility}>Accessibility</MenuItem>
              <MenuItem onClick={handleCaptilizling}>Captilizling</MenuItem>
            </Menu>
          </div>
        </Hidden>
        <nav className={`${classes.navMain}  `}>
          <div className={classes.logo}>
            <Image
              src={"/assets/svg/whiteLogo.svg"}
              width={140}
              height={47}
              alt="logo"
              onClick={() => {
                router.push("/");
              }}
            />
          </div>
          <div
            className={`${classes.navSections} ${
              addClass ? classes.navContentHam : null
            }`}
          >
            <ul
              className={`${classes.section} `}
              style={{ fontSize: `${17 + fontSizeGeneral}px` }}
            >
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/");
                }}
                className={`${path.length ? null : classes.activeHome}`}
                style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
              >
                {t("home-route")}
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/about");
                }}
                className={`${path === "about" ? classes.active : null}`}
                style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
              >
                {t("about")}
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/download");
                }}
                className={`${path === "download" ? classes.active : null}`}
                style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
              >
                {t("download")}
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/news");
                }}
                className={`${path === "news" ? classes.active : null}`}
                style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
              >
                {t("news")}
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/faq");
                }}
                className={`${path === "faq" ? classes.active : null}`}
                style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
              >
                {t("faq")}
              </li>
            </ul>
          </div>

          <div
            className={`${classes.feedBackSection} ${
              addClass ? classes.navAuthHam : null
            }`}
          >
            <div className={classes.vision}>
              <Image
                src={"/assets/svg/vision-2030.svg"}
                width={98}
                height={67}
                alt="vision-2030"
              />
            </div>
            <div
              className={classes.btnFeedback}
              onClick={() => {
                mobileMenu();
                handleClickOpenFeedback();
              }}
            >
              <Image
                src="/assets/svg/review1.svg"
                width={23}
                height={23}
                alt="review"
              />
              <p
                style={{
                  fontSize: rtl ? "18px" : "none",
                  fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                }}
              >
                {t("feedback")}
              </p>
            </div>
          </div>
          <div className="hamburger" onClick={mobileMenu}>
            <span className={`bar`}></span>
            <span className={`bar`}></span>
            <span className={`bar`}></span>
          </div>
        </nav>
      </div>
      <DialogModal
        open={open}
        handleClose={handleClose}
        openLink={likeAndOpenLink}
      />
      <FeedBack
        handleSubmitFeedback={handleSubmitFeedback}
        open={openFeedback}
        handleClose={handleCloseFeedback}
        rtl={rtl}
      />
    </>
  );
};

export default Navbar;
