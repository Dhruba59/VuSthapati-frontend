import { PROJECT_TYPE } from "./utils";

export interface News {
  _id?: string;
  title: string;
  description: string;
  images: UploadedFile[];
  createdAt?: string;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  images: UploadedFile[];
  tags: string[];
  location: string;
  client: string;
  type: PROJECT_TYPE;
  createdAt?: string;
}

export interface CreateProjectData extends Omit<Project, "_id" | "createdAt"> {}

export interface ContactInfo {
  _id?: string; // Optional if you don’t use it on frontend
  name: string;
  primaryEmail: string;
  secondaryEmails: string[];
  primaryPhone: string;
  secondaryPhone: string[];
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  googleMapAddress: {
    embedUrl: string;
    latitude: number;
    longitude: number;
  };
  website: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

export interface ContextDataType {
  contactInfo: ContactInfo;
  projects: Project[];
  news: News[];
}

export interface MessagePayload {
  _id?: string; // Optional if you don’t use it on frontend
  name: string;
  senderEmail: string;
  recipientEmail: string;
  message: string;
  createdAt?: string; // Optional if you don’t use it on frontend
}

export interface UploadedFile {
  url: string;
  deleteUrl?: string; // Optional if you want to provide a delete URL
}

export interface AboutSection {
  _id?: string;
  title: string;
  description: string;
  featuredImages: UploadedFile[]; 
  aboutUsImages: UploadedFile[];
  createdAt?: string; 
}