import { Link } from "@mui/material";

const Submit = ({ label, ...btnprop }: { label: string }) => {
  return <Link {...btnprop}>{label}</Link>;
};

export default Submit;
