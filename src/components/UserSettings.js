import React from 'react';

const UserSettings = () => {
  const handleThemeToggle = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div>
      <button className="button button-toggle" onClick={handleThemeToggle}>Toggle Theme</button>
    </div>
  );
};

export default UserSettings;
