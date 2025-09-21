import { useLocation } from "react-router-dom";
import { TimeSlotSelect } from "./time-slot";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useSeatFormStore } from "@/store/seat-form-store";
import { useEffect } from "react";
import { FOOD_COURT_FORM_FIELDS, EVENT_FORM_FIELDS } from "../../data/form-fields-data"



export default function SeatForm({ table }: { table?: string }) {


  const { name, email, phone, setField } = useSeatFormStore();

  const location = useLocation();
  const path = location.pathname;

  const FIELDS = path.includes('/events/booking') ? EVENT_FORM_FIELDS : FOOD_COURT_FORM_FIELDS;

  useEffect(() => {
    if (table && path.includes('events')) {
      setField("tableId", table);
    }
  }, [table, path, setField]);

  const renderField = (field: any) => {
    const fieldValue = field.id === 'table-id' ? table :
      field.id === 'name' ? name :
        field.id === 'email' ? email :
          field.id === 'phone' ? phone : '';

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
            onChange={(e) => setField(field.id.replace('-', ''), e.target.value)}
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
                setField(field.id.replace('-', ''), file.name);
              }
            }}
          />
        ) : field.element === 'select' ? (

          field.id === 'time-slot' ? (
            <TimeSlotSelect />
          ) : (
            <Select
              disabled={field.disabled}
              onValueChange={(value) => setField(field.id.replace('-', ''), value)}
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
