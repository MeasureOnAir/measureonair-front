import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND } from '../../constants/endpoints';

const EmptyView = ({project_id, level, element_id, isReloadViewer}) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false)


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axios.post(`${BACKEND}data/add/image/?project_id=${[project_id]}&level=${level}&element=${element_id}`, formData);
      setIsLoading(false)
      console.log(data);
      isReloadViewer()
    } catch (error) {
      setIsLoading(false)
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xs">
        <h1 className="text-center text-xl font-bold mb-4">
          No Image Found! Upload an Image to Continue
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Choose an image to upload:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {!file && (
            <p className="text-center text-red-600 text-sm mb-4">
              No image selected. Please select an image to upload.
            </p>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={!file || isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Upload
            </button>
            {file && (
              <span className="text-gray-600 ml-4">{file.name}</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmptyView;
