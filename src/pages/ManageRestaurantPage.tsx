import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/manageRestaurantForm";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading } = useCreateMyRestaurant();
    const { updateRestaurant, isLoading: isUpdating } = useUpdateMyRestaurant();
    const { restaurant } = useGetMyRestaurant();

    const isEditing = !!restaurant;

    return (
        <ManageRestaurantForm isLoading={isLoading || isUpdating} onSave={isEditing ? updateRestaurant : createRestaurant} restaurant={restaurant} />
    )
}

export default ManageRestaurantPage;