import { useState, useEffect } from "react";
import servicesService from "../services/servicesService";
import { Service as ServiceType } from "../types";
import Service from "./Service";

const Services = () => {
  const [services, setServices] = useState<Array<ServiceType> | undefined>(
    undefined
  );
  useEffect(() => {
    servicesService.getAllServices().then((res) => setServices(res));
  }, []);
  return (
    <div className="py-6 px-8">
      {services && services.length == 0 && (
        <p>There are no services registered</p>
      )}
      {services && services.length > 0 && (
        <div className="flex flex-wrap flex-1 gap-8">
          {services.map((service) => (
            <Service service={service}></Service>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
