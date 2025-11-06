import './styles/global.css';
import { createRoot } from 'react-dom/client';
import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';

createRoot(document.getElementById('root')).render(
	<AuthProvider>
		<ProjectProvider>
			<RouterProvider router={router} />
		</ProjectProvider>
	</AuthProvider>
)
