import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { printOrderAtom } from "@/lib/store";
import { useAtomValue } from "jotai";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  shippingFormSchema,
  ShippingFormValues,
} from "@/lib/validation/validateOrder";

export default function PaymentPage() {
  const printOrder = useAtomValue(printOrderAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize react-hook-form with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      city: "",
      country: "",
      zip: "",
      email: "",
    },
  });

  const subtotal = 99.98;
  const shippingCost = 5.0;
  const total = subtotal + shippingCost;

  const onSubmit = async (data: ShippingFormValues) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {isSuccess ? (
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-800">
            Your order has been successfully placed! You will receive a
            confirmation email shortly.
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      {...register("name")}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@example.com"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St"
                      {...register("address")}
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Belgrade"
                        {...register("city")}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="zip">Zip Code</Label>
                      <Input
                        id="zip"
                        placeholder="11000"
                        {...register("zip")}
                        className={errors.zip ? "border-red-500" : ""}
                      />
                      {errors.zip && (
                        <p className="text-red-500 text-xs">
                          {errors.zip.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="Serbia"
                        {...register("country")}
                        className={errors.country ? "border-red-500" : ""}
                      />
                      {errors.country && (
                        <p className="text-red-500 text-xs">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input
                        id="phone"
                        placeholder="+381 69 1234 123"
                        {...register("phone")}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col min-h-[400px] pb-0">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Item</span>
                    <span className="truncate max-w-[200px]">
                      {printOrder.uploadedFile?.name || "Print order"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Estimated delivery</span>
                    <span>3-5 business days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <button
                  type="submit"
                  onClick={() => onSubmit}
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg cursor-pointer font-bold bg-primary hover:bg-primary/90 text-primary-foreground transition-colors rounded-b-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Complete Payment"
                  )}
                </button>
              </CardFooter>
            </Card>
          </div>
        </form>
      )}
    </div>
  );
}
