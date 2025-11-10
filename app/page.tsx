'use client';

import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Loader2 } from 'lucide-react'; // optional spinner icon if using shadcn/lucide-react

export default function HomePage() {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [predicting, setPredicting] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      await tf.setBackend('webgl');
      await tf.ready();

      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      setLoading(false);
    };
    load();
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
      setPrediction('');
    }
  };

  const handlePredict = async () => {
    if (!model || !imageURL) return;
    setPredicting(true);

    const img = document.getElementById('plant-image') as HTMLImageElement;
    const results = await model.classify(img);

    setPrediction(results[0]?.className || 'No prediction');
    setPredicting(false);
  };

  return (
    <div className="glass-card max-w-2xl mx-auto mt-16 text-center animate-fade-in">
      <h2 className="text-3xl font-extrabold mb-6 text-green-400 tracking-wide drop-shadow-md">
        🌿 Plant Disease Detector
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-gray-400">
          <Loader2 className="animate-spin w-6 h-6 mr-2 text-green-400" />
          Loading AI Model...
        </div>
      ) : (
        <>
          {/* Upload Section */}
          <div className="flex flex-col items-center space-y-4">
            <label
              htmlFor="image-upload"
              className="cursor-pointer glow-button inline-block px-5 py-3 rounded-lg font-semibold"
            >
              Upload Plant Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />

            {/* Image Preview */}
            {imageURL && (
              <div className="mt-6">
                <img
                  id="plant-image"
                  src={imageURL}
                  alt="Uploaded Plant"
                  className="preview-image border border-white/20 hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={handlePredict}
                  disabled={predicting}
                  className="glow-button mt-6 px-6 py-3 rounded-lg relative"
                >
                  {predicting ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="animate-spin w-5 h-5 mr-2" /> Analyzing...
                    </span>
                  ) : (
                    '🔍 Predict Disease'
                  )}
                </button>
              </div>
            )}

            {/* Prediction Output */}
            {prediction && (
              <p className="prediction-text mt-6 text-xl font-semibold text-green-300 animate-fade-in">
                🧠 Prediction: <span className="text-green-400">{prediction}</span>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
