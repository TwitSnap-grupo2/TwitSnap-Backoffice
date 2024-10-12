import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { Router } from "./router";
import { AuthProvider } from "./screens/AuthContex";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
