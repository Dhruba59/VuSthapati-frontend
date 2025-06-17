import { contactApi } from "@/lib/api";
import { ContactInfo } from "@/lib/models";
import { MapPin } from "lucide-react";

export default async function AddressCard () {
      const contactInfo: ContactInfo =  await contactApi.getAll();
  
  return (
    <div className="w-full md:min-w-96 max-w-lg mx-auto bg-muted text-neutral-800 p-4 rounded-lg shadow-lg">
      {/* Map Section */}
      <div className="w-full h-60 rounded-md overflow-hidden mb-4">
        <iframe
          title="Architects Rono"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57903.062360048214!2d91.81983581900654!3d24.89998049302305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375054d3d270329f%3A0xf58ef93431f67382!2sSylhet!5e0!3m2!1sen!2sbd!4v1742579018687!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div>

      {/* Address Section */}
      <div className="text-sm space-y-4">
        <h2 className="text-subheader font-extrabold text-custom2 mb-2 !my-6">{contactInfo.name}</h2>
        <div className="text-regular space-y-2">
          <p>{contactInfo.address.street}</p>
          <p>{contactInfo.address.city}{', '} {contactInfo.address.postalCode}{', '} {contactInfo.address.country}</p>
          <p>{contactInfo.primaryPhone}</p>
          <p>{contactInfo.primaryEmail}</p>
          <p>{contactInfo.secondaryEmails[0] ?? ''}</p>
        </div>
      </div>
    </div>
  );
}
