import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASEURL}`;

export const getUserDetails = async (setUser) => {
  try {
    const token = localStorage.getItem("token");
    const user = await axios.get(`${baseUrl}/user/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (user.data.success) {
      setUser(user.data.user);
      return {
        success: true,
      };
    } else {
      console.error(user.data.message);
      return {
        success: false,
      };
    }
  } catch (error) {
    console.error("Error occoured while fetching user details", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// update user details
export const updateUserDetails = async (data, setUser) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${baseUrl}/user/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success) {
      getUserDetails(setUser);
      return {
        success: true,

        message: "Profile updated successfully",
      };
    } else {
      return {
        success: false,
        message: `${response.message}: ${response.error.message}`,
      };
    }
  } catch (error) {
    console.error("Error occoured while updating user details", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// delete user
export const deleteUser = async (setUser) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${baseUrl}/user/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.success) {
      setUser(null);
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.error("Error occoured while deleting user details", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const sendContactUsEmail = async (email, subject, message) => {
  try {
    const response = await axios.post(`${baseUrl}/user/contact`, {
      email,
      subject,
      message,
    });
    return response;
  } catch (error) {
    console.error("Error occoured while sending OTP", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const imageUpload = async (tag, file, setUser) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("tag", tag);
    formData.append("file", file);

    const response = await axios.post(
      `${baseUrl}/upload/imageUpload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      getUserDetails(setUser);
    }
    return response;
  } catch (error) {
    console.error("Error occurred while uploading image", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const imageDelete = async (postId, imageLink, setUser) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${baseUrl}/upload/imageDelete`,
      { postId, imageLink },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      getUserDetails(setUser);
    }
    return response;
  } catch (error) {
    console.error("Error occurred while deleting image", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
