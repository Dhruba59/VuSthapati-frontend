import React from 'react';
import { Button } from './ui/button';
import { Github, Linkedin, LocateIcon, Mail, MapIcon, MapPin, PhoneCallIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from './data-provider';
import { ContactInfo } from '@/lib/models';
import { contactApi } from '@/lib/api';

const Footer = async () => {
    const contactInfo: ContactInfo =  await contactApi.getAll();
    
    return (
        <footer className="w-full border-t py-6 md:py-4 px-4 md:px-16 lg:px-20">
            <div className="flex flex-col items-center justify-between mx-auto w-full gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
                © {new Date().getFullYear()} <a href="mailto:dhruba59.sust@gmail.com" className="text-blue-400 hover:underline">Dhruba</a>. All rights reserved.
            </p>
            <div className='font-sans flex flex-col justify-center text-center md:text-start md:flex-row gap-2 items-center'>
                <div><Image src="/assets/logo.jpg" alt="Logo" width={100} height={100} className="w-36 mt-2" /></div>
                <div className='flex flex-col gap-3'>
                <div className="mt-4 text-sm text-neutral-800">
                    <p className='text-subheader mb-2 font-bold text-[#c8553e]'>VU-STHAPATI</p>
                    <p>{contactInfo?.address?.street + ', ' + contactInfo?.address?.city}<br></br>{contactInfo?.address?.country}</p>
                    {/* <p>Phone: +1 (123) 456-7890</p> */}
                    {/* <p>Email: <a href="mailto:yourname@example.com" className="text-blue-400 hover:underline">yourname@example.com</a></p> */}
                </div>
                <div className="flex gap-4 justify-center md:justify-start">
                    <Button variant="ghost" size="icon" asChild>
                    <Link
                        href={`tel:${contactInfo.primaryPhone}`}
                        aria-label="Phone"
                    >
                        <PhoneCallIcon className="h-5 w-5" />
                    </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                    <Link href={`mailto:${contactInfo.primaryEmail}`} aria-label="Email">
                        <Mail className="h-5 w-5" />
                    </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                    <Link
                        href={`https://www.google.com/maps?q=${encodeURIComponent(contactInfo?.address?.street + ', ' + contactInfo?.address?.city + ', ' + contactInfo?.address?.country)}`}
                        target="_blank"
                        aria-label="Google Maps"
                    >
                        <MapPin className="h-5 w-5" />
                    </Link>
                    </Button>

                </div>
                </div>
            </div>
            </div>
        </footer>
    );
};

export default Footer;