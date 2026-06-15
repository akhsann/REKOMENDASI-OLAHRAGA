import { useSearchParams, useNavigate } from 'react-router-dom';
import { getExercises } from '@/utils/exerciseStore';
import { getTutorial } from '@/data/exerciseTutorials';
import { Tutorial } from '@/components/Tutorial';
import { parseSessionDurationMinutes } from '@/utils/exerciseSession';

export default function TutorialPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const exerciseId = searchParams.get('id');
  const sessionMinutes = parseSessionDurationMinutes(searchParams.get('mins'));

  const exercise = getExercises().find((ex) => ex.id === exerciseId);

  if (!exercise) {
    navigate('/');
    return null;
  }

  const tutorial = getTutorial(exerciseId || '');

  const handleStart = () => {
    navigate(`/workout?id=${exerciseId}&mins=${sessionMinutes}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return <Tutorial tutorial={tutorial} exerciseName={exercise.name} onStart={handleStart} onBack={handleBack} />;
}





