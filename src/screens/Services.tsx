import { useState, useEffect } from "react";
import servicesService from "../services/servicesService";
import { Service } from "../types";

const Services = () => {
  const [services, setServices] = useState<Array<Service> | undefined>(
    undefined
  );
  useEffect(() => {
    servicesService.getAllServices().then((res) => setServices(res));
  }, []);
  return (
    <>
      {services && services.length == 0 && (
        <p>There are no services registered</p>
      )}
      {services &&
        services.length > 0 &&
        services.map((service) => (
          <div key={service.id}>
            <p>id: {service.id}</p>
            <p>name: {service.name}</p>
            <p>description: {service.description}</p>
            {/* <p>createdAt: {service.createdAt}</p> */}
            <p>apiKey: {service.apiKey}</p>
          </div>
        ))}
    </>
  );
};

export default Services;
