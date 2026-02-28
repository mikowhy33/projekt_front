import { Button } from './ui/button';

type props = {
  onCancel: () => void;
};
export const ShowUserStats = ({ onCancel }: props) => {
  const savedData = localStorage.getItem('player_stats');
  const resultHistory: Record<string, string | number>[] = savedData ? JSON.parse(savedData) : [];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[800px] h-[400px] p-12 bg-amber-200 "
      >
        <div className="overflow-y-auto">
          {resultHistory.map((record, index) => (
            <ul key={index} className="mb-4 border-b border-black">
              {Object.entries(record).map(([key, val]) => (
                <li key={key}>
                  <span className="font-semibold">{key}:</span>
                  <span> {val}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="flex justify-center gap-4 ">
          <Button onClick={() => onCancel()}>Powrót</Button>
        </div>
      </div>
    </div>
  );
};
