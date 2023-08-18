import ProgressBar from "react-bootstrap/ProgressBar";

function Meta({ porcentage }) {
  const now = porcentage;
  return (
    <ProgressBar variant="warning" now={now} animated={45} label={`${now}%`} />
  );
}

export default Meta;
