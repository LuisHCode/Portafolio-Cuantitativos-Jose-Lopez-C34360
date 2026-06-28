import React from 'react';
import { 
  Truck, Target, Network, Dices, RefreshCw, Activity,
  BookOpen, Calculator, BarChart3, Home, Trophy, AlertTriangle,
  Download, ArrowRight, ArrowLeft, ChevronRight, ChevronLeft,
  FileText, HelpCircle, Star, Sparkles
} from 'lucide-react';

const iconMap = {
  Truck,
  Target,
  Network,
  Dices,
  RefreshCw,
  Activity,
  BookOpen,
  Calculator,
  BarChart3,
  Home,
  Trophy,
  AlertTriangle,
  Download,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  FileText,
  HelpCircle,
  Star,
  Sparkles
};

const MethodIcon = ({ name, size = 20, className = '', color, style }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} className={className} color={color} style={style} />;
};

export default MethodIcon;
