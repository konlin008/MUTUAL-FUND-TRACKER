import { Toaster } from "@/components/ui/sonner"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      duration={2000}
      closeButton
      toastOptions={{
        classNames: {
          toast: "rounded-xl bg-white shadow-lg",
          title: "text-lg font-semibold",
          description: "text-sm text-muted-foreground"
        }
      }}
    />
  </StrictMode>,
)
