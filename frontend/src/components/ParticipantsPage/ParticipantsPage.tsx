import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../constants/const-env";
import { AnimatedPage } from "../AnimatedBackground/AnimatedBackground";
import {
  Calendar,
  User,
  ArrowLeft,
  Search,
  Sparkles,
  Users,
  UserCheck,
  Mail,
} from "lucide-react";

export interface RegisterParticipant {
  _id: string;
  fullName: string;
  email: string;
  dob: Date;
  referral: string;
}

export default function ParticipantsPage() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [participants, setParticipants] = useState<RegisterParticipant[]>([]);
  const [eventTitle, setEventTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [participantsRes, eventRes] = await Promise.all([
          axios.get<RegisterParticipant[]>(
            `${API_URL}/api/events/${eventId}/participants?search=${searchTerm}`
          ),
          axios.get<{ title: string }>(`${API_URL}/api/events/${eventId}`),
        ]);

        setParticipants(participantsRes.data);
        setEventTitle(eventRes.data.title);

        if (participantsRes.data.length === 0) {
          toast.info("No participants found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch participants");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [eventId, searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <AnimatedPage orbCount={6} orbSize="lg" showLargeCircles={true}>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-violet-600" />
              <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-violet-700 via-rose-600 to-amber-600 bg-clip-text text-transparent tracking-tight">
                Event Participants
              </h1>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full"></div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 max-w-3xl mx-auto mb-8">
            <p className="text-xl text-slate-600 font-medium">"{eventTitle}"</p>
            <div className="flex items-center justify-center mt-3 space-x-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>Total participants: {participants.length}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-12">
          <button
            onClick={handleGoBack}
            className="group relative overflow-hidden bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-slate-500/25"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Events</span>
            </div>
          </button>

          <div className="relative group flex-1 max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-xl p-1 shadow-lg border border-white/20">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full bg-transparent border-0 rounded-lg px-12 py-3 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                />
                <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-violet-400" />
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-20">
            <div className="relative inline-block mb-6">
              <div className="animate-spin w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full"></div>
              <div className="absolute inset-0 animate-ping w-12 h-12 border-4 border-rose-400/20 rounded-full"></div>
            </div>
            <p className="text-xl text-slate-600 font-medium">
              Loading participants...
            </p>
          </div>
        )}

        {!isLoading && participants.length === 0 && (
          <div className="text-center py-20">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mb-6">
                <Users className="w-12 h-12 text-slate-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-600 mb-3">
              No participants found
            </h3>
            <p className="text-slate-500 max-w-md mx-auto">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "Be the first to register for this event!"}
            </p>
          </div>
        )}

        {!isLoading && participants.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {participants.map((participant, index) => {
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
                  key={participant._id}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-white/30 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 60}ms`,
                    animation: "slideInScale 0.6s ease-out forwards",
                  }}
                >
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-15 blur transition-opacity duration-500`}
                  ></div>

                  <div
                    className={`relative bg-gradient-to-r ${gradient} p-6 pb-4`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-6 h-6 text-slate-600" />
                      </div>
                      <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                        <UserCheck className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="relative p-6 pt-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-violet-700 transition-colors duration-300">
                          {participant.fullName}
                        </h3>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Mail className="w-4 h-4 text-rose-500" />
                        <span className="truncate font-medium">
                          {participant.email}
                        </span>
                      </div>

                      {participant.dob && (
                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                          <Calendar className="w-4 h-4 text-amber-500" />
                          <span>
                            {new Date(participant.dob).toLocaleDateString(
                              "uk-UA",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      )}

                      {participant.referral && (
                        <div className="pt-2 border-t border-slate-200/50">
                          <span className="text-xs text-slate-500 font-medium">
                            Referral: {participant.referral}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && participants.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-block bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-violet-600" />
                  <span className="font-semibold text-slate-700">
                    {participants.length} Total
                  </span>
                </div>
                <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-slate-700">
                    All Registered
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
