export const apiRequest = async (url, options) => {
  const response = await fetch(url, options);
  const responseText = await response.text();
  let data;

  if (responseText.trim()) {
    try {
      data = JSON.parse(responseText);
    } catch {
      if (!response.ok) {
        throw new Error(
          `Request failed (${response.status} ${response.statusText}).`
        );
      }

      throw new Error("The server returned an invalid response.");
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.error || `Request failed (${response.status} ${response.statusText}).`
    );
  }

  if (data === undefined) {
    throw new Error("The server returned an empty response.");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
};