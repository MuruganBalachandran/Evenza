import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addEvent, setLoading, setError } from '../../store/slices/eventSlice';
import 'react-toastify/dist/ReactToastify.css';
import './Create.css';
import EventTemplates, { Template } from '../../Components/Create/EventTemplates';
import EventBasicInfo from '../../Components/Create/EventBasicInfo';
import EventDateTime from '../../Components/Create/EventDateTime';
import EventLocation from '../../Components/Create/EventLocation';
import EventBranding from '../../Components/Create/EventBranding';
import EventPrivacy from '../../Components/Create/EventPrivacy';
import PreviewPanel from '../../Components/Create/PreviewPanel';
import { useAuth } from '../../context/AuthContext';
import { buildApiUrl } from '../../config/api';



const Create = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.events);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [eventData, setEventData] = useState({
    basicInfo: {
      title: '',
      description: '',
      category: '',
      tags: [] as string[],
      template: ''
    },
    dateTime: {
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      timezone: ''
    },
    location: {
      type: 'physical' as 'physical' | 'hybrid' | 'online',
      venue: '',
      address: '',
      platform: '',
      meetingLink: '',
      coordinates: null
    },
    branding: {
      banner: null,
      color: '#646cff',
      logo: null
    },
    privacy: {
      type: 'public',
      maxAttendees: 100,
      accessType: 'public',
      password: '',
      enableWaitlist: false
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(buildApiUrl('templates'));
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast.error('Failed to load templates');
        if (error instanceof Error) {
          dispatch(setError(error.message));
        } else {
          dispatch(setError('An unknown error occurred'));
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTemplates();
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      // Fetch event data for editing
      // This is a mock implementation - replace with actual API call
      const mockEvent = {
        basicInfo: {
          title: 'Tech Conference 2025',
          description: 'Join us for an immersive tech conference',
          category: 'conference',
          tags: ['tech', 'conference', 'networking'],
          template: ''
        },
        dateTime: {
          startDate: '2025-04-15',
          endDate: '2025-04-15',
          startTime: '09:00',
          endTime: '17:00',
          timezone: 'UTC'
        },
        location: {
          type: 'hybrid' as 'physical' | 'hybrid' | 'online',
          venue: 'Tech Center',
          address: '123 Innovation St',
          platform: 'zoom',
          meetingLink: 'https://zoom.us/j/123456789',
          coordinates: null
        },
        branding: {
          banner: null,
          color: '#646cff',
          logo: null
        },
        privacy: {
          type: 'public',
          maxAttendees: 500,
          accessType: 'public',
          password: '',
          enableWaitlist: true
        }
      };

      setEventData(mockEvent);
    }
  }, [id]);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setShowForm(true);
    
    setEventData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        title: template.template_data?.basicInfo?.title || '',
        description: template.template_data?.basicInfo?.description || '',
        category: template.template_data?.basicInfo?.category || '',
        tags: template.template_data?.basicInfo?.tags || [],
        template: template._id
      },
      location: {
        ...prev.location,
        type: (template.template_data?.location?.type || 'physical') as 'physical' | 'hybrid' | 'online'
      },
      branding: {
        ...prev.branding,
        color: template.template_data?.branding?.color || '#646cff'
      },
      privacy: {
        ...prev.privacy,
        accessType: template.template_data?.privacy?.accessType || 'public',
        maxAttendees: template.template_data?.privacy?.maxAttendees || prev.privacy.maxAttendees
      }
    }));
  };

  const handleCreateNew = () => {
    setSelectedTemplate(null);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    try {
      // Transform the event data to match the backend schema
      const eventPayload = {
        title: eventData.basicInfo.title,
        description: eventData.basicInfo.description,
        category: eventData.basicInfo.category,
        tags: eventData.basicInfo.tags,
        start_time: new Date(`${eventData.dateTime.startDate}T${eventData.dateTime.startTime}`),
        end_time: new Date(`${eventData.dateTime.endDate}T${eventData.dateTime.endTime}`),
        venue_type: eventData.location.type,
        venue_details: {
          venue: eventData.location.venue,
          address: eventData.location.address,
          meetingLink: eventData.location.meetingLink
        },
        attendee_limit: eventData.privacy.maxAttendees,
        status: 'draft',
        banner_url: eventData.branding.banner,
        user_id: user?._id,
        created_at: new Date(),
        updated_at: new Date()
      };

      const response = await fetch(buildApiUrl('events'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(eventPayload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create event');
      }

      const newEvent = await response.json();
      dispatch(addEvent(newEvent));
      navigate('/my-events');
    } catch (error) {
      console.error('Error creating event:', error);
      dispatch(setError(error instanceof Error ? error.message : 'Failed to create event'));
      toast.error('Failed to create event. Please check all required fields.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!eventData.basicInfo.title) {
          newErrors.title = 'Title is required';
        }
        if (!eventData.basicInfo.category) {
          newErrors.category = 'Category is required';
        }
        break;
      case 2:
        if (!eventData.dateTime.startDate) {
          newErrors.startDate = 'Start date is required';
        }
        if (!eventData.dateTime.startTime) {
          newErrors.startTime = 'Start time is required';
        }
        break;
      // Add validation for other steps
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const updateEventData = (section: keyof typeof eventData, data: any) => {
    setEventData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!showForm) {
    return (
      <div className="create-page">
        <div className="create-container">
          <div className="create-content center-content">
            <div className="initial-view">
              <button className="add-event-btn" onClick={handleCreateNew}>
                <span className="plus-icon">+</span>
                <span>Create New Event</span>
              </button>
              
              <div className="templates-section">
                <h2>Start with a template</h2>
                <p>Choose from our pre-configured event templates</p>
                <EventTemplates 
                  templates={templates}
                  onSelectTemplate={handleTemplateSelect}
                  selectedTemplateId={selectedTemplate?._id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderForm = () => (
    <AnimatePresence mode='wait'>
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep === 1 && (
          <EventBasicInfo 
            data={eventData.basicInfo}
            onUpdate={(data: any) => updateEventData('basicInfo', data)}
            onNext={handleNext}
            errors={errors}
          />
        )}
        {currentStep === 2 && (
          <EventDateTime 
            data={eventData.dateTime}
            onUpdate={(data: any) => updateEventData('dateTime', data)}
            onNext={handleNext}
            onBack={() => setCurrentStep(1)}
            errors={errors}
          />
        )}
        {currentStep === 3 && (
          <EventLocation 
            data={eventData.location}
            onUpdate={(data: any) => updateEventData('location', data)}
            onNext={handleNext}
            onBack={() => setCurrentStep(2)}
            errors={errors}
          />
        )}
        {currentStep === 4 && (
          <EventBranding 
            data={eventData.branding}
            onUpdate={(data: any) => updateEventData('branding', data)}
            onNext={handleNext}
            onBack={() => setCurrentStep(3)}
            errors={errors}
          />
        )}
        {currentStep === 5 && (
          <EventPrivacy 
            data={eventData.privacy}
            onUpdate={(data: any) => updateEventData('privacy', data)}
            onBack={() => setCurrentStep(4)}
            onSubmit={handleSubmit}
            errors={errors}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="create-page">
      <ToastContainer position="top-right" />
      <div className="create-container">
        <div className="create-content">
          <header className="create-header">
            <h1>{id ? 'Edit Event' : selectedTemplate ? `Create ${selectedTemplate.name}` : 'Create Event'}</h1>
            <p>Where Ideas Become Experiences</p>
          </header>

          <div className="create-progress">
            <div className={`progress-bar step-${currentStep}`} />
          </div>

          <div className="create-form">
            {renderForm()}
          </div>
        </div>

        <PreviewPanel eventData={eventData} />
      </div>
    </div>
  );
};

export default Create;