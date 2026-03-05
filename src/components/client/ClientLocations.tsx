import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { MapPin, Plus, Edit2, Trash2, Home, Building } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
  area: string;
  type: 'home' | 'office';
  isDefault: boolean;
}

export function ClientLocations() {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Home',
      address: '15 Gimbiya Street',
      area: 'Garki, Abuja',
      type: 'home',
      isDefault: true
    },
    {
      id: '2',
      name: 'Office',
      address: '42 Ademola Adetokunbo Crescent',
      area: 'Wuse 2, Abuja',
      type: 'office',
      isDefault: false
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: '',
    address: '',
    area: 'Garki',
    type: 'home' as 'home' | 'office'
  });

  const addLocation = () => {
    if (newLocation.name && newLocation.address) {
      setLocations([
        ...locations,
        {
          ...newLocation,
          id: Date.now().toString(),
          isDefault: locations.length === 0
        }
      ]);
      setNewLocation({ name: '', address: '', area: 'Garki', type: 'home' });
      setIsAdding(false);
    }
  };

  const deleteLocation = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const setAsDefault = (id: string) => {
    setLocations(locations.map(loc => ({
      ...loc,
      isDefault: loc.id === id
    })));
  };

  const areas = [
    'Garki', 'Wuse', 'Maitama', 'Asokoro', 'Gwarinpa', 
    'Kubwa', 'Lugbe', 'Karu', 'Jabi', 'Utako'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">My Locations</h2>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Location
        </Button>
      </div>

      {isAdding && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Location</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Location Name</Label>
              <Input
                id="name"
                placeholder="e.g., Home, Office, Parent's House"
                value={newLocation.name}
                onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                placeholder="e.g., 15 Gimbiya Street"
                value={newLocation.address}
                onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area</Label>
              <select
                id="area"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newLocation.area}
                onChange={(e) => setNewLocation({ ...newLocation, area: e.target.value })}
              >
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Location Type</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="home"
                    checked={newLocation.type === 'home'}
                    onChange={(e) => setNewLocation({ ...newLocation, type: 'home' })}
                  />
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="office"
                    checked={newLocation.type === 'office'}
                    onChange={(e) => setNewLocation({ ...newLocation, type: 'office' })}
                  />
                  <Building className="w-4 h-4" />
                  <span>Office</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={addLocation}>Add Location</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {locations.map((location) => (
          <Card key={location.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  {location.type === 'home' ? (
                    <Home className="w-6 h-6 text-primary" />
                  ) : (
                    <Building className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{location.name}</h3>
                  {location.isDefault && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-muted rounded-lg">
                  <Edit2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button 
                  className="p-2 hover:bg-muted rounded-lg"
                  onClick={() => deleteLocation(location.id)}
                  disabled={location.isDefault}
                >
                  <Trash2 className={`w-4 h-4 ${location.isDefault ? 'text-muted' : 'text-muted-foreground'}`} />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>{location.address}</p>
                  <p>{location.area}, Abuja</p>
                </div>
              </div>
            </div>

            {!location.isDefault && (
              <div className="mt-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setAsDefault(location.id)}
                >
                  Set as Default
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {locations.length === 0 && !isAdding && (
        <Card className="p-8 text-center">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No locations saved</p>
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Location
          </Button>
        </Card>
      )}
    </div>
  );
}
