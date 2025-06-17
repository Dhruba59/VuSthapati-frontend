import CreateEditNewsPage from '@/components/create-edit-news';
import CreateEditProjectPage from '@/components/create-edit-project'
import { ProtectedRoute } from '@/components/protected-route';
import React from 'react';

const EditProject = () => {
  return (
    <ProtectedRoute>
      <CreateEditNewsPage />
    </ProtectedRoute>
  )
}

export default EditProject;