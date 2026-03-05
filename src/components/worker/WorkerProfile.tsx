import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Briefcase,
  Shield,
  FileText,
  Camera,
  Save,
  Edit2,
  CheckCircle2,
  Building,
  CreditCard,
  Bell
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../constants/services';

interface WorkerProfileProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    rating: number;
    totalJobs: number;
  };
}

export function WorkerProfile({ userData }: WorkerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: '15 Aguiyi Ironsi Street, Maitama, Abuja',
    dateOfBirth: '1990-05-15',
    gender: 'Female',
    emergencyContact: '+234 803 456 7890',
    bankName: 'First Bank of Nigeria',
    accountNumber: '3012345678',
    accountName: userData.name,
    idType: 'National ID',
    idNumber: 'NIN-12345678901',
    bio: 'Experienced cleaner with 5+ years in residential and commercial cleaning.',
    services: ['Cleaning', 'Laundry'],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    notifications: {
      newJobs: true,
      jobReminders: true,
      earnings: true,
      marketing: false
    }
  });

  const handleSave = () => {
    // In real app, would save to backend
    setIsEditing(false);
    console.log('Saving profile:', formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const verificationItems = [
    { label: 'Identity Verified', verified: true, icon: Shield },
    { label: 'Phone Verified', verified: true, icon: Phone },
    { label: 'Email Verified', verified: true, icon: Mail },
    { label: 'Bank Details Added', verified: true, icon: CreditCard },
    { label: 'Background Check', verified: false, icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">My Profile</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Profile Picture & Stats */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
                {userData.name.charAt(0).toUpperCase()}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="mt-4 text-center">
              <div className="flex items-center gap-2 justify-center">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-2xl font-bold">{userData.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-muted-foreground">{userData.totalJobs} Jobs Completed</p>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1 w-full p-2 border rounded-lg"
                  />
                ) : (
                  <p className="mt-1 font-medium">{formData.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1 w-full p-2 border rounded-lg"
                  />
                ) : (
                  <p className="mt-1 font-medium">{formData.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1 w-full p-2 border rounded-lg"
                  />
                ) : (
                  <p className="mt-1 font-medium">{formData.email}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="mt-1 w-full p-2 border rounded-lg"
                  />
                ) : (
                  <p className="mt-1 font-medium">{formData.dateOfBirth}</p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-1 w-full p-2 border rounded-lg"
                  />
                ) : (
                  <p className="mt-1 font-medium">{formData.address}</p>
                )}
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">About Me</label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="mt-1 w-full p-2 border rounded-lg"
                    rows={3}
                  />
                ) : (
                  <p className="mt-1 text-muted-foreground">{formData.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Services Offered */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Services Offered
        </h3>
        {isEditing ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SERVICE_CATEGORIES.map(service => (
              <label key={service.id} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-muted">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service.name)}
                  onChange={(e) => {
                    const newServices = e.target.checked
                      ? [...formData.services, service.name]
                      : formData.services.filter(s => s !== service.name);
                    handleInputChange('services', newServices);
                  }}
                  className="w-4 h-4"
                />
                <span className="text-sm">{service.name}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {formData.services.map(service => (
              <Badge key={service} variant="secondary" className="px-3 py-1">
                {service}
              </Badge>
            ))}
          </div>
        )}
      </Card>

      {/* Availability */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Weekly Availability
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(formData.availability).map(([day, available]) => (
            <label
              key={day}
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
                available ? 'bg-primary/5 border-primary' : 'bg-muted'
              }`}
            >
              <span className="font-medium capitalize">{day}</span>
              {isEditing ? (
                <input
                  type="checkbox"
                  checked={available}
                  onChange={(e) => handleInputChange('availability', {
                    ...formData.availability,
                    [day]: e.target.checked
                  })}
                  className="w-4 h-4"
                />
              ) : (
                available && <CheckCircle2 className="w-5 h-5 text-primary" />
              )}
            </label>
          ))}
        </div>
      </Card>

      {/* Bank Details */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Bank Account Details
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Bank Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                className="mt-1 w-full p-2 border rounded-lg"
              />
            ) : (
              <p className="mt-1 font-medium">{formData.bankName}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Account Number</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                className="mt-1 w-full p-2 border rounded-lg"
              />
            ) : (
              <p className="mt-1 font-medium">{formData.accountNumber}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Account Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.accountName}
                onChange={(e) => handleInputChange('accountName', e.target.value)}
                className="mt-1 w-full p-2 border rounded-lg"
              />
            ) : (
              <p className="mt-1 font-medium">{formData.accountName}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Verification Status */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Verification Status
        </h3>
        <div className="space-y-3">
          {verificationItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${item.verified ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.verified ? (
                <Badge className="bg-green-500 hover:bg-green-500">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="secondary">Pending</Badge>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Preferences
        </h3>
        <div className="space-y-3">
          {Object.entries(formData.notifications).map(([key, enabled]) => (
            <label key={key} className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer">
              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => handleInputChange('notifications', {
                  ...formData.notifications,
                  [key]: e.target.checked
                })}
                disabled={!isEditing}
                className="w-4 h-4"
              />
            </label>
          ))}
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Emergency Contact
        </h3>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
          {isEditing ? (
            <input
              type="tel"
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              className="mt-1 w-full p-2 border rounded-lg"
            />
          ) : (
            <p className="mt-1 font-medium">{formData.emergencyContact}</p>
          )}
        </div>
      </Card>

      {/* ID Verification */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Identity Documents
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">ID Type</label>
            {isEditing ? (
              <select
                value={formData.idType}
                onChange={(e) => handleInputChange('idType', e.target.value)}
                className="mt-1 w-full p-2 border rounded-lg"
              >
                <option>National ID</option>
                <option>Driver's License</option>
                <option>Voter's Card</option>
                <option>Passport</option>
              </select>
            ) : (
              <p className="mt-1 font-medium">{formData.idType}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">ID Number</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                className="mt-1 w-full p-2 border rounded-lg"
              />
            ) : (
              <p className="mt-1 font-medium">{formData.idNumber}</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}