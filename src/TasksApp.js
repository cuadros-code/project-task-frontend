import React from 'react'
import { tokenAuth } from './config/tokenAuth'
import { AlertState } from './context/alert/alertState'
import { AuthState } from './context/auth/authState'
import { ProjectsState } from './context/projects/projectsState'
import { TaskState } from './context/tasks/taskState'
import { AppRouter } from './routes/AppRouter'

const token = localStorage.getItem('token')

if (token) {
    tokenAuth(token)
}

export const TasksApp = () => {
  return (
    <>
      <ProjectsState>
        <TaskState>
          <AlertState>
            <AuthState>
              <AppRouter />
            </AuthState>
          </AlertState>
        </TaskState>
      </ProjectsState>
    </>
  )
}
