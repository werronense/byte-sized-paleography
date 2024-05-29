import { useEffect } from "react";
import axios from "axios";

import "./TranscriptionPage.scss";

const { VITE_API_BASE_URL } = import.meta.env;

const TranscriptionPage = () => {
  useEffect(() => {
    const getText = async () => {
      const response = await axios.get(`${VITE_API_BASE_URL}/api/text`);
      console.log(response.data);
    }
    getText();
  }, []);

  return <h1>Transcription Page</h1>;
};

export default TranscriptionPage;
