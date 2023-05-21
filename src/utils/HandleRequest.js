const handleRequest = async (method, url, data = null, headers = {}) => {
  try {
    const token = localStorage.getItem('token');

    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body: data ? JSON.stringify(data) : null,
    };

    const baseURL = process.env.REACT_APP_API_URL;

    const response = await fetch([baseURL, url].join('/'), requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'Something went wrong';
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default handleRequest;
