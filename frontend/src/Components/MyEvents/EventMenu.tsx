import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaEdit, 
  FaCopy, 
  FaDownload, 
  FaTrash, 
  FaShareAlt,
  FaCalendarPlus 
} from 'react-icons/fa';
import './EventMenu.css';

interface EventMenuProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  onAction: (action: string, eventId: string) => void;
}

const EventMenu: React.FC<EventMenuProps> = ({ 
  eventId, 
  isOpen, 
  onClose, 
  position,
  onAction 
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleAction = (action: string) => {
    onAction(action, eventId);
    onClose();
  };

  const handleEdit = () => {
    navigate(`/events/${eventId}/edit`);
    onClose();
  };

  const menuItems = [
    { id: 'edit', label: 'Edit Event', icon: FaEdit, action: handleEdit },
    { id: 'duplicate', label: 'Duplicate Event', icon: FaCopy, action: () => handleAction('duplicate') },
    { id: 'export', label: 'Export Details', icon: FaDownload, action: () => handleAction('export') },
    { id: 'share', label: 'Share Event', icon: FaShareAlt, action: () => handleAction('share') },
    { id: 'calendar', label: 'Add to Calendar', icon: FaCalendarPlus, action: () => handleAction('calendar') },
    { id: 'delete', label: 'Delete Event', icon: FaTrash, action: () => handleAction('delete'), danger: true },
  ];

  return (
    <>
      <div className="menu-overlay" onClick={onClose} />
      <div 
        className="event-menu" 
        style={{ 
          top: position.y,
          left: position.x
        }}
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${item.danger ? 'danger' : ''}`}
            onClick={item.action}
          >
            <item.icon className="menu-icon" />
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default EventMenu;