import { useState } from "react";

const useUploadFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadFile = async (file, project_id, level, element) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("project_id", project_id);
      formData.append("level", level);
      formData.append("element", element);

      const response = await fetch("/uploadfile/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSuccess(true);
      setIsLoading(false);

      return data;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return [uploadFile, isLoading, error, success];
}

export default useUploadFile;