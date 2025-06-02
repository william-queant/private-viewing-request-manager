import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Box, Button, Text } from "@radix-ui/themes";
import { Label, Select } from "radix-ui";
import { useEffect, useState } from "react";
import { convert24hoursTo12, getAMPM } from "~/utils/time";

interface SelectTimeProps {
  name: string;
  label: string;
  selectedTime: string;
  onSelectedTime: (time: string) => void;
}

interface TimeSelectorProps {
  id: string;
  defaultValue?: string;
  options: () => React.ReactNode;
  onValueChange: (value: string) => void;
}

const TimeSelector = (props: TimeSelectorProps) => {
  const { defaultValue, id, options, onValueChange } = props;
  return (
    <Select.Root defaultValue={defaultValue} onValueChange={onValueChange}>
      <Select.Trigger
        id={id}
        style={{
          width: "auto",
          borderRadius: "var(--radius-4)",
          marginInline: "var(--space-1)",
          padding: "var(--space-1) 0 var(--space-1) var(--space-2)",
        }}
      >
        <Select.Value placeholder="Hours" />
        <Select.Icon style={{ padding: "0 0 0 var(--space-1)" }}>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          style={{
            opacity: 1,
            border: "1px solid var(--gray-6)",
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {options()}
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export function SelectTime(props: SelectTimeProps) {
  const { name: id, label, selectedTime, onSelectedTime } = props;

  const hoursId = `${id}-hours`;
  const minutesId = `${id}-minutes`;

  // Split the selected time into hours and minutes
  // hours in 24h Format
  const [hours, setHours] = useState<string>(
    selectedTime.split(":")[0] || "00"
  );
  const [minutes, setMinutes] = useState<string>(
    selectedTime.split(":")[1] || "00"
  );

  useEffect(() => {
    const time = `${hours}:${minutes || "00"}`;
    onSelectedTime(time);
  }, [hours, minutes, onSelectedTime]);

  const handleHourChange = (value: string) => {
    setHours(value);
  };
  const handleMinuteChange = (value: string) => {
    setMinutes(value);
  };
  const handleAMPMChange = () => {
    const currentAMPM = getAMPM(hours);

    if (currentAMPM === "AM") {
      // Convert to PM
      const newHour = (parseInt(hours, 10) + 12) % 24; // Convert to 24-hour format
      setHours(newHour.toString().padStart(2, "0"));
    } else {
      // Convert to AM
      const newHour = (parseInt(hours, 10) - 12 + 24) % 24; // Convert to 24-hour format
      setHours(newHour.toString().padStart(2, "0"));
    }
  };

  const TimeOptions = (
    id: string,
    unit: "hours" | "minutes",
    steps: number = 1
  ) => {
    const length = unit === "hours" ? 12 : 60 / steps;
    const start = unit === "hours" ? 1 : 0;

    const options = Array.from({ length }, (_, i) => {
      const roundedValue = (i + start) * steps;
      const value = `${roundedValue}`.padStart(2, "0");
      const key = `${id}-${value}`;

      return (
        <Select.Item key={key} value={value}>
          <Select.ItemText>
            <Text size="3">{value}</Text>
          </Select.ItemText>
        </Select.Item>
      );
    });

    return <Select.Viewport>{options}</Select.Viewport>;
  };

  return (
    <Box style={{ marginTop: "20px" }}>
      <Label.Root className="LabelRoot" htmlFor={hoursId}>
        <Text style={{ display: "inline-flex", minWidth: "50px" }}>
          {label}
        </Text>
      </Label.Root>
      <TimeSelector
        options={() => TimeOptions(hoursId, "hours")}
        id={hoursId}
        defaultValue={convert24hoursTo12(hours).hour}
        onValueChange={handleHourChange}
      />
      <Text size="2">:</Text>
      <TimeSelector
        options={() => TimeOptions(minutesId, "minutes", 15)}
        id={minutesId}
        defaultValue={minutes}
        onValueChange={handleMinuteChange}
      />

      <Button onClick={handleAMPMChange}>{getAMPM(hours)}</Button>
    </Box>
  );
}
