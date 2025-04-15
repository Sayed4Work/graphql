import axios from "axios";

const API_URL = "https://learn.reboot01.com/api/graphql-engine/v1/graphql";

export async function queryData(query, variables) {
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.error("No token found. Please log in.");
    window.location.href = "/login";
    return null;
  }

  try {
    const requestData = { query };

    if (variables && Object.keys(variables).length > 0) {
      requestData.variables = variables;
    }

    const response = await axios.post(API_URL, requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data?.data;

    if (!data) {
      window.location.href = "/login";
      return null;
    }

    if (data.transaction) {
      return data.transaction;
    } else if (data.user) {
      return data.user;
    } else {
      return data;
    }

  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Handle token tampering/expiration
      localStorage.removeItem("jwt");
      window.location.href = "/"; // Redirect to login
    } else {
      console.error("Error fetching user data:", error);
    }

    return null;
  }
}
