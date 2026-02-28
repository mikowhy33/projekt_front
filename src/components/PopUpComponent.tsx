import { Button } from './ui/button';

type props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export const PopUpComponent = ({ onConfirm, onCancel }: props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[400px] h-[400px] p-12 bg-cyan-300 "
      >
        <p className="pb-4">Czy chcialbys zapisac swoj progress?</p>
        <div className="flex justify-center gap-4 ">
          <Button onClick={() => onConfirm()}>Tak</Button> <Button onClick={() => onCancel()}>Nie</Button>
        </div>
      </div>
    </div>
  );
};
