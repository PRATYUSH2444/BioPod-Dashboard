export default function KpiDetailModal({ open, onClose, title, value, insight, action }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-[90%] max-w-md p-6 shadow-2xl">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-zinc-400">Current Value</p>
            <p className="text-xl font-bold text-white">{value}</p>
          </div>

          <div>
            <p className="text-zinc-400">AI Insight</p>
            <p className="text-white">{insight}</p>
          </div>

          <div>
            <p className="text-zinc-400">Recommended Action</p>
            <p className="text-green-400">{action}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
