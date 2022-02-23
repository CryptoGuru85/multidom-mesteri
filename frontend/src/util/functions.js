export const getUploadedFileValue = (url) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const reader = new FileReader();

    xhr.open("GET", url);
    xhr.responseType = "blob";

    xhr.onloadend = () => {
      const response = xhr.response;

      reader.readAsDataURL(response);

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = () => reject("");
    };

    xhr.send();
  });

  return promise;
};
