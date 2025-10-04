import { useLocation } from "react-router-dom";
import { TimeSlotSelect } from "./time-slot";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FOOD_COURT_FORM_FIELDS, EVENT_FORM_FIELDS } from "../../data/form-fields-data"
import { useFoodCourtTableFormStore } from "@/store/food-court-store";
import { useFoodCourtEventFormStore } from "@/store/seat-form-store";



export default function SeatForm({ table }: { table?: string }) {
  const location = useLocation();
  const path = location.pathname;
  const isEventForm = path.includes('/events/booking');

  // Use appropriate store based on route
  const foodCourtStore = useFoodCourtTableFormStore();
  const eventStore = useFoodCourtEventFormStore();
  
  const currentStore = isEventForm ? eventStore : foodCourtStore;
  
  const FIELDS = isEventForm ? EVENT_FORM_FIELDS : FOOD_COURT_FORM_FIELDS;

  // Helper function to map form field IDs to store field names
  const getStoreFieldName = (fieldId: string) => {
    if (isEventForm) {
      // Event form field mappings
      const eventFieldMap: { [key: string]: string } = {
        'phone': 'phone',
        'adhaar-pan': 'adhaar_or_pan_card', 
        'guest-no': 'number_of_guest',
        'table-id': 'table_id',
        'name': 'name',
        'email': 'email'
      };
      return eventFieldMap[fieldId] || fieldId;
    } else {
      // Food court field mappings
      const foodCourtFieldMap: { [key: string]: string } = {
        'phone': 'phone_number',
        'adhaar-pan': 'adhaar_or_pan_card', 
        'guest-no': 'number_of_guest',
        'time-slot': 'time_slot',
        'name': 'name',
        'email': 'email',
        'preference': 'preference'
      };
      return foodCourtFieldMap[fieldId] || fieldId;
    }
  };

  // Helper function to get field value from appropriate store
  const getFieldValue = (fieldId: string) => {
    if (fieldId === 'table-id') {
      if (isEventForm) {
        // For events, get table_id array from store and join as string
        const tableIds = (currentStore as any).table_id;
        return Array.isArray(tableIds) ? tableIds.join(", ") : "";
      }
      // For other forms, use the table prop if provided
      return table || "";
    }
    
    // Handle file input display
    if (fieldId === 'adhaar-pan') {
      if (!isEventForm) {
        const file = foodCourtStore.adhaar_or_pan_card;
        return file ? file.name : "";
      } else {
        const file = eventStore.adhaar_or_pan_card;
        return file ? file.name : "";
      }
    }
    
    const storeFieldName = getStoreFieldName(fieldId);
    return (currentStore as any)[storeFieldName] || "";
  };

  // Helper function to set field value in appropriate store
  const setFieldValue = (fieldId: string, value: string) => {
    const storeFieldName = getStoreFieldName(fieldId);
    
    // Handle table_id as array for events
    if (fieldId === 'table-id' && isEventForm) {
      // Convert comma-separated string back to array
      const tableArray = value.split(',').map(s => s.trim()).filter(Boolean);
      (currentStore as any).setField(storeFieldName, tableArray);
    } else {
      (currentStore as any).setField(storeFieldName, value);
    }
  };

  const renderField = (field: any) => {
    const fieldValue = getFieldValue(field.id);

    return (
      <div key={field.id} className="space-y-2">
        <Label htmlFor={field.id} className="text-sm font-medium text-gray-700">
          {field.title}
        </Label>
        {field.element === 'input' ? (
          <Input
            id={field.id}
            placeholder={field.placeholder}
            value={fieldValue}
            disabled={field.disabled}
            onChange={(e) => setFieldValue(field.id, e.target.value)}
          />
        ) : field.element === 'upload' ? (
          <Input
            id={field.id}
            type="file"
            accept="image/*"
            disabled={field.disabled}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Store the actual File object, not just the name
                if (!isEventForm) {
                  // For food court form, use setFile method
                  foodCourtStore.setFile(file);
                } else {
                  // For event form, use setFile method
                  eventStore.setFile(file);
                }
              }
            }}
          />
        ) : field.element === 'select' ? (

          field.id === 'time-slot' ? (
            <TimeSlotSelect />
          ) : (
            <Select
              disabled={field.disabled}
              value={fieldValue}
              onValueChange={(value) => setFieldValue(field.id, value)}
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
               
                {field.options?.map((option: any, index: number) => (
                  <SelectItem key={index} value={String(option)}>
                    {typeof option === 'string' ? option : String(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        ) : null}


        {field.warning && (
          <p className="text-sm text-orange-600 mt-1 font-medium">
            📞 {field.warning.message}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {FIELDS.map((field) => renderField(field))}
    </div>
  );
}
