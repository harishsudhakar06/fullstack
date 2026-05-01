import PredictorForm from "@/components/PredictorForm";
import { Brain } from "lucide-react";

export default function PredictorPage() {
  return (
    <div className="pb-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 text-sm font-medium px-4 py-2 rounded-full mb-4">
          <Brain size={16} />
          AI-Powered Rank Predictor
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Find Colleges for Your Rank
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Enter your entrance exam and rank. We'll show you colleges where you have the best chance of admission.
        </p>
      </div>
      <PredictorForm />
    </div>
  );
}