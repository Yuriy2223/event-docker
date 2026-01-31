import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/const-env.js";
import { useNavigate } from "react-router-dom";
import { AnimatedPage } from "../AnimatedBackground/AnimatedBackground.js";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Eye,
  UserPlus,
  Filter,
  Clock,
  Star,
} from "lucide-react";

export interface Event {
  _id: string;
  imgUrl: string;
  title: string;
  description: string;
  eventDate: string;
  organizer: string;
}

export default function EventsBoard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("title");
  const eventsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/events?page=${currentPage}&limit=${eventsPerPage}&sortField=${sortField}`
        );
        setEvents(response.data.events);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [currentPage, sortField]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRegisterClick = (eventId: string) => {
    navigate(`/register/${eventId}`);
  };

  const handleViewClick = (eventId: string) => {
    navigate(`/participants/${eventId}`);
  };

  return (
    <AnimatedPage orbCount={6} orbSize="md" showLargeCircles={true}>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-violet-700 via-rose-600 to-amber-600 bg-clip-text text-transparent tracking-tight">
              Discover Events
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full"></div>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Find your next adventure and connect with amazing experiences
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-1 shadow-lg border border-white/20">
              <select
                className="relative bg-gradient-to-r from-violet-50/50 to-rose-50/50 border-0 rounded-xl px-6 py-3 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500/30 transition-all duration-300 appearance-none cursor-pointer min-w-56"
                onChange={(e) => setSortField(e.target.value)}
                value={sortField}
              >
                <option value="title">Sort by Title</option>
                <option value="eventDate">Sort by Date</option>
                <option value="organizer">Sort by Organizer</option>
              </select>
              <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-violet-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mb-16">
          {events.map((event, index) => {
            const gradients = [
              "from-violet-500 to-purple-600",
              "from-rose-500 to-pink-600",
              "from-amber-500 to-orange-600",
              "from-emerald-500 to-teal-600",
              "from-blue-500 to-indigo-600",
              "from-pink-500 to-rose-600",
              "from-orange-500 to-red-600",
              "from-cyan-500 to-blue-600",
            ];
            const gradient = gradients[index % gradients.length];

            return (
              <div
                key={event._id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/30 hover:-translate-y-3 hover:rotate-1"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "slideInScale 0.7s ease-out forwards",
                }}
              >
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500`}
                ></div>

                <div className="relative overflow-hidden rounded-t-3xl h-52">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={event.imgUrl}
                    alt={event.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>

                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <Star className="w-5 h-5 text-amber-500" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-violet-600" />
                      <span className="text-sm font-bold text-slate-800">
                        {new Date(event.eventDate).toLocaleDateString("uk-UA", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative p-6 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-violet-700 transition-colors duration-300">
                    {event.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex items-center space-x-2 text-sm text-slate-500 mb-3">
                    <User className="w-4 h-4 text-rose-500" />
                    <span className="font-medium">{event.organizer}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>
                      {new Date(event.eventDate).toLocaleDateString("uk-UA", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      className={`flex-1 relative overflow-hidden group/btn bg-gradient-to-r ${gradient} hover:shadow-lg hover:shadow-violet-500/25 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105`}
                      onClick={() => handleRegisterClick(event._id)}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center space-x-2">
                        <UserPlus className="w-4 h-4" />
                        <span>Register</span>
                      </div>
                    </button>

                    <button
                      className="flex-1 bg-white/60 hover:bg-white/80 backdrop-blur-sm text-slate-700 font-semibold py-3 px-4 rounded-xl border border-slate-200/50 hover:border-slate-300/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      onClick={() => handleViewClick(event._id)}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {events.length === 0 && (
          <div className="text-center py-20">
            <div className="relative inline-block mb-6">
              <div className="animate-spin w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full"></div>
              <div className="absolute inset-0 animate-ping w-12 h-12 border-4 border-rose-400/20 rounded-full"></div>
            </div>
            <p className="text-xl text-slate-600 font-medium">
              Discovering amazing events...
            </p>
          </div>
        )}

        <div className="flex justify-center items-center space-x-3">
          <button
            className="group relative w-12 h-12 bg-white/70 backdrop-blur-sm hover:bg-white/90 border border-white/30 hover:border-white/50 rounded-2xl shadow-lg hover:shadow-xl text-slate-600 hover:text-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5 mx-auto" />
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`w-12 h-12 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-110 active:scale-95 ${
                  index + 1 === currentPage
                    ? "bg-gradient-to-r from-violet-500 to-rose-500 text-white shadow-xl shadow-violet-500/25"
                    : "bg-white/70 backdrop-blur-sm text-slate-600 hover:text-violet-600 hover:bg-white/90 border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className="group relative w-12 h-12 bg-white/70 backdrop-blur-sm hover:bg-white/90 border border-white/30 hover:border-white/50 rounded-2xl shadow-lg hover:shadow-xl text-slate-600 hover:text-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-5 h-5 mx-auto" />
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
}
