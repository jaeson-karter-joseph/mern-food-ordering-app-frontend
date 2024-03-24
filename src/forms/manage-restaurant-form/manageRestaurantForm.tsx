import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import { Separator } from "@/components/ui/separator";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

const fromSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant name is required",
    }),
    city: z.string({
        required_error: "City is required",
    }),
    country: z.string({
        required_error: "Country is required",
    }),
    deliveryPrice: z.coerce.number({
        required_error: "Delivery price is required",
        invalid_type_error: "Delivery price must be a number",
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Delivery time is required",
        invalid_type_error: "Delivery time must be a number",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "Cuisine is required",
    }),
    menuItems: z.array(
        z.object({
          name: z.string().min(1, "name is required"),
          price: z.coerce.number().min(1, "price is required"),
        })
      ),
    imageFile: z.instanceof(File, { message: "Image is Required" })
});

type RestaurantFormData = z.infer<typeof fromSchema>;


type Props = {
    // Props type definition
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;


}

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }]
        },
    })

    const onSubmit = (fromDataJson: RestaurantFormData) => {
        const formData = new FormData();
        formData.append("restaurantName", fromDataJson.restaurantName);
        onSave(formData);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-leg">
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
            </form>
        </Form>
    )

}

export default ManageRestaurantForm;