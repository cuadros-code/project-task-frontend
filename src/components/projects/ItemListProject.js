import React, { useContext } from 'react'
import { projectContext } from '../../context/projects/projectsContext';
import { taskContext } from '../../context/tasks/taskContext';

export const ItemListProject = ({project}) => {

    const { selectedProjectActivate  } = useContext(projectContext);
    const { filterTask } = useContext(taskContext);

    
    const getIdBySelectedProject = () => {
        
        selectedProjectActivate(project);
        filterTask(project._id)

    };

    return (
        <li>
            <button 
                className="btn btn-blank"
                type="button"
                onClick={getIdBySelectedProject}
            >
                {project.name}
            </button>
        </li>
    )
}
