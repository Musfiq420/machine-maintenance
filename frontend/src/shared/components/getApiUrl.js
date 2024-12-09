// src/utils/getApiUrl.js

export const getApiUrl = (apiType) => {
    const apiUrls = {
      'Machine_QR_Data_API': import.meta.env.VITE_MACHINE_QR_DATA_API,
      'User_API': import.meta.env.VITE_USER_API,
      'Order_API': import.meta.env.VITE_ORDER_API,
      'Notification_API': import.meta.env.VITE_NOTIFICATION_API,
      // Add more cases as needed
    };
  
    // Check if the API type exists in the apiUrls object
    if (apiUrls[apiType]) {
      return apiUrls[apiType];
    } else {
      // Default to a fallback API URL if the type doesn't exist
      console.warn(`API type "${apiType}" not found. Falling back to the default Machine_QR_Data_API.`);
      return apiUrls['Machine_QR_Data_API'];  // You can choose the default API
    }
  };
  