import React, { useEffect, useState } from "react";
import AboutPage from "@/components/about/AboutPage";
import Footer from "@/components/footer/footer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { API_ROUTES } from "@/utils/apiConfig";
import axios from "axios";
const index = ({ isFeedbackVisible, handleToggleFeedback, conVersion }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ROUTES.about.get);

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div
      onClick={() => {
        isFeedbackVisible ? handleToggleFeedback() : null;
      }}
      style={{
        filter: isFeedbackVisible ? "brightness(0.5)" : " ",
        transition: "all 0.6s ease-in-out",
        height: isFeedbackVisible ? "Calc(100vh - 111px)" : "",
        overflow: isFeedbackVisible ? "hidden" : "",
      }}
    >
      <AboutPage data={data} />
      <Footer conVersion={conVersion} />
    </div>
  );
};

export default index;
