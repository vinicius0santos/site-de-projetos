import './styles/global.css';
import { createRoot } from 'react-dom/client';
import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
	<AuthProvider>
		<RouterProvider router={router} />
	</AuthProvider>
)
