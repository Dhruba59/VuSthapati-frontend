import { PROJECT_TYPE } from "./utils";

export interface News {
  _id?: string;
  title: string;
  description: string;
  imageUrls: string[];
  createdAt?: string;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  imageUrls: string[];
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