import CreateEditNewsPage from '@/components/create-edit-news';
import CreateEditProjectPage from '@/components/create-edit-project'
import { ProtectedRoute } from '@/components/protected-route';
import React from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

const EditProject = async ({ params }: PageProps) => {
  const { id } = await params
  return (
    <ProtectedRoute>
      <CreateEditNewsPage id={id} />
    </ProtectedRoute>
  )
}

export default EditProject;