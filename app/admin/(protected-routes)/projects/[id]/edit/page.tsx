import CreateEditProjectPage from '@/components/create-edit-project'
import { ProtectedRoute } from '@/components/protected-route';
import React from 'react';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

const EditProject = ({ params }: ProjectPageProps) => {
  return (
    <ProtectedRoute>
      <CreateEditProjectPage id={params.id} />
    </ProtectedRoute>
  )
}

export default EditProject;