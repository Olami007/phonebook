import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddContact from "../pages/AddContact";
import EditContact from "../pages/EditContact";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/add", element: <AddContact /> },
  { path: "/edit/:id", element: <EditContact /> },
]);
