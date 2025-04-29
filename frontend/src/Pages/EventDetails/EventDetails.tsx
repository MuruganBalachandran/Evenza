import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { buildApiUrl } from '../../config/api';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  useAuth();
  const [, setEvent] = useState(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(buildApiUrl(`events/${id}`));
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);


  // Rest of the component code...
};

export default EventDetails;