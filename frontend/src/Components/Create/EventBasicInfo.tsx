import { useState, useEffect } from 'react';
import { FaTags, FaClipboardList, FaLayerGroup } from 'react-icons/fa';

interface EventBasicInfoProps {
  data: {
    title: string;
    description: string;
    category: string;
    tags: string[];
    template: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  errors?: Record<string, string>;
}

const EventBasicInfo = ({ data, onUpdate, onNext }: EventBasicInfoProps) => {
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  // Simulated AI suggestions based on title and description
  useEffect(() => {
    if (data.title || data.description) {
      // This would be replaced with actual AI-powered suggestions
      const mockSuggestions = ['professional', 'networking', 'technology', 'business'];
      setSuggestedTags(mockSuggestions);
    }
  }, [data.title, data.description]);

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
    onUpdate({ tags });
  };

  return (
    <div className="form-section">
      <h3 className="section-title">Event Details</h3>
      
      <div className="form-group">
        <label className="form-label">
          Event Title
          <span className="required">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          value={data.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Give your event a catchy title"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Description
          <span className="required">*</span>
        </label>
        <textarea
          className="form-input"
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe what makes your event special"
          rows={4}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          <FaTags className="input-icon" />
          Tags
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Add tags separated by commas"
          onChange={(e) => handleTagsChange(e.target.value)}
          defaultValue={data.tags.join(', ')}
        />
        {suggestedTags.length > 0 && (
          <div className="tag-suggestions">
            <p>Suggested tags:</p>
            <div className="suggested-tags">
              {suggestedTags.map((tag, index) => (
                <button
                  key={index}
                  className="tag-suggestion"
                  onClick={() => handleTagsChange([...data.tags, tag].join(', '))}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          <FaClipboardList className="input-icon" />
          Template
        </label>
        <select
          className="form-input"
          onChange={(e) => onUpdate({ template: e.target.value })}
          value={data.template}
        >
          <option value="">Start from scratch</option>
          <option value="conference">Professional Conference</option>
          <option value="workshop">Interactive Workshop</option>
          <option value="webinar">Virtual Webinar</option>
          <option value="networking">Networking Event</option>
          <option value="training">Training Session</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">
          <FaLayerGroup className="input-icon" />
          Category
        </label>
        <select
          className="form-input"
          value={data.category}
          onChange={(e) => onUpdate({ category: e.target.value })}
        >
          <option value="">Select category</option>
          <option value="conference">Conference</option>
          <option value="workshop">Workshop</option>
          <option value="seminar">Seminar</option>
          <option value="networking">Networking</option>
          <option value="training">Training</option>
          <option value="social">Social Gathering</option>
          <option value="corporate">Corporate Event</option>
        </select>
      </div>

      <div className="button-group">
        <button 
          className="btn-next" 
          onClick={onNext}
          disabled={!data.title || !data.description}
        >
          Continue to Date & Time
        </button>
      </div>
    </div>
  );
};

export default EventBasicInfo;