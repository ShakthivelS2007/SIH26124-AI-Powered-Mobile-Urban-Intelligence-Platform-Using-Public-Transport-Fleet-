import { useState } from 'react';
import { saveCitizenComplaint } from '../../utils/citizenComplaints';

const DEFECT_TYPE_OPTIONS = [
  { value: 'pothole', label: 'Pothole' },
  { value: 'waterlogging', label: 'Waterlogging' },
  { value: 'traffic_congestion', label: 'Traffic Congestion' },
  { value: 'sign', label: 'Missing Sign' }
];

function CameraIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
        stroke="var(--color-citizen-accent)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="3.5" stroke="var(--color-citizen-accent)" strokeWidth="1.6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'spin 0.7s linear infinite' }}
    >
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function ComplaintForm({ aadhaarDigits, onSubmitted }) {
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [geo, setGeo] = useState(null);
  const [geoError, setGeoError] = useState('');
  const [defectType, setDefectType] = useState('');
  const [location, setLocation] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(reader.result);
    reader.readAsDataURL(file);

    setGeoError('');
    setGeo(null);
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported on this device.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setGeoError('Could not access location. Please allow location access and retry.'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function handleRemovePhoto() {
    setPhotoDataUrl(null);
    setGeo(null);
    setGeoError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!photoDataUrl) {
      setFormError('A geotagged photo is required.');
      return;
    }
    if (!geo) {
      setFormError('Location could not be captured from the photo. Please retry adding the photo.');
      return;
    }
    if (!defectType) {
      setFormError('Please select a defect type.');
      return;
    }

    setFormError('');
    setSubmitting(true);

    const complaint = {
      bus_id: `Citizen Report (${aadhaarDigits.slice(-4)})`,
      type: defectType,
      lat: geo.lat,
      lng: geo.lng,
      location: location.trim() || null,
      img_url: photoDataUrl
    };

    try {
      await saveCitizenComplaint(complaint);
      onSubmitted();
    } catch (err) {
      setFormError(
        `Could not submit complaint: ${err.message}. Check your connection and try again.`
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
        Complaint Details
      </h2>
      <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 24px' }}>
        Fields marked <span style={{ color: '#dc2626' }}>*</span> are required.
      </p>

      <SectionLabel required>Geotagged Photo</SectionLabel>

      {!photoDataUrl ? (
        <label style={dropzoneStyle}>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
          <CameraIcon />
          <span style={{ fontSize: 13.5, fontWeight: 600, color: '#334155', marginTop: 10 }}>
            Tap to take or upload a photo
          </span>
          <span style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
            Your current location will be tagged automatically
          </span>
        </label>
      ) : (
        <div style={{ position: 'relative', marginBottom: 8 }}>
          <img
            src={photoDataUrl}
            alt="Selected defect"
            style={{ width: '100%', borderRadius: 12, display: 'block' }}
          />
          <button
            type="button"
            onClick={handleRemovePhoto}
            aria-label="Remove photo"
            style={removePhotoButtonStyle}
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {geo && (
        <p
          style={{
            fontSize: 12.5,
            color: 'var(--color-citizen-accent)',
            fontWeight: 600,
            margin: '10px 0 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 5
          }}
        >
          📍 Location tagged: {geo.lat.toFixed(5)}, {geo.lng.toFixed(5)}
        </p>
      )}
      {geoError && <ErrorBanner style={{ marginTop: 10 }}>{geoError}</ErrorBanner>}
      {!geo && !geoError && photoDataUrl && (
        <p style={{ fontSize: 12.5, color: '#94a3b8', margin: '10px 0 20px' }}>
          Tagging location...
        </p>
      )}

      <SectionLabel required>Defect Type</SectionLabel>
      <div style={{ position: 'relative', marginBottom: 22 }}>
        <select
          value={defectType}
          onChange={(e) => setDefectType(e.target.value)}
          onFocus={() => setFocusedField('type')}
          onBlur={() => setFocusedField(null)}
          style={{ ...fieldStyle(focusedField === 'type'), appearance: 'none' }}
        >
          <option value="">Select a defect type...</option>
          {DEFECT_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span style={selectChevronStyle}>▾</span>
      </div>

      <SectionLabel>Location Description (optional)</SectionLabel>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onFocus={() => setFocusedField('location')}
        onBlur={() => setFocusedField(null)}
        placeholder="e.g. Near Anna Salai bus stop"
        style={{ ...fieldStyle(focusedField === 'location'), marginBottom: 24 }}
      />

      {formError && <ErrorBanner style={{ marginBottom: 16 }}>{formError}</ErrorBanner>}

      <button type="submit" disabled={submitting} style={submitButtonStyle(submitting)}>
        {submitting && <Spinner />}
        {submitting ? 'Submitting...' : 'Submit Complaint'}
      </button>
    </form>
  );
}

function SectionLabel({ children, required }) {
  return (
    <label
      style={{
        display: 'block',
        fontSize: 12.5,
        fontWeight: 600,
        color: '#334155',
        marginBottom: 8
      }}
    >
      {children} {required && <span style={{ color: '#dc2626' }}>*</span>}
    </label>
  );
}

function ErrorBanner({ children, style }) {
  return (
    <div
      style={{
        fontSize: 12.5,
        color: '#dc2626',
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: 8,
        padding: '8px 12px',
        ...style
      }}
    >
      {children}
    </div>
  );
}

const dropzoneStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px 20px',
  border: '2px dashed var(--color-citizen-border)',
  borderRadius: 14,
  background: 'var(--color-citizen-accent-bg)',
  cursor: 'pointer',
  marginBottom: 8
};

const removePhotoButtonStyle = {
  position: 'absolute',
  top: 10,
  right: 10,
  width: 30,
  height: 30,
  borderRadius: '50%',
  background: 'rgba(15, 23, 42, 0.6)',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
};

function fieldStyle(focused) {
  return {
    width: '100%',
    padding: '13px 14px',
    fontSize: 14,
    border: `1.5px solid ${focused ? 'var(--color-citizen-accent)' : 'var(--color-citizen-border)'}`,
    borderRadius: 10,
    outline: 'none',
    boxSizing: 'border-box',
    background: '#ffffff',
    color: '#0f172a',
    boxShadow: focused ? '0 0 0 3px rgba(37, 99, 235, 0.12)' : 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
  };
}

const selectChevronStyle = {
  position: 'absolute',
  right: 14,
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  color: '#94a3b8',
  fontSize: 12
};

function submitButtonStyle(submitting) {
  return {
    width: '100%',
    padding: '15px',
    fontSize: 15,
    fontWeight: 600,
    color: '#ffffff',
    background: 'var(--color-citizen-accent)',
    border: 'none',
    borderRadius: 10,
    cursor: submitting ? 'default' : 'pointer',
    opacity: submitting ? 0.75 : 1,
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  };
}