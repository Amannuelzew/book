import { useFormStatus } from "react-dom";
import { Button } from "@mui/material";

const Submit = ({ label, ...btnprop }: { label: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button {...btnprop} type="submit" disabled={pending} variant="contained">
      {label}
    </Button>
  );
};

export default Submit;
