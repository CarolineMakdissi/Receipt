import axios from "axios";

// ONBOARDING
const BASE_URL =
  "https://card-rec-38cxuj.azurewebsites.net/CardRecognition/api";

const CASHIER_SYSTEM_ID = "5564260882"; // This is the business number that is now used as the cashierSystemId
const terminalData = {
  acquirerTerminalId: "1710023912",
  merchantName: "Unknown",
  merchantCity: "Stockholm",
  merchantCountry: "SWE",
  merchantIds: [
    {
      cardType: "VISA",
      acquirerMerchantId: "6598745",
    },
  ],
};

// SAVETERMINAL function
const saveTerminal = async (apiKey = null) => {
  const url = `${BASE_URL}/terminal/save?cashierSystemId=${CASHIER_SYSTEM_ID}`;

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers["x-api-key"] = apiKey;
    }

    // Sending POST request to register terminal
    const response = await axios.post(url, terminalData, { headers });

    // Log the entire API response
    console.log("Status:", response.status);
    console.log("Response Headers:", response.headers);
    console.log("Response Data:", response.data);

    if (response.status === 200) {
      console.log("Terminal sucecessfully registered:", response.data);
      return response.data;
    }

    throw new Error(`Unexpected status: ${response.status}`);
  } catch (error) {
    if (error.response) {
      // Logg more details about the error if it comes from the server
      console.error("Terminal successfully registered:");
      console.error("Error registering terminal:", error.response.status);
      console.error("Svar från servern:", error.response.data);
    } else {
      console.error("Server response:", error.message);
    }
    throw error;
  }
};

export { saveTerminal };

// GET TERMINAL function
const getTerminal = async (cashierSystemId, apiKey = null) => {
  const url = `${BASE_URL}/terminal/terminalId/{terminalId}${cashierSystemId}`;

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers["x-api-key"] = apiKey;
    }
    // Sending GET request to retrieve terminal data
    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      console.log("Get terminal succeeded:", response.data);
      console.log("Status code:", response.status);
      return response.data;
    } else {
      throw new Error(`Unexpected status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error retrieving terminal:", error.message);
    throw error;
  }
};

export { getTerminal };

//JSESSIONID=E31C35F90FE61619
