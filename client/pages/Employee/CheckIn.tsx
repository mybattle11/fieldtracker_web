import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  ArrowLeft,
  MapPin,
  Clock,
  Camera,
  CheckCircle,
} from "lucide-react";

export default function CheckIn() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"location" | "confirm" | "success">(
    "location"
  );
  const [notes, setNotes] = useState("");
  const [photoTaken, setPhotoTaken] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleConfirmCheckIn = () => {
    setStep("success");
    setTimeout(() => navigate("/employee/dashboard"), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/employee/dashboard")}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <h1 className="text-2xl font-bold text-foreground">Check In</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === "location" && (
          <>
            {/* Location Map */}
            <div className="bg-white rounded-xl border border-border p-8 mb-6">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Current Location
              </h3>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg h-64 flex items-center justify-center mb-6 border border-border/50">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="font-semibold text-foreground">
                    40.7128° N, 74.0060° W
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Downtown Zone A - 15m accuracy
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900">
                  ✓ Your location has been verified
                </p>
              </div>

              {/* Time Display */}
              <div className="flex items-center justify-center gap-3 mb-8 p-6 rounded-lg bg-muted/30">
                <Clock className="w-5 h-5 text-foreground" />
                <p className="text-3xl font-bold text-foreground">09:15 AM</p>
              </div>
            </div>

            {/* Photo & Notes */}
            <div className="bg-white rounded-xl border border-border p-8 mb-6">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Additional Details
              </h3>

              <div className="mb-6">
                <button
                  onClick={() => setPhotoTaken(!photoTaken)}
                  className={`w-full px-6 py-4 rounded-lg border-2 transition-all flex items-center justify-center gap-3 font-medium ${
                    photoTaken
                      ? "bg-success/10 border-success text-success"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Camera className="w-5 h-5" />
                  {photoTaken ? "Photo Captured ✓" : "Capture Photo (Optional)"}
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Starting at Zone A, heading to Client X..."
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/employee/dashboard")}
                className="flex-1 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep("confirm")}
                className="flex-1 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {step === "confirm" && (
          <>
            {/* Confirmation Screen */}
            <div className="bg-white rounded-xl border border-border p-8 mb-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Ready to Check In?
                </h3>
                <p className="text-muted-foreground">
                  Review your check-in details before submitting
                </p>
              </div>

              {/* Summary */}
              <div className="space-y-4 mb-8 p-6 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Location</span>
                  <span className="text-muted-foreground">
                    Downtown Zone A
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-foreground font-medium">Time</span>
                  <span className="text-muted-foreground">09:15 AM</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-foreground font-medium">Photo</span>
                  <span className="text-muted-foreground">
                    {photoTaken ? "Captured ✓" : "Not provided"}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("location")}
                  className="flex-1 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmCheckIn}
                  className="flex-1 px-6 py-3 rounded-lg bg-success text-success-foreground hover:bg-success/90 transition-colors font-medium"
                >
                  Confirm Check In
                </button>
              </div>
            </div>
          </>
        )}

        {step === "success" && (
          <>
            {/* Success Screen */}
            <div className="bg-white rounded-xl border border-border p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">
                Checked In!
              </h3>
              <p className="text-muted-foreground mb-8">
                Your check-in has been recorded successfully
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecting to dashboard...
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
