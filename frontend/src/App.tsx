import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import { Loading } from "./components/Loading/Loading";

const EventsBoard = lazy(() => import("./components/EventsBoard/EventsBoard"));
const RegistrationPage = lazy(
  () => import("./components/RegistrationPage/RegistrationPage")
);
const ParticipantsPage = lazy(
  () => import("./components/ParticipantsPage/ParticipantsPage")
);
const NotFoundPage = lazy(
  () => import("./components/NotFoundPage/NotFoundPage")
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<EventsBoard />} />
          <Route path="/register/:eventId" element={<RegistrationPage />} />
          <Route path="/participants/:eventId" element={<ParticipantsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </BrowserRouter>
  );
}
