import Image from "next/image";
import SalesForm from "./components/SalesForm";
import Login from "./login/page";
import AppointmentForm from "./components/AppointmentForm";

export default function Home() {
  return (
    <div>
      <AppointmentForm />
    </div>
  );
}
