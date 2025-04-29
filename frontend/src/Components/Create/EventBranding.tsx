import React, { useState } from 'react';
import { FaImage, FaPalette, FaUpload } from 'react-icons/fa';

interface EventBrandingProps {
  data: {
    banner: any;
    color: string;
    logo: any;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  errors?: Record<string, string>;
}

const EventBranding: React.FC<EventBrandingProps> = ({ data, onUpdate, onNext, onBack }) => {
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const [logoPreview, setLogoPreview] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'logo') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'banner') {
          setBannerPreview(reader.result as string);
          onUpdate({ banner: file });
        } else {
          setLogoPreview(reader.result as string);
          onUpdate({ logo: file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-section">
      <h3 className="section-title">Event Branding</h3>

      <div className="form-group">
        <label className="form-label">
          <FaImage className="input-icon" />
          Event Banner
        </label>
        <div className="upload-container">
          <input
            type="file"
            id="banner-upload"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'banner')}
            style={{ display: 'none' }}
          />
          <label htmlFor="banner-upload" className="upload-button">
            <FaUpload />
            <span>Upload Banner</span>
          </label>
        </div>
        {bannerPreview && (
          <div className="image-preview">
            <img src={bannerPreview} alt="Banner preview" />
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          <FaPalette className="input-icon" />
          Theme Color
        </label>
        <input
          type="color"
          className="form-input color-picker"
          value={data.color}
          onChange={(e) => onUpdate({ color: e.target.value })}
        />
        <div className="color-preview" style={{ backgroundColor: data.color }}>
          {data.color}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          <FaImage className="input-icon" />
          Event Logo
        </label>
        <div className="upload-container">
          <input
            type="file"
            id="logo-upload"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'logo')}
            style={{ display: 'none' }}
          />
          <label htmlFor="logo-upload" className="upload-button">
            <FaUpload />
            <span>Upload Logo</span>
          </label>
        </div>
        {logoPreview && (
          <div className="image-preview logo-preview">
            <img src={logoPreview} alt="Logo preview" />
          </div>
        )}
      </div>

      <div className="button-group">
        <button className="btn-back" onClick={onBack}>
          Back to Location
        </button>
        <button 
          className="btn-next" 
          onClick={onNext}
        >
          Continue to Privacy
        </button>
      </div>
    </div>
  );
};

export default EventBranding;