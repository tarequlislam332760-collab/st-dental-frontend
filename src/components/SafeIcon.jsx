import React from 'react';
import * as Lucide from 'lucide-react';

const SafeIcon = ({ name, size = 20, className = "" }) => {
  const IconComponent = Lucide[name] || Lucide.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

export default SafeIcon;