"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createListing } from "@/services/listings";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/constants";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.number().min(1, {
    message: "Price is required.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  propertyType: z.string().min(2, {
    message: "Property type is required.",
  }),
  listingType: z.string().min(2, {
    message: "Listing type is required.",
  }),
  priceType: z.string().min(2, {
    message: "Price type is required.",
  }),
  area: z.string().min(1, {
    message: "Area is required.",
  }),
  media: z.any(),

  funFact: z.string().optional(),

  requirements: z.object({
    requireCreditCheck: z.boolean().default(false),
    requireEmploymentVerification: z.boolean().default(false),
    requireRentalHistory: z.boolean().default(false),
  }),

  manager: z.object({
    name: z.string().min(2, {
      message: "Manager name must be at least 2 characters.",
    }),
    phone: z.string().min(10, {
      message: "Phone number must be at least 10 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
  }),

  additionalRequirements: z.string().optional(),
});

const nairobiAreas = [
  "Kilimani",
  "Westlands",
  "Lavington",
  "Karen",
  "Kileleshwa",
  "Parklands",
  "Riverside",
  "Upper Hill",
  "Ngong Road",
  "Spring Valley",
  "Runda",
  "Muthaiga",
  "Kitisuru",
  "Loresho",
  "South B",
  "South C",
  "Langata",
  "Embakasi",
  "Kasarani",
  "Roysambu",
];

const propertyTypes = [
  "House",
  "Apartment/Flat",
  "Town House",
  "Vacant Land/Plot",
  "Farm",
  "Commercial Property",
  "Industrial Property",
];

const listingTypes = ["FOR_RENT", "FOR_SALE", "FOR_LEASE", "FOR_DEVELOPMENT"];

const priceTypes = ["PER_MONTH", "TOTAL_PRICE", "PER_SQFT", "PER_YEAR"];

export function CreateListingForm() {
  // const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      propertyType: "",
      listingType: "",
      priceType: "",
      area: "",
      location: "",
      media: undefined,

      funFact: undefined,

      requirements: {
        requireCreditCheck: false,
        requireEmploymentVerification: false,
        requireRentalHistory: false,
      },

      manager: {
        name: "",
        phone: "",
        email: "",
      },

      additionalRequirements: undefined,
    },
  });

  /*   const { errors, isValid } = form.formState;

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form errors:", errors);
    }
  }, [errors]);
 */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      const exlude = ["media", "requirements", "manager"];

      if (!values.media) {
        toast({
          title: "Property images are required",
          variant: "destructive",
        });

        return;
      }

      if (values.media) {
        Array.from(values.media as FileList).forEach((file) => {
          formData.append("images", file);
        });

        const response = await fetch(`${BASE_URL}/media`, {
          method: "POST",
          body: formData,
          // Don't set Content-Type header, let the browser set it with the boundary
        });

        if (!response.ok) {
          toast({
            title: "Unable to upload images",
            variant: "destructive",
            // description: "Your action was completed successfully.",
          });

          throw new Error("Upload failed");
        }

        type UploadRes =
          | { publicId: string; url: string }[]
          | { error: string };

        // Handle success
        const result = (await response.json()) as UploadRes;

        // console.log("result", result);

        if (Array.isArray(result)) {
          const mediaUrls = result.map((r) => r.url);

          form.setValue("media", mediaUrls);
          formData.append("media", JSON.stringify(mediaUrls));
        }
      }

      Object.entries(values).forEach(([key, value]) => {
        if (!exlude.includes(key) && !!value) {
          // if (key !== "media" && key !== "requirements" && !!value) {
          formData.append(key, value.toString());
        }
      });

      if (values.requirements) {
        formData.append("requirements", JSON.stringify(values.requirements));
      }

      if (values.manager) {
        formData.append("manager", JSON.stringify(values.manager));
      }

      const resp = await createListing(formData);

      if (!resp.success) {
        toast({
          title: "Unable to save property",
          variant: "destructive",
          // description: "Your action was completed successfully.",
        });

        return;
      }

      // router.push("/dashboard?tab=2");
      // router.refresh();

      if (typeof window !== "undefined") {
        window.location.href = `/dashboard?tab=2`;
      }
    } catch (error) {
      console.error("Failed to create listing:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Spacious 3 Bedroom Apartment"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a descriptive title for your listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field: { onChange, value, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Price (Ksh)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onChange={(e) =>
                      onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                    placeholder="85000"
                    {...fieldProps}
                  />
                </FormControl>
                <FormDescription>
                  Enter the monthly rent in Kenyan Shillings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {nairobiAreas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select the area in Nairobi.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specific Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Off Ngong Road, Near Junction Mall"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the specific location or landmark.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypes.map((ppt) => (
                      <SelectItem key={ppt} value={ppt}>
                        {ppt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select property type.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {listingTypes.map((st) => (
                      <SelectItem key={st} value={st}>
                        {st.replace("_", " ").toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select listing type.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {priceTypes.map((pt) => (
                      <SelectItem key={pt} value={pt}>
                        {pt.replace("_", " ").toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select price type.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photos</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    // onChange={(e) => field.onChange(e.target.files)}
                    onChange={(e) => {
                      // Make sure we're setting the value correctly
                      if (e.target.files && e.target.files.length > 0) {
                        // Convert FileList to array for React Hook Form
                        field.onChange(e.target.files);

                        // Debug check
                        console.log("Files selected:", e.target.files.length);
                        console.log("First file:", e.target.files[0]?.name);
                      } else {
                        // Clear the field if no files selected
                        field.onChange(null);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Upload photos of the property (max 5 photos).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="manager.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Manager Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the name of the property manager.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="manager.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Manager Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+254 700 000000" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the phone number of the property manager.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="manager.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Manager Email</FormLabel>
                <FormControl>
                  <Input placeholder="manager@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the email address of the property manager.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Tenant Vetting Requirements
            </h3>
            <FormField
              control={form.control}
              name="requirements.requireCreditCheck"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Require Credit Check</FormLabel>
                    <FormDescription>
                      Tenant must pass a credit check.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements.requireEmploymentVerification"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Require Employment Verification</FormLabel>
                    <FormDescription>
                      Tenant must provide proof of employment.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements.requireRentalHistory"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Require Rental History</FormLabel>
                    <FormDescription>
                      Tenant must provide rental history.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="funFact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fun Fact (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Did you know this building was designed by a famous architect?"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Share an interesting fact about the property or its
                  surroundings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A beautiful apartment with stunning views..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of the property.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="additionalRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional vetting requirements or notes..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Specify any additional tenant vetting requirements.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white hover:bg-primary/90"
        >
          {isSubmitting ? "Creating..." : "Create Listing"}
        </Button>
      </form>
    </Form>
  );
}
