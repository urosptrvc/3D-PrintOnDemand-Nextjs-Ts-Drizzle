import { z } from "zod";

export const shippingFormSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    address: z.string().min(5, "Address is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    zip: z.string().min(3, "Valid zip code is required"),
    email: z.string().email("Invalid email address"),
  })
  .strip(); // This removes unknown keys from the validated object

export type ShippingFormValues = z.infer<typeof shippingFormSchema>;
