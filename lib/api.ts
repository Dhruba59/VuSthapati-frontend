import { create } from "domain";
import { PROJECT_TYPE } from "./utils";
import { CreateProjectData, MessagePayload, News, Project, UploadedFile } from "./models";

// Base API URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Generic fetch function with error handling
async function fetchAPI(
  endpoint: string,
  options: RequestInit = {},
  revalidate: number = 600
) {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      // Use Next.js cache system to revalidate every 60 seconds
      next: { revalidate },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "An error occurred");
    }

    return await response.json();
  } catch (error) {
    console.error(`API error for ${url}:`, error);
    throw error;
  }
}

//About API
export const aboutAPI = {
  // Get all about section data
  getAll: async () => {
    return fetchAPI("/about");
  },

  // Create new about section
  create: async (data: any) => {
    return fetchAPI(`/about`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  // Update existing about section
  update: async (data: any) => {
    return fetchAPI(`/about`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  // Update existing feature-images section
  updateFeaturedImage: async (data: UploadedFile[]) => {
    return fetchAPI(`/about/featured-images`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

   // Update existing about-us-images section
  updateAboutUsImages: async (data: UploadedFile[]) => {
    return fetchAPI(`/about/about-images`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
};

// Projects API
export const projectsAPI = {
  // Get all projects
  getAll: async (type: PROJECT_TYPE) => {
    // If type is ALL, fetch all projects
    if (type === PROJECT_TYPE.ALL) {
      return fetchAPI("/projects");
    }
    // Otherwise, fetch projects by type
    return fetchAPI(`/projects?type=${type}`);
  },

  // Get featured projects
  getFeatured: async () => {
    return fetchAPI("/projects/featured");
  },

  // Get project by ID
  getById: async (id: string) : Promise<Project> => {
    return fetchAPI(`/projects/${id}`);
  },
  create: async (data: CreateProjectData) => {
    return fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Required for JSON body
      },
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: CreateProjectData) => {
    return fetch(`${API_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Required for JSON body
      },
      body: JSON.stringify(data),
    });
  },
  deleteByID: async (id: string) => {
    return fetchAPI(`/projects/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};

//Upload API
export const UploadAPI = {
  uploadMultipleImages: async (files: any): Promise< Array<UploadedFile>> => {
    const fileArray: Array<File> = Array.from(files); 

    const uploadPromises = fileArray.map(async (file: File) => {
      const formData = new FormData();
      formData.append("image", file); // Remove "data:image/...;base64,"
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
          // Do not set headers for FormData; browser will handle it
        }
      );
      return res.json();
    });
    
    const responses = await Promise.all(uploadPromises);
    const uploadedfiles: Array<UploadedFile> = responses.map((res: any) => ({ url: res.data.url, deleteUrl: res.data.delete_url ?? '' }));
    return uploadedfiles;
  },
};

// News API
export const newsAPI = {
  // Get all news
  getAll: async () => {
    return fetchAPI("/news");
  },

  // Get project by ID
  getById: async (id: string) => {
    return fetchAPI(`/news/${id}`);
  },

  create: async (data: News) => {
    return fetchAPI(`/news`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: News) => {
    return fetchAPI(`/news/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return fetchAPI(`/news/${id}`, {
      method: "Delete",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  },
};

// Contact API
export const contactApi = {
  // Get all info
  getAll: async () => {
    return fetchAPI("/contact");
  },
  // Update contact info
  update: async (data: any) => {
    return fetchAPI(`/contact`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
};

// Auth API (for admin panel)
export const authAPI = {
  // Login
  login: async (credentials: { username: string; password: string }) => {
    return fetchAPI("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  },

  // Get current user
  getCurrentUser: async (token: string) => {
    return fetchAPI("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export const messagesAPI = {
  // Get all messages
  getAll: async () => {
    return fetchAPI("/messages");
  },

  // Get message by ID
  getById: async (id: string) => {
    return fetchAPI(`/messages/${id}`);
  },
  // Create new message
  create: async (data: MessagePayload) => {
    return fetchAPI(`/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
};
