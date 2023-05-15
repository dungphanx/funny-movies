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
      throw new Error(`Request failed with status ${response.status}: ${errorData}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('An unexpected error occurred.');
    console.error(error.message);
    throw error; // Rethrow the error for the calling function to handle
  }
};

export default handleRequest;
