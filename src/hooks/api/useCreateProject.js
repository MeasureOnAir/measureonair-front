import { useState } from "react";
import axios from "axios";
import { BACKEND } from "../../constants/endpoints";

const useCreateProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const creatProject = async (project_name, project_details, num_floors, elements) => {
    setIsLoading(true);
    setError(null);

    try {

        const formData = {
            "name": project_name,
            "description": project_details,
            "num_levels": num_floors,
            "elements": elements
          }

        const response = await axios.post(`${BACKEND}data/add/project`, formData);

        setSuccess(true);
        setIsLoading(false);
  
        return response.data;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
  };

  return [creatProject, isLoading, error, success];
};

export default useCreateProject;
