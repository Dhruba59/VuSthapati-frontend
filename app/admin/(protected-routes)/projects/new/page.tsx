import CreateEditProjectPage from '@/components/create-edit-project'
import { ProtectedRoute } from '@/components/protected-route';
import React from 'react';

const CreateNewProject = () => {
  return (
    <ProtectedRoute>
      <CreateEditProjectPage />
    </ProtectedRoute>

  )
}

export default CreateNewProject;