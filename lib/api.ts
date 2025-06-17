import { create } from "domain"
import { PROJECT_TYPE } from "./utils"
import { CreateProjectData, MessagePayload, News } from "./models"

// Base API URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Generic fetch function with error handling
async function fetchAPI(endpoint: string, options: RequestInit = {}, revalidate: number = 600) {
  const url = `${API_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      // Use Next.js cache system to revalidate every 60 seconds
      next: { revalidate },
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "An error occurred")
    }

    return await response.json()
  } catch (error) {
    console.error(`API error for ${url}:`, error)
    throw error
  }
}

// Projects API
export const projectsAPI = {
  // Get all projects
  getAll: async (type: PROJECT_TYPE) => {
    // If type is ALL, fetch all projects
    if (type === PROJECT_TYPE.ALL) {
      return fetchAPI("/projects")
    }
    // Otherwise, fetch projects by type
    return fetchAPI(`/projects?type=${type}`)
  },

  // Get featured projects
  getFeatured: async () => {
    return fetchAPI("/projects/featured")
  },

  // Get project by ID
  getById: async (id: string) => {
    return fetchAPI(`/projects/${id}`)
  },
  create: async (data: CreateProjectData) => {
    return fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Required for JSON body

      },
      body: JSON.stringify(data),
    })
  },
  update: async (id: string, data: CreateProjectData) => {
    return fetch(`${API_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Required for JSON body

      },
      body: JSON.stringify(data),
    })
  },
  deleteByID: async (id: string) => {
    return fetchAPI(`/projects/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
  }
}

//Upload API
export const UploadAPI = {
  uploadMultipleImages: async (files: any) => {
    const fileArray = Array.from(files); // this is crucial

    console.log("Uploading images...", files);
    const base64Images = await Promise.all(
      fileArray.map((file: any) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );
    const res = await fetchAPI('/upload-images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imagesBase64: base64Images }),
    });

    return res;

  }
}


// app.post('/upload/photos', upload.array('photos', 12), async (req, res) => {
//   try {
//     const uploads = await Promise.all(req.files.map(async (file) => {
//       // const formData = new FormData();
//       // formData.append("image", fs.readFileSync(file.path), file.originalname); // fs required

//       const base64Image = fs.readFileSync(file.path, { encoding: 'base64' });
//       const formData = new FormData();
//       formData.append("image", base64Image, file.originalname); // fs required
//       formData.append("name", file.originalname); // optional, for naming the image


//       const response = await axios.post("https://api.imgbb.com/1/upload", {
//         params: {
//           key: process.env.IMGBB_API_KEY,
//           image: base64Image,
//         },
//         headers: {
//           ...formData.getHeaders(), // required for Node to set boundary
//         },
//       });

//       return response.data.data.url;
//     }));

//     res.json({ urls: uploads });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// News API
export const newsAPI = {
  // Get all news
  getAll: async () => {
    return fetchAPI("/news")
  },

  // Get project by ID
  getById: async (id: string) => {
    return fetchAPI(`/news/${id}`)
  },

  create: async (data: News) => {
    return fetchAPI(`/news`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: News) => {
    return fetchAPI(`/news/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return fetchAPI(`/news/${id}`, {
      method: 'Delete',
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
  },

}

// Contact API
export const contactApi = {
  // Get all info
  getAll: async () => {
    return fetchAPI("/contact")
  },
}

// Auth API (for admin panel)
export const authAPI = {
  // Login
  login: async (credentials: { username: string; password: string }) => {
    return fetchAPI("/auth/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
  },

  // Get current user
  getCurrentUser: async (token: string) => {
    return fetchAPI("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}

export const messagesAPI = {
  // Get all messages
  getAll: async () => {
    return fetchAPI("/messages")
  },

  // Get message by ID
  getById: async (id: string) => {
    return fetchAPI(`/messages/${id}`)
  },
  // Create new message
  create: async (data: MessagePayload) => {
    return fetchAPI(`/messages`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  },    
}

