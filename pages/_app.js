import "@/styles/globals.css";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios"; 
import { API_ROUTES } from "@/utils/apiConfig";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS
import WelcomeDialog from "@/components/ui/WelcomeToGaca";
import { FontSizeProvider } from "@/store/FontSizeContext";
import { appWithTranslation } from "next-i18next"; 
import "@/i18n/config";
import { useTranslation } from "next-i18next";
 function App({ Component, pageProps }) {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [data, setData] = useState({}); 
  const [rtl, setRtl] = useState(false); 
  const [accessiblity, setAccessiblity] = useState(false); 
  const [captilize, setCaptilize] = useState(false); 
  
  const {i18n} = useTranslation();
  //handling language rtl i18l localization
  const handleRtl = ()=>{ 
      if(rtl){
         i18n.changeLanguage('en');
      }
      else{
         i18n.changeLanguage('ar');
      }
      setRtl(!rtl); 
  }
  // Handling the accessiblity for all people
  const handleAccessibility = ()=>{
     setAccessiblity(!accessiblity);
  }
  const handleToggleFeedback = () => {
    setIsFeedbackVisible(!isFeedbackVisible);
  };
  // handling captlizing button
  const handleCaptilizling = ()=>{
     setCaptilize(!captilize)
  }
  useEffect(() => {
    AOS.init(); // Initialize AOS
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ROUTES.settings.get); 
        
        setData(response.data.returnData); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  //Welcoming page 
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);

  const handleWelcomeDialogClose = () => {
    setShowWelcomeDialog(false);
  };
    // Apply custom font family based on selected language
  const fontStyles = rtl ? `
  font-family: "DINNext-Arabic-meduim", sans-serif;
` : '';

  return (
     <> 
       <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Cairo:wght@400;500;700&family=Fira+Code:wght@300;400;500;600;700&family=Montserrat:wght@100;200;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>GACA</title>
      </Head>
       <div style={{ filter: accessiblity?   "grayscale(100%)" : "", textTransform: captilize? "uppercase" : "",  }}>
      {showWelcomeDialog && <WelcomeDialog onClose={handleWelcomeDialogClose} videoUrl={data?.globalSettings?.globalVideo}  />}
       <FontSizeProvider>
      <Layout
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
        conVersion={data}
        rtl={rtl}
        handleRtl={handleRtl} 
        handleAccessibility={handleAccessibility}
        handleCaptilizling={handleCaptilizling} 
        fontStyles={fontStyles}
      >
        <Component
          {...pageProps}
          rtl={rtl}
          handleRtl={handleRtl}
          isFeedbackVisible={isFeedbackVisible}
          handleToggleFeedback={handleToggleFeedback}
          conVersion={data}
        />
      </Layout>
      </FontSizeProvider> 
    </div>
    </>

  );
}
export default appWithTranslation(App)