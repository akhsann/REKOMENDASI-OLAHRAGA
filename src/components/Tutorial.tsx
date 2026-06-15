import { ExerciseTutorial } from '@/data/exerciseTutorials';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface TutorialProps {
  tutorial: ExerciseTutorial;
  exerciseName: string;
  onStart: () => void;
  onBack: () => void;
}

export function Tutorial({ tutorial, exerciseName, onStart, onBack }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-foreground">Tutorial: {exerciseName}</h1>
          <p className="text-muted-foreground">Pelajari teknik yang benar sebelum memulai</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2">
          {tutorial.steps.map((_, index) => (
            <div key={index} className={`h-2 rounded-full transition-all duration-300 ${index === currentStep ? 'w-8 bg-primary' : index < currentStep ? 'w-2 bg-primary/50' : 'w-2 bg-muted'}`} />
          ))}
        </div>

        {/* Current Step */}
        <Card className="animate-scale-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                Langkah {currentStep + 1}: {tutorial.steps[currentStep].title}
              </CardTitle>
              <Badge variant="outline">
                {currentStep + 1} / {tutorial.steps.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">{tutorial.steps[currentStep].description}</p>

            {tutorial.steps[currentStep].tips && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-foreground">Tips:</h4>
                <ul className="space-y-1.5">
                  {tutorial.steps[currentStep].tips!.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Safety Tips */}
        {currentStep === tutorial.steps.length - 1 && (
          <div className="space-y-4">
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  Tips Keamanan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tutorial.safetyTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-amber-600" />
                  Kesalahan Umum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tutorial.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button onClick={prevStep} variant="outline" className="flex-1 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Sebelumnya
            </Button>
          )}
          {currentStep < tutorial.steps.length - 1 ? (
            <Button onClick={nextStep} className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary-glow">
              Selanjutnya
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={onStart} className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90">
              Mulai Latihan
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Back Button */}
        <Button onClick={onBack} variant="ghost" className="w-full">
          Kembali
        </Button>
      </div>
    </div>
  );
}





