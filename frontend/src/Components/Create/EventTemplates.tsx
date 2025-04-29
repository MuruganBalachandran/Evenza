import { motion } from 'framer-motion';
import './EventTemplates.css';

export interface Template {
  _id: string;
  name: string;
  description: string;
  category: string;
  template_data: {
    basicInfo?: {
      title?: string;
      description?: string;
      category?: string;
      tags?: string[];
    };
    dateTime?: {
      startDate?: string;
      endDate?: string;
      startTime?: string;
      endTime?: string;
      timezone?: string;
    };
    location?: {
      type?: string;
      venue?: string;
      address?: string;
      platform?: string;
      meetingLink?: string;
      coordinates?: any;
    };
    branding?: {
      banner?: string;
      color?: string;
      logo?: string;
    };
    privacy?: {
      type?: string;
      maxAttendees?: number;
      accessType?: string;
      password?: string;
      enableWaitlist?: boolean;
    };
  };
}

interface EventTemplatesProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
  selectedTemplateId?: string;
}

const EventTemplates = ({ templates, onSelectTemplate, selectedTemplateId }: EventTemplatesProps) => {
  if (!templates || templates.length === 0) {
    return (
      <div className="no-templates">
        <p>No templates available</p>
      </div>
    );
  }

  return (
    <div className="templates-grid">
      {templates.map((template) => (
        <motion.div
          key={template._id}
          className={`template-card ${selectedTemplateId === template._id ? 'selected' : ''}`}
          onClick={() => onSelectTemplate(template)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="template-header">
            <h3>{template.name}</h3>
            <span className="template-category">{template.category}</span>
          </div>
          <p className="template-description">{template.description}</p>
          <div className="template-preview">
            {template.template_data?.basicInfo?.title && (
              <div className="preview-item">
                <span>Title:</span>
                <span>{template.template_data.basicInfo.title}</span>
              </div>
            )}
            {template.template_data?.location?.type && (
              <div className="preview-item">
                <span>Type:</span>
                <span>{template.template_data.location.type}</span>
              </div>
            )}
            {template.template_data?.privacy?.maxAttendees && (
              <div className="preview-item">
                <span>Attendees:</span>
                <span>{template.template_data.privacy.maxAttendees}</span>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EventTemplates;