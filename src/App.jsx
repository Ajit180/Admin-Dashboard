
import AppRoutes from '@/Routes'
import './App.css'
import { QueryClientProvider , QueryClient} from '@tanstack/react-query'
import { SignupContainer } from './pages/auth/Signup';

function App() {
 
  const queryClient= new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
     <AppRoutes/>
     </QueryClientProvider>
    
  )
}

export default App
