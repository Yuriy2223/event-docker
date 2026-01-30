import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { API_URL } from "../../constants/const-env.js";
import { registerSchema } from "../../validation/validation.js";
import { AnimatedPage } from "../AnimatedBackground/AnimatedBackground";
import {
  User,
  Mail,
  Calendar,
  Users,
  Sparkles,
  CheckCircle2,
  Heart,
  Star,
} from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

export interface RegisterParticipant {
  fullName: string;
  email: string;
  dob: Date;
  referral: "Social media" | "Friends" | "Found myself";
}

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const goBackOrHome = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const onSubmit = async (data: RegisterParticipant) => {
    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        dob: data.dob,
        referral: data.referral,
      };
      await axios.post(`${API_URL}/api/events/${eventId}/register`, payload);
      toast.success("Registration successful!");
      reset();
      setTimeout(goBackOrHome, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to register. Please try again.");
    }
  };

  const referralOptions = [
    { value: "Social media", icon: "📱", color: "from-blue-500 to-cyan-500" },
    { value: "Friends", icon: "👥", color: "from-emerald-500 to-teal-500" },
    {
      value: "Found myself",
      icon: "🔍",
      color: "from-purple-500 to-violet-500",
    },
  ];

  return (
    <AnimatedPage
      orbCount={6}
      orbSize="lg"
      showLargeCircles={true}
      className="relative overflow-hidden"
    >
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-rose-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
              <div className="relative bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 p-8 text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black tracking-tight">
                          Join the Experience
                        </h2>
                        <p className="text-white/80 text-sm">
                          Register for this amazing event
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex space-x-2">
                      <Star className="w-5 h-5 text-white/60" />
                      <Star className="w-5 h-5 text-white/80" />
                      <Star className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 grid grid-cols-3 gap-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-white/30 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                    <User className="w-4 h-4 text-violet-500" />
                    <span>Full Name</span>
                  </label>
                  <div className="relative group/input">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      {...register("fullName")}
                      className="w-full px-4 py-4 bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-sm rounded-2xl border border-white/30 focus:border-violet-300/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 placeholder-slate-400 group-hover/input:bg-white/80 group-hover/input:border-white/50 shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-rose-500/5 opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  <div className="h-6 flex items-start">
                    {errors.fullName && (
                      <p className="text-red-500 text-sm flex items-center space-x-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        <span>{errors.fullName.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                    <Mail className="w-4 h-4 text-rose-500" />
                    <span>Email Address</span>
                  </label>
                  <div className="relative group/input">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      {...register("email")}
                      className="w-full px-4 py-4 bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-sm rounded-2xl border border-white/30 focus:border-rose-300/50 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all duration-300 placeholder-slate-400 group-hover/input:bg-white/80 group-hover/input:border-white/50 shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/5 to-pink-500/5 opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  <div className="h-6 flex items-start">
                    {errors.email && (
                      <p className="text-red-500 text-sm flex items-center space-x-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        <span>{errors.email.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>Date of Birth</span>
                  </label>
                  <div className="relative group/input">
                    <Controller
                      control={control}
                      name="dob"
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value}
                          onChange={field.onChange}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Select your date of birth"
                          className="w-full px-4 py-4 bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-sm rounded-2xl border border-white/30 focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 placeholder-slate-400 shadow-lg"
                          wrapperClassName="w-full"
                        />
                      )}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  <div className="h-6 flex items-start">
                    {errors.dob && (
                      <p className="text-red-500 text-sm flex items-center space-x-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        <span>{errors.dob.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span>Where did you hear about this event?</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {referralOptions.map((option) => (
                      <label
                        key={option.value}
                        className="relative group/radio cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={option.value}
                          {...register("referral")}
                          className="sr-only peer"
                        />
                        <div
                          className={`relative overflow-hidden p-5 bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-sm rounded-2xl border-2 border-white/30 transition-all duration-300 hover:border-white/50 peer-checked:border-transparent peer-checked:bg-gradient-to-r peer-checked:${option.color} peer-checked:text-white peer-checked:shadow-xl peer-checked:scale-105 shadow-lg group-hover/radio:shadow-xl`}
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-2">{option.icon}</div>
                            <div className="font-semibold text-sm">
                              {option.value}
                            </div>
                          </div>

                          <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity duration-300">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 peer-checked:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="h-6 flex items-start">
                    {errors.referral && (
                      <p className="text-red-500 text-sm flex items-center space-x-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        <span>{errors.referral.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={goBackOrHome}
                    className="flex-1 py-4 px-6 bg-white/60 hover:bg-white/80 backdrop-blur-sm text-slate-700 font-semibold rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 relative group/submit overflow-hidden py-4 px-6 bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 hover:from-violet-700 hover:via-rose-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/submit:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-5 h-5" />
                          <span>Register</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
