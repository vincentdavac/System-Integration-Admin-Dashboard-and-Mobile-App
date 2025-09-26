import { ArchiveRestore } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';

interface CreditsRecoverProps {
  onClose: () => void;
}

export default function CreditsRecoverModal({ onClose }: CreditsRecoverProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <img src={UCCLogo} alt="Logo" width={55} className="drop-shadow" />
            <div className="leading-tight">
              <h1 className="font-bold text-sm text-white">
                UNIVERSITY OF CALOOCAN CITY
              </h1>
              <p className="text-xs text-white">South Campus</p>
            </div>
          </div>
          <button className="text-white text-2xl font-bold" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 font-serif leading-relaxed text-gray-800">
          <p className="text-1xl font-bold pb-2  text-center">
            Do you want to restore this credits?
          </p>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end space-x-2">
          <button className="text-white px-4 py-2 rounded bg-green-600 hover:bg-green-500">
            <ArchiveRestore size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
