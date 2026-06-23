export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-6 lg:py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

      {/* User Card */}
      <div className="card-elevated text-center py-8 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl text-primary">👤</span>
        </div>
        <h2 className="font-bold text-gray-800 text-lg">Faithful User</h2>
        <p className="text-sm text-gray-400">Walking with God since 2024</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="card text-center">
          <p className="text-2xl font-bold text-primary">42</p>
          <p className="text-xs text-gray-400">Total Days</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-accent-coral">12</p>
          <p className="text-xs text-gray-400">Best Streak</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-accent-teal">85</p>
          <p className="text-xs text-gray-400">Meditate Min</p>
        </div>
      </div>

      {/* Premium Banner */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-0 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xl text-secondary">✦</span>
          <div className="flex-1">
            <p className="font-semibold text-gray-800 text-sm">Upgrade to Premium</p>
            <p className="text-xs text-gray-500">Unlock all meditations, translations & more</p>
          </div>
          <button className="btn-primary text-xs py-2 px-4">Try Free</button>
        </div>
      </div>

      {/* Settings */}
      <h2 className="section-title">Settings</h2>
      <div className="card divide-y divide-gray-100">
        {[
          { icon: '🌙', label: 'Dark Mode' },
          { icon: '🔔', label: 'Notifications' },
          { icon: '🔤', label: 'Font Size' },
          { icon: '🌐', label: 'Language' },
          { icon: '📱', label: 'Lock Screen Widget' },
          { icon: '🔒', label: 'Privacy' },
          { icon: '❓', label: 'Help & Support' },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-300 text-center mt-8">Bible Chat v1.0.0</p>
    </div>
  );
}
