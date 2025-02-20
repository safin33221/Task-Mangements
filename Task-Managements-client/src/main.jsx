import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Router from './Router/router.jsx'
import Authprovider from './Providers/Authprovider.jsx'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authprovider>

        <Router></Router>
      </Authprovider>
    </QueryClientProvider>
  </StrictMode>,
)
