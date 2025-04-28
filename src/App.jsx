
import AppRoutes from '@/Routes'
import './App.css'
import { QueryClientProvider , QueryClient, QueryClient } from '@tanstack/react-query'

function App() {
 
  const queryClient= new QueryClient();

  return (
    <QueryClientProvider client={QueryClient}>
     <AppRoutes/>
     </QueryClientProvider>
    
  )
}

export default App
